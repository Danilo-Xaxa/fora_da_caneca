import logging

from django.db import connection
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters import rest_framework as django_filters
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

logger = logging.getLogger(__name__)


class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="category__slug")
    featured = django_filters.BooleanFilter(field_name="featured")
    exclude = django_filters.CharFilter(field_name="slug", exclude=True)

    class Meta:
        model = Product
        fields = ["category", "featured", "exclude"]


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"

    @method_decorator(cache_page(60 * 5))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = "slug"
    filter_backends = [django_filters.DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ["name", "phrase", "description"]
    ordering_fields = ["price", "name", "created_at"]
    ordering = ["-featured", "-best_seller", "name"]

    def get_queryset(self):
        return (
            Product.objects.filter(is_active=True)
            .select_related("category")
            .prefetch_related("images")
        )

    @method_decorator(cache_page(60 * 2))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


@api_view(["GET"])
def health_check(request):
    try:
        connection.ensure_connection()
        db_status = "connected"
    except Exception:
        logger.error("Health check: database connection failed", exc_info=True)
        db_status = "disconnected"
    return Response({"status": "ok", "database": db_status})
