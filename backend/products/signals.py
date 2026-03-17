import logging

from django.core.cache import cache
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import Category, Product, ProductImage

logger = logging.getLogger(__name__)


def _clear_cache(sender, **kwargs):
    cache.clear()
    logger.info("Cache limpo após alteração em %s", sender.__name__)


for model in (Product, ProductImage, Category):
    post_save.connect(_clear_cache, sender=model)
    post_delete.connect(_clear_cache, sender=model)
