FROM nginx
COPY index.html /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/configfile.template

# By default cloud run listens on port 8080
# https://cloud.google.com/community/tutorials/deploy-react-nginx-cloud-run
ENV PORT 8080
ENV HOST 0.0.0.0

RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

EXPOSE 8080
# Substitute $PORT variable in config file with the one passed via "docker run"

CMD ["nginx", "-g", "daemon off;"]