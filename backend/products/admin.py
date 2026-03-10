from django.contrib import admin
from django.utils.html import format_html

from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
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
class ProductAdmin(admin.ModelAdmin):
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

    def formatted_price(self, obj):
        return f"R$ {obj.price:.2f}"

    formatted_price.short_description = "Preço"
    formatted_price.admin_order_field = "price"

    def image_thumb(self, obj):
        first_image = obj.images.first()
        if first_image and first_image.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; border-radius: 6px;" />',
                first_image.image.url,
            )
        return "📷"

    image_thumb.short_description = "Foto"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "emoji", "order", "product_count"]
    list_editable = ["order", "emoji"]
    prepopulated_fields = {"slug": ("name",)}

    def product_count(self, obj):
        return obj.products.count()

    product_count.short_description = "Produtos"
