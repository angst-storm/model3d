# model3d

```shell
cd backend/model3d
python -m venv venv
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata settings users filters categories products
python manage.py runserver

python manage.py createsuperuser
```