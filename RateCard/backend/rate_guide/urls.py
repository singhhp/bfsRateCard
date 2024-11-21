
from django.urls import path
from .views import (
    FedExDomesticView,
    FedExInternationalView,
    UPSDomesticView,
    UPSInternationalView,
    GenerateNetRateTable
)

urlpatterns = [
    path('fedex_domestic/', FedExDomesticView.as_view(), name='fedex_domestic'),
    path('fedex_international/', FedExInternationalView.as_view(), name='fedex_international'),
    path('ups_domestic/', UPSDomesticView.as_view(), name='ups_domestic'),
    path('ups_international/', UPSInternationalView.as_view(), name='ups_international'),
    path('<str:carrier>/<str:service_type>/<str:industry_code>/net-rate-table/', GenerateNetRateTable.as_view(), name='generate_net_rate_table'),
]

