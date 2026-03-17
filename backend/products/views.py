import hashlib
import logging

from django.core.cache import cache
from django.db import connection
from django_filters import rest_framework as django_filters
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

logger = logging.getLogger(__name__)

CATEGORY_CACHE_TTL = 60 * 5  # 5 minutos
PRODUCT_CACHE_TTL = 60 * 2  # 2 minutos


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

    def list(self, request, *args, **kwargs):
        cache_key = "categories_list"
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, CATEGORY_CACHE_TTL)
        return response


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

    def list(self, request, *args, **kwargs):
        query_string = request.get_full_path()
        cache_key = f"products_{hashlib.md5(query_string.encode()).hexdigest()}"
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, PRODUCT_CACHE_TTL)
        return response


@api_view(["GET"])
def health_check(request):
    try:
        connection.ensure_connection()
        return Response({"status": "ok", "database": "connected"})
    except Exception:
        logger.error("Health check: database connection failed", exc_info=True)
        return Response(
            {"status": "error", "database": "disconnected"},
            status=503,
        )
