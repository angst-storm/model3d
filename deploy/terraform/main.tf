terraform {
  required_providers {
    yandex = {
      source = "yandex-cloud/yandex"
    }
  }
}

provider "yandex" {
  token     = var.iam_token
  cloud_id  = var.cloud_id
  folder_id = var.folder_id
  zone      = var.main_zone
}

resource "yandex_iam_service_account" "django" {
  name = "model3d-django"
}

resource "yandex_vpc_network" "model3d" {
  name = "model3d-network"
}

resource "yandex_vpc_subnet" "b" {
  name           = "model3d-b-subnet"
  zone           = var.main_zone
  network_id     = yandex_vpc_network.model3d.id
  v4_cidr_blocks = ["10.129.0.0/24"]
}

data "yandex_dns_zone" "zone" {
  name = var.dns_zone_name
}

resource "yandex_dns_recordset" "a_record" {
  zone_id = data.yandex_dns_zone.zone.id
  name    = "${var.domain}."
  type    = "A"
  ttl     = 600
  data    = [yandex_compute_instance.model3d.network_interface[0].nat_ip_address]
}