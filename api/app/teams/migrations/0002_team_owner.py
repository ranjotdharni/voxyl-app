# Generated by Django 3.2.22 on 2024-07-09 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='owner',
            field=models.CharField(default='WB', max_length=64),
        ),
    ]