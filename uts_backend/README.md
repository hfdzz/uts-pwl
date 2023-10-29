### PWL RB - Yusuf Hafidz - 120140234

Run (Windows):

- Setup Project:
  - Python venv

        python3 -m venv env

  - Upgrade packaging tool

        env/Scripts/pip install --upgrade pip setuptools

  - Install dependencies

        env/Scripts/pip install -e ".[testing]"

- Setup database:
  - revision

        env/Scripts/alembic -c development.ini revision --autogenerate -m "init"

  - upgrade to head

        env/Scripts/alembic -c development.ini upgrade head

  - init database

        env/Scripts/initialize_uts_backend_db development.ini

- Run Test:

        env/Scripts/pytest

- Run Project

         env/Scripts/pserve development.ini