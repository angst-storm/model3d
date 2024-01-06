#### API Gateway ###
#
#resource "yandex_api_gateway" "model3d" {
#  name = "model3d"
#  custom_domains {
#    fqdn           = yandex_cm_certificate.model3d.domains[0]
#    certificate_id = yandex_cm_certificate.model3d.id
#  }
#  connectivity {
#     network_id = yandex_vpc_network.model3d.id
#  }
#  spec = <<-EOT
#openapi: 3.0.0
#info:
#  title: HR Portal API
#  version: 1.0.0
#paths:
#  /:
#   get:
#      x-yc-apigateway-integration:
#        type: http
#        url: http://${yandex_compute_instance.model3d.network_interface[0].ip_address}:3000/
#        query:
#          '*': '*'
#        headers:
#          '*': '*'
#  /{proxy+}:
#   get:
#      x-yc-apigateway-integration:
#        type: http
#        url: http://${yandex_compute_instance.model3d.network_interface[0].ip_address}:3000/{proxy}/
#        query:
#          '*': '*'
#        headers:
#          '*': '*'
#      parameters:
#      - explode: false
#        in: path
#        name: proxy
#        required: false
#        schema:
#          type: string
#        style: simple
#  /media/{file+}:
#    x-yc-apigateway-any-method:
#      x-yc-apigateway-integration:
#        type: http
#        url: http://${yandex_compute_instance.model3d.network_interface[0].ip_address}:8000/media/{file}/
#        query:
#          '*': '*'
#        headers:
#          '*': '*'
#      parameters:
#      - explode: false
#        in: path
#        name: file
#        required: false
#        schema:
#          type: string
#        style: simple
#  /static/{file+}:
#    x-yc-apigateway-any-method:
#      x-yc-apigateway-integration:
#        type: http
#        url: http://${yandex_compute_instance.model3d.network_interface[0].ip_address}:3000/static/{file}/
#        query:
#          '*': '*'
#        headers:
#          '*': '*'
#      parameters:
#      - explode: false
#        in: path
#        name: file
#        required: false
#        schema:
#          type: string
#        style: simple
#  /admin/{proxy+}:
#    x-yc-apigateway-any-method:
#      x-yc-apigateway-integration:
#        type: http
#        url: http://${yandex_compute_instance.model3d.network_interface[0].ip_address}:8000/admin/{proxy}/
#        query:
#          '*': '*'
#        headers:
#          '*': '*'
#      parameters:
#      - explode: false
#        in: path
#        name: proxy
#        required: false
#        schema:
#          type: string
#        style: simple
#  /api/{proxy+}:
#    x-yc-apigateway-any-method:
#      x-yc-apigateway-integration:
#        type: http
#        url: http://${yandex_compute_instance.model3d.network_interface[0].ip_address}:8000/api/{proxy}/
#        query:
#          '*': '*'
#        headers:
#          '*': '*'
#      parameters:
#      - explode: false
#        in: path
#        name: proxy
#        required: false
#        schema:
#          type: string
#        style: simple
#EOT
#}