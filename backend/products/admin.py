from django.contrib import admin
from django.db.models import Count
from django.utils.html import format_html

from .models import Category, Product, ProductImage

try:
    from unfold.admin import ModelAdmin, TabularInline
except ImportError:
    from django.contrib.admin import ModelAdmin, TabularInline


class ProductImageInline(TabularInline):
    model = ProductImage
    extra = 1
    max_num = 6
    readonly_fields = ["image_preview"]
    fields = ["image", "image_preview", "alt_text", "order"]

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 80px; border-radius: 8px;" />',
                obj.image.url,
            )
        return "Sem imagem"

    image_preview.short_description = "Preview"


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = [
        "name",
        "category",
        "formatted_price",
        "featured",
        "best_seller",
        "is_active",
        "image_thumb",
    ]
    list_filter = ["category", "featured", "best_seller", "is_active"]
    search_fields = ["name", "phrase", "description"]
    list_editable = ["featured", "best_seller", "is_active"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline]
    fieldsets = (
        (
            "Informações básicas",
            {"fields": ("name", "slug", "phrase", "description", "category")},
        ),
        (
            "Preço",
            {"fields": ("price", "original_price")},
        ),
        (
            "Detalhes",
            {"fields": ("colors", "material", "featured", "best_seller", "is_active")},
        ),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related("images")

    def formatted_price(self, obj):
        return f"R$ {obj.price:.2f}"

    formatted_price.short_description = "Preço"
    formatted_price.admin_order_field = "price"

    def image_thumb(self, obj):
        images = obj.images.all()
        first_image = images[0] if images else None
        if first_image and first_image.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; border-radius: 6px;" />',
                first_image.image.url,
            )
        return "📷"

    image_thumb.short_description = "Foto"


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ["name", "slug", "emoji", "order", "product_count"]
    list_editable = ["order", "emoji"]
    prepopulated_fields = {"slug": ("name",)}

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(_product_count=Count("products"))

    def product_count(self, obj):
        return obj._product_count

    product_count.short_description = "Produtos"
    product_count.admin_order_field = "_product_count"
