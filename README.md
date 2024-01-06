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

```shell
# REACT_APP_BASE_ENDPOINT -> frontend/apps/web/src/constants/base-endpoint.ts
cd frontend/apps/web
npm install
npm start
```

```shell
docker compose up -d
```

```shell
docker build backend -t angstorm/model3d:django-v1
docker push angstorm/model3d:django-v1
docker build frontend/apps/web -t angstorm/model3d:react-v1
docker push angstorm/model3d:react-v1
terraform -chdir=deploy/terraform apply -var-file="vars.tfvars"
```