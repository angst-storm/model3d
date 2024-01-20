FROM python:3

ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install -r /requirements.txt

COPY /model3d/ /model3d/

WORKDIR model3d
ENTRYPOINT python manage.py migrate ; \
           python manage.py loaddata settings users filters categories products ; \
           python manage.py runserver 0.0.0.0:8000