from rest_framework import serializers

from .models import Category, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "slug", "name", "description", "emoji", "color", "order"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "order"]


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field="slug", read_only=True)
    categoryName = serializers.CharField(source="category.name", read_only=True)
    images = serializers.SerializerMethodField()
    price = serializers.DecimalField(
        max_digits=8,
        decimal_places=2,
        coerce_to_string=False,
    )
    originalPrice = serializers.DecimalField(
        source="original_price",
        max_digits=8,
        decimal_places=2,
        allow_null=True,
        coerce_to_string=False,
    )
    bestSeller = serializers.BooleanField(source="best_seller")
    colors = serializers.SerializerMethodField()
    discount = serializers.SerializerMethodField()

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
            "categoryName",
            "images",
            "featured",
            "bestSeller",
            "colors",
            "material",
            "discount",
        ]

    def get_images(self, obj):
        request = self.context.get("request")
        product_images = obj.images.all()
        if request is None:
            return [img.image.url for img in product_images]
        return [request.build_absolute_uri(img.image.url) for img in product_images]

    def get_colors(self, obj):
        return [c.strip() for c in obj.colors.split(",") if c.strip()]

    def get_discount(self, obj):
        if obj.original_price and obj.original_price > obj.price:
            return round(
                ((obj.original_price - obj.price) / obj.original_price) * 100
            )
        return 0
