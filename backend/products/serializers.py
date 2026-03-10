from rest_framework import serializers

from .models import Category, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["slug", "name", "description", "emoji", "color", "order"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "order"]


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    images = serializers.SerializerMethodField()
    originalPrice = serializers.DecimalField(
        source="original_price",
        max_digits=8,
        decimal_places=2,
        allow_null=True,
    )
    bestSeller = serializers.BooleanField(source="best_seller")
    colors = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "phrase",
            "description",
            "price",
            "originalPrice",
            "category",
            "images",
            "featured",
            "bestSeller",
            "colors",
            "material",
        ]

    def get_images(self, obj):
        request = self.context.get("request")
        product_images = obj.images.all()
        if not product_images.exists():
            return []
        if request is None:
            return [img.image.url for img in product_images]
        return [request.build_absolute_uri(img.image.url) for img in product_images]

    def get_colors(self, obj):
        return [c.strip() for c in obj.colors.split(",") if c.strip()]
