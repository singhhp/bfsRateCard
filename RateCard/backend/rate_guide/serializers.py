from rest_framework import serializers
from .models import FedExDomestic, FedExInternational, UPSDomestic, UPSInternational

class FedExDomesticSerializer(serializers.ModelSerializer):
    class Meta:
        model = FedExDomestic
        fields = '__all__'

class FedExInternationalSerializer(serializers.ModelSerializer):
    class Meta:
        model = FedExInternational
        fields = '__all__'

class UPSDomesticSerializer(serializers.ModelSerializer):
    class Meta:
        model = UPSDomestic
        fields = '__all__'

class UPSInternationalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UPSInternational
        fields = '__all__'
