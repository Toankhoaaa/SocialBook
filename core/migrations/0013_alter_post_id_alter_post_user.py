# Generated by Django 5.1 on 2024-10-11 15:52

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_alter_post_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.UUIDField(default=uuid.UUID('b0acba6b-17a5-41d6-a1d4-1006e67cacc7'), primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='user',
            field=models.CharField(max_length=100),
        ),
    ]