FROM node:20-slim as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM ubuntu:22.04

RUN apt update
RUN apt install -y nano net-tools systemd nginx libnginx-mod-rtmp

# NGINX Config
WORKDIR /tmp/nginx-live
COPY ./pkg/nginx .

RUN mkdir -p /var/www/html/rtmp
RUN mkdir -p /var/www/html/stream
RUN mkdir -p /var/www/html/nginx-live

RUN echo "" >> /etc/nginx/nginx.conf
RUN cat nginx.conf >> /etc/nginx/nginx.conf
RUN cat rtmp.nginx.conf > /etc/nginx/sites-available/rtmp
RUN ln -s /etc/nginx/sites-available/rtmp /etc/nginx/sites-enabled/rtmp

RUN cp stat.xsl /var/www/html/rtmp/stat.xsl

# Deploy the frontend
COPY --from=build /app/dist /var/www/html/nginx-live

# Entrypoint
WORKDIR /app
COPY bin/entrypoint.sh .

CMD ["/app/entrypoint.sh"]