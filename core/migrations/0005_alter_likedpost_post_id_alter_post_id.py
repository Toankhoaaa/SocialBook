# Generated by Django 5.1 on 2024-10-10 16:02

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_likedpost_alter_post_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likedpost',
            name='post_id',
            field=models.CharField(max_length=500),
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.UUIDField(default=uuid.UUID('ea34070e-cb71-4f3e-a5db-a2949915e7ed'), primary_key=True, serialize=False),
        ),
    ]
