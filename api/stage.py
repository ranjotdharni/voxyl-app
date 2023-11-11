import subprocess

start_commands = "pip install -r requirements.txt && cd app && python manage.py collectstatic --noinput"
execute = f'call {start_commands}'
subprocess.run(execute, shell=True)