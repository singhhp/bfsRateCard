from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import FedExDomestic, FedExInternational, UPSDomestic, UPSInternational, FedExDomesticPublishedPrice
from decimal import Decimal
from .serializers import (
    FedExDomesticSerializer,
    FedExInternationalSerializer,
    UPSDomesticSerializer,
    UPSInternationalSerializer,
)

# For FedEx Domestic
class FedExDomesticView(APIView):
    def get(self, request):
        data = FedExDomestic.objects.all() 
        serializer = FedExDomesticSerializer(data, many=True)  
        return Response(serializer.data, status=status.HTTP_200_OK) 

# For FedEx International
class FedExInternationalView(APIView):
    def get(self, request):
        data = FedExInternational.objects.all()  
        serializer = FedExInternationalSerializer(data, many=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)  

# For UPS Domestic
class UPSDomesticView(APIView):
    def get(self, request):
        data = UPSDomestic.objects.all() 
        serializer = UPSDomesticSerializer(data, many=True)  
        return Response(serializer.data, status=status.HTTP_200_OK) 

# For UPS International
class UPSInternationalView(APIView):
    def get(self, request):
        data = UPSInternational.objects.all() 
        serializer = UPSInternationalSerializer(data, many=True)  
        return Response(serializer.data, status=status.HTTP_200_OK)  


class GenerateNetRateTable(APIView):
    def get_discount(self, rate_guide_model, service_type, industry_code, weight, zone):
        """
        Fetch the discount from the rate guide for a given service type, industry code, weight, and zone.
        """
        discount = rate_guide_model.objects.filter(
            Q(start_weight__lte=weight) & Q(end_weight__gte=weight),
            service_type=service_type,
            industry_code=industry_code,
            start_zone__lte=zone,
            end_zone__gte=zone,
            
        ).first()
        print(f"Fetching discount for Service Type: {service_type}, Industry Code: {industry_code}, Weight: {weight}, Zone: {zone}")
        if not discount:
         print("No discount found!")
        else:
         print(f"Discount Found: {discount.discount_percent}%")
        
        return discount
    
    def get_min_base_rate(self, rate_guide_model, weight, zone):
      
        rate_guide_entry = rate_guide_model.objects.filter(Q(start_weight__lte=weight) & Q(end_weight__gte=weight),
                                                           start_zone__lte=zone, end_zone__gte=zone).first()
        if rate_guide_entry:
            return Decimal(rate_guide_entry.minimum_base_price)  
        return Decimal('0') 

    def get(self, request, carrier, service_type, industry_code):
        """
        Generate a net rate table by applying discounts to published prices.
        """

        # Determine the carrier's published price and rate guide models
        if carrier == "fedex_domestic":
            published_price_model = FedExDomesticPublishedPrice
            rate_guide_model = FedExDomestic
        # elif carrier == "ups_domestic":
        #     published_price_model = UPSDomesticPublishedPrice
        #     rate_guide_model = UPSDomestic
        else:
            return Response({"error": "Unsupported carrier"}, status=status.HTTP_400_BAD_REQUEST)

        published_prices = published_price_model.objects.filter(service_type=service_type)
        if not published_prices.exists():
            return Response({"error": "No published prices found for this service type"}, status=status.HTTP_404_NOT_FOUND)

        
        net_rate_table = {}

        # Fetch unique weights and zones
        weights = sorted(set(published_prices.values_list("weight", flat=True)))
        zones = sorted(set(published_prices.values_list("zone", flat=True)))

        # Generate the net rate table by applying discounts
        for weight in weights:
            net_rate_table[weight] = {}
            for zone in zones:
                # Fetch the published price
                published_price_obj = published_prices.filter(weight=weight, zone=zone).first()
                if not published_price_obj:
                    continue

                published_price = published_price_obj.published_price

                # Fetch the applicable discount
                discount = self.get_discount(rate_guide_model, service_type, industry_code, weight, zone)

                # Calculate the net rate
                if discount:
                    discount_amount = (Decimal(discount.discount_percent / 100)) * Decimal(published_price)
                    net_rate = Decimal(published_price) - discount_amount
                else:
                    net_rate = published_price
                    
                min_base_rate = self.get_min_base_rate(rate_guide_model, weight, zone)
                if net_rate < min_base_rate:
                        net_rate = min_base_rate
    
                
                    
                if weight == 1 and zone == 2:
                    # Fetch the min_base_rate from the FedExRateGuide
                    min_base_rate = self.get_min_base_rate(rate_guide_model, weight, zone)
                    # if net_rate < min_base_rate:
                    net_rate = min_base_rate


                net_rate_table[weight][zone] = round(net_rate, 2)

        # Return the net rate table
        return Response({"net_rate_table": net_rate_table}, status=status.HTTP_200_OK)


