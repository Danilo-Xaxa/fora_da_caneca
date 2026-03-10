from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = "slug"
    filter_backends = [SearchFilter]
    search_fields = ["name", "phrase", "description"]

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).prefetch_related("images")

        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category__slug=category)

        featured = self.request.query_params.get("featured")
        if featured == "true":
            qs = qs.filter(featured=True)

        return qs
