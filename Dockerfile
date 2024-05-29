FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/poke-management/browser /usr/share/nginx/html