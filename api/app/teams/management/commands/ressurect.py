from django.core.management import BaseCommand
from django.contrib.auth.models import User
from pathlib import Path
import os
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

class Command(BaseCommand):

    help = "help or usage message here"

    def handle(self, *argv, **options):
        ashes = [
            {
                'first_name': "James",
                'last_name': "Maslow",
                'username': "jmaslow",
                'password': env('SECRET'),
                'email': "generic1@outlook.com"
            },
            {
                'first_name': "Megan",
                'last_name': "Fox",
                'username': "mfox",
                'password': env('SECRET'),
                'email': "generic2@outlook.com"
            },
            {
                'first_name': "Tom",
                'last_name': "Holland",
                'username': "tholland",
                'password': env('SECRET'),
                'email': "generic3@outlook.com"
            },
            {
                'first_name': "Tobey",
                'last_name': "Maguire",
                'username': "tmaguire",
                'password': env('SECRET'),
                'email': "generic4@outlook.com"
            },
            {
                'first_name': "Donald",
                'last_name': "Trump",
                'username': "dtrump",
                'password': env('SECRET'),
                'email': "generic5@outlook.com"
            },
            {
                'first_name': "Barack",
                'last_name': "Obama",
                'username': "bobama",
                'password': env('SECRET'),
                'email': "generic6@outlook.com"
            },
            {
                'first_name': "Addison",
                'last_name': "Rae",
                'username': "arae",
                'password': env('SECRET'),
                'email': "generic7@outlook.com"
            },
            {
                'first_name': "Charlie",
                'last_name': "D'Amelio",
                'username': "cdamelio",
                'password': env('SECRET'),
                'email': "generic8@outlook.com"
            },
            {
                'first_name': "Tom",
                'last_name': "Barnacle",
                'username': "tbarnacle",
                'password': env('SECRET'),
                'email': "generic9@outlook.com"
            },
            {
                'first_name': "Jennifer",
                'last_name': "Lawrence",
                'username': "jlawrence",
                'password': env('SECRET'),
                'email': "generic10@outlook.com"
            },
        ]

        for rebuild in ashes:
            user = User(username=rebuild['username'], password=rebuild['password'], email=rebuild['email'], first_name=rebuild['first_name'], last_name=rebuild['last_name'])
            user.save()
        print(User.objects.all())