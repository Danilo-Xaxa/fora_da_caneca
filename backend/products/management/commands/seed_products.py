from decimal import Decimal

from django.core.management.base import BaseCommand

from products.models import Category, Product


CATEGORIES_DATA = [
    {
        "slug": "humor",
        "name": "Humor",
        "description": "Frases engraçadas pra alegrar seu dia",
        "emoji": "😂",
        "color": "from-yellow-400 to-orange-500",
        "order": 1,
    },
    {
        "slug": "cafe",
        "name": "Café",
        "description": "Para quem não vive sem um cafézinho",
        "emoji": "☕",
        "color": "from-amber-700 to-yellow-600",
        "order": 2,
    },
    {
        "slug": "romanticas",
        "name": "Românticas",
        "description": "Presentes perfeitos pra quem você ama",
        "emoji": "💕",
        "color": "from-pink-500 to-red-500",
        "order": 3,
    },
    {
        "slug": "musica",
        "name": "Música",
        "description": "Para quem respira música",
        "emoji": "🎵",
        "color": "from-purple-500 to-indigo-500",
        "order": 4,
    },
    {
        "slug": "personalizadas",
        "name": "Personalizadas",
        "description": "Crie do seu jeito, com sua frase",
        "emoji": "🎨",
        "color": "from-brand-pink to-brand-orange",
        "order": 5,
    },
]

PRODUCTS_DATA = [
    {
        "name": "Vou Mimi",
        "slug": "vou-mimi",
        "phrase": "Vou mimi, amanhã tem muito rojão.",
        "description": (
            "Caneca preta com frase divertida em branco. "
            "Perfeita pra quem ama dormir e tem muito o que fazer no dia seguinte."
        ),
        "price": Decimal("39.90"),
        "original_price": Decimal("49.90"),
        "category_slug": "humor",
        "featured": True,
        "best_seller": True,
        "colors": "Preta",
    },
    {
        "name": "Só Faço Café",
        "slug": "so-faco-cafe",
        "phrase": "Já fiz muita questão, hoje só faço café.",
        "description": (
            "Caneca branca em tons de marrom, com um personagem fofo. "
            "Para quem já cansou de fazer questão e agora só quer um bom café."
        ),
        "price": Decimal("39.90"),
        "original_price": None,
        "category_slug": "cafe",
        "featured": True,
        "best_seller": False,
        "colors": "Branca",
    },
    {
        "name": "Te Amo Pra Sempre",
        "slug": "te-amo-pra-sempre",
        "phrase": "Te amo pra sempre com você.",
        "description": (
            "Caneca romântica com corações e rosas. "
            "Presente perfeito para o dia dos namorados ou qualquer dia especial."
        ),
        "price": Decimal("44.90"),
        "original_price": None,
        "category_slug": "romanticas",
        "featured": True,
        "best_seller": False,
        "colors": "Branca",
    },
    {
        "name": "Troco Gente Chata",
        "slug": "troco-gente-chata",
        "phrase": "Troco gente chata por café!",
        "description": (
            "Caneca rosa e branca pra quem prefere a companhia de um bom café. "
            "Estilo floral divertido."
        ),
        "price": Decimal("39.90"),
        "original_price": None,
        "category_slug": "humor",
        "featured": True,
        "best_seller": True,
        "colors": "Rosa/Branca",
    },
    {
        "name": "Rock n Roll",
        "slug": "rock-n-roll",
        "phrase": "Rock'n'Roll",
        "description": (
            "Caneca branca com caveiras e notas musicais. "
            "Para os amantes do rock que curtem um café com atitude."
        ),
        "price": Decimal("39.90"),
        "original_price": None,
        "category_slug": "musica",
        "featured": False,
        "best_seller": False,
        "colors": "Branca",
    },
    {
        "name": "O Som da Minha Vida",
        "slug": "som-da-minha-vida",
        "phrase": "O som da minha vida",
        "description": (
            "Caneca com design musical em preto e vermelho. "
            "Para quem vive com uma trilha sonora tocando."
        ),
        "price": Decimal("39.90"),
        "original_price": None,
        "category_slug": "musica",
        "featured": True,
        "best_seller": False,
        "colors": "Branca",
    },
    {
        "name": "Caneca Personalizada",
        "slug": "caneca-personalizada",
        "phrase": "Sua frase aqui!",
        "description": (
            "Monte a caneca do seu jeito! Escolha a frase, o estilo e as cores. "
            "Nós fazemos pra você com todo carinho."
        ),
        "price": Decimal("49.90"),
        "original_price": None,
        "category_slug": "personalizadas",
        "featured": True,
        "best_seller": True,
        "colors": "Branca, Preta",
    },
    {
        "name": "Modo Café ON",
        "slug": "modo-cafe-on",
        "phrase": "Modo café: ON",
        "description": (
            "Caneca pra quem já acorda pensando no primeiro café do dia. "
            "Design minimalista e direto ao ponto."
        ),
        "price": Decimal("39.90"),
        "original_price": None,
        "category_slug": "cafe",
        "featured": False,
        "best_seller": False,
        "colors": "Branca",
    },
]


class Command(BaseCommand):
    help = "Popula o banco com as categorias e produtos iniciais"

    def handle(self, *args, **options):
        for cat_data in CATEGORIES_DATA:
            category, created = Category.objects.update_or_create(
                slug=cat_data["slug"],
                defaults=cat_data,
            )
            status = "criada" if created else "atualizada"
            self.stdout.write(f"  Categoria {status}: {category.name}")

        for prod_data in PRODUCTS_DATA:
            category_slug = prod_data.pop("category_slug")
            category = Category.objects.get(slug=category_slug)
            product, created = Product.objects.update_or_create(
                slug=prod_data["slug"],
                defaults={**prod_data, "category": category},
            )
            prod_data["category_slug"] = category_slug  # restore for idempotency
            status = "criado" if created else "atualizado"
            self.stdout.write(f"  Produto {status}: {product.name}")

        self.stdout.write(
            self.style.SUCCESS(
                f"\nSeed completo! {Category.objects.count()} categorias, "
                f"{Product.objects.count()} produtos."
            )
        )
