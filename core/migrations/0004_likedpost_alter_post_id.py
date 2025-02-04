# Generated by Django 5.1 on 2024-10-10 15:28

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_rename_captions_post_caption_alter_post_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='likedPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_id', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.UUIDField(default=uuid.UUID('a5842646-3cf0-4d05-a72e-9a732704dbe9'), primary_key=True, serialize=False),
        ),
    ]
