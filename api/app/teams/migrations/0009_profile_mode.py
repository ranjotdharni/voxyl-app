# Generated by Django 3.2.22 on 2024-07-17 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0008_alter_profile_theme'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='mode',
            field=models.SmallIntegerField(default=0),
        ),
    ]