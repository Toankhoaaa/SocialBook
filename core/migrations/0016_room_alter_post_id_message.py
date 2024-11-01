# Generated by Django 5.1 on 2024-10-23 13:22

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_remove_likedpost_name_like_likedpost_type_of_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.UUIDField(default=uuid.UUID('fe28e7fb-2aa0-4e0b-b857-9d25e2079fdf'), primary_key=True, serialize=False),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(max_length=255)),
                ('message', models.TextField()),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.room')),
            ],
        ),
    ]