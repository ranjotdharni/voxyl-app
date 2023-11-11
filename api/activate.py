import subprocess
import os

activate_venv = os.path.join("venv", "Scripts", "activate")
start_commands = "cd app && python manage.py collectstatic --noinput && python manage.py runserver"
execute = f'call "{activate_venv}" && {start_commands}'
subprocess.run(execute, shell=True)