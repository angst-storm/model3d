data "yandex_compute_image" "container-optimized-image" {
  family = "container-optimized-image"
}

resource "yandex_compute_instance" "model3d" {
  name               = "model3d"
  service_account_id = yandex_iam_service_account.django.id
  platform_id        = "standard-v3"
  boot_disk {
    initialize_params {
      image_id = data.yandex_compute_image.container-optimized-image.id
    }
  }
  network_interface {
    subnet_id = yandex_vpc_subnet.b.id
    nat = true
  }
  resources {
    cores         = 2
    memory        = 2
    core_fraction = 20
  }
  metadata = {
    docker-compose = <<-EOT
version: "3"

services:
  postgres:
    container_name: postgres
    image: postgres:latest
    expose:
      - 5432
    environment:
      POSTGRES_PASSWORD: password
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres-data:/var/lib/postgresql/data
  django:
    container_name: django
    image: ${var.image_registry}:${var.image_tag}
    environment:
      SECRET_KEY: ${var.secret_key}
      DEBUG: "True"
      ALLOWED_HOSTS: 127.0.0.1;localhost;${var.domain}
      DJANGO_URL: http://${var.domain}
      POSTGRES_HOST: postgres
      POSTGRES_PORT: 5432
      POSTGRES_DB_NAME: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_SSLMODE: disable
      VERSION: ${var.image_tag}
    ports:
      - "8000:8000"
    depends_on:
      - postgres
    volumes:
      - media:/media
volumes:
  postgres-data:
  media:
EOT
    ssh-keys       = "kiprin:${var.ssh_pub}"
  }
}