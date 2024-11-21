from django.db import models

class FedExDomestic(models.Model):
    service_type = models.CharField(max_length=100)
    industry_code = models.CharField(max_length=100)
    minimum_base_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_zone = models.IntegerField()
    end_zone = models.IntegerField()
    start_weight = models.FloatField()
    end_weight = models.FloatField()
    discount_percent = models.FloatField()
    
    class Meta:
        db_table='fedex_domestic'

    def __str__(self):
        return self.service_type


class FedExInternational(models.Model):
    service_type = models.CharField(max_length=100)
    industry_code = models.CharField(max_length=100)
    minimum_base_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_zone = models.IntegerField()
    end_zone = models.IntegerField()
    start_weight = models.FloatField()
    end_weight = models.FloatField()
    discount_percent = models.FloatField()

    
    class Meta:
        db_table='fedex_international'

    def __str__(self):
        return f"{self.service_type} ({self.industry_code})"


class UPSDomestic(models.Model):

    service_type = models.CharField(max_length=100)
    industry_code = models.CharField(max_length=100)
    minimum_base_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_zone = models.IntegerField()
    end_zone = models.IntegerField()
    start_weight = models.FloatField()
    end_weight = models.FloatField()
    discount_percent = models.FloatField()
    
    
    class Meta:
        db_table='ups_domestic'


    def __str__(self):
        return f"{self.service_type} ({self.industry_code})"


class UPSInternational(models.Model):
    service_type = models.CharField(max_length=100)
    industry_code = models.CharField(max_length=100)
    minimum_base_price = models.DecimalField(max_digits=10, decimal_places=2)
    start_zone = models.IntegerField()
    end_zone = models.IntegerField()
    start_weight = models.FloatField()
    end_weight = models.FloatField()
    discount_percent = models.FloatField()
    
    
    class Meta:
        db_table='ups_international'


    def __str__(self):
        return f"{self.service_type} ({self.industry_code})"

class FedExDomesticPublishedPrice(models.Model):
    service_type = models.CharField(max_length=100)
    zone = models.IntegerField()
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    published_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        db_table='fedex_domestic_published_price'

    def __str__(self):
        return f"{self.service_type} - Zone {self.zone}, Weight {self.weight}"