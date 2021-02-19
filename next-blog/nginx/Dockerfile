FROM nginx:alpine
# Remove any existing config files
RUN rm /etc/nginx/conf.d/*
RUN rm /etc/nginx/nginx.conf

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/
COPY ./nginx.conf /etc/nginx/
COPY ./ssl /ssl
# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]