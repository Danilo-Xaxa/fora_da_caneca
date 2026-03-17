from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    slug = models.SlugField("Slug", max_length=50, unique=True)
    name = models.CharField("Nome", max_length=100)
    description = models.CharField("Descrição", max_length=255)
    emoji = models.CharField("Emoji", max_length=10, default="☕")
    color = models.CharField(
        "Cor (classe Tailwind)",
        max_length=100,
        blank=True,
        help_text="Ex: from-yellow-400 to-orange-500",
    )
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ["order"]

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField("Nome", max_length=200)
    slug = models.SlugField("Slug (URL)", max_length=200, unique=True)
    phrase = models.CharField("Frase da caneca", max_length=300)
    description = models.TextField("Descrição")
    price = models.DecimalField("Preço", max_digits=8, decimal_places=2)
    original_price = models.DecimalField(
        "Preço original",
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True,
        help_text="Deixe vazio se não tem desconto",
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
        verbose_name="Categoria",
    )
    featured = models.BooleanField("Destaque", default=False, db_index=True)
    best_seller = models.BooleanField("Mais vendida", default=False, db_index=True)
    colors = models.CharField(
        "Cores disponíveis",
        max_length=300,
        default="Branca",
        help_text="Separe com vírgula: Branca, Preta, Rosa",
    )
    material = models.CharField("Material", max_length=100, default="Cerâmica 325ml")
    is_active = models.BooleanField("Ativo", default=True, db_index=True)
    created_at = models.DateTimeField("Criado em", auto_now_add=True)
    updated_at = models.DateTimeField("Atualizado em", auto_now=True)

    class Meta:
        verbose_name = "Produto"
        verbose_name_plural = "Produtos"
        ordering = ["-featured", "-best_seller", "name"]

    def __str__(self):
        return self.name

    def clean(self):
        if self.price is not None and self.price <= 0:
            raise ValidationError({"price": "O preço deve ser maior que zero."})

        if self.original_price is not None and self.price is not None:
            if self.original_price <= self.price:
                raise ValidationError(
                    {
                        "original_price": "O preço original deve ser maior que o preço atual (para haver desconto)."
                    }
                )

        if self.name and not self.slug:
            generated = slugify(self.name)
            if not generated:
                raise ValidationError(
                    {"name": "O nome precisa conter pelo menos uma letra ou número."}
                )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
        verbose_name="Produto",
    )
    image = models.ImageField("Imagem", upload_to="products/")
    alt_text = models.CharField("Texto alternativo", max_length=200, blank=True)
    order = models.PositiveIntegerField("Ordem", default=0)

    class Meta:
        verbose_name = "Imagem do Produto"
        verbose_name_plural = "Imagens do Produto"
        ordering = ["order"]

    def __str__(self):
        return f"Imagem {self.order} - {self.product.name}"
