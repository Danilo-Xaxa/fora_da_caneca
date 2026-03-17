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
        "status_badge",
        "featured",
        "best_seller",
        "image_thumb",
    ]
    list_filter = ["category", "featured", "best_seller", "is_active"]
    search_fields = ["name", "phrase", "description"]
    list_editable = ["featured", "best_seller"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductImageInline]
    actions = ["make_active", "make_inactive", "make_featured", "remove_featured"]
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

    @admin.display(description="Preço", ordering="price")
    def formatted_price(self, obj):
        return f"R$ {obj.price:.2f}"

    @admin.display(description="Status")
    def status_badge(self, obj):
        if obj.is_active:
            return format_html(
                '<span style="color: #16a34a; font-weight: 600;">● Ativo</span>'
            )
        return format_html(
            '<span style="color: #dc2626; font-weight: 600;">● Inativo</span>'
        )

    @admin.display(description="Foto")
    def image_thumb(self, obj):
        images = obj.images.all()
        first_image = images[0] if images else None
        if first_image and first_image.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; border-radius: 6px;" />',
                first_image.image.url,
            )
        return "📷"

    @admin.action(description="✅ Ativar selecionados")
    def make_active(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated} produto(s) ativado(s).")

    @admin.action(description="❌ Desativar selecionados")
    def make_inactive(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} produto(s) desativado(s).")

    @admin.action(description="⭐ Marcar como destaque")
    def make_featured(self, request, queryset):
        updated = queryset.update(featured=True)
        self.message_user(request, f"{updated} produto(s) marcado(s) como destaque.")

    @admin.action(description="Remover destaque")
    def remove_featured(self, request, queryset):
        updated = queryset.update(featured=False)
        self.message_user(request, f"{updated} produto(s) removido(s) do destaque.")


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
