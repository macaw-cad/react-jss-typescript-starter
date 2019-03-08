# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
RUN npm run build-server:production

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

# Install node
RUN apt-get update -yq && apt-get upgrade -yq
RUN apt-get install -yq \
		curl \
		git \
		nano \
		gnupg \
		gnupg2 \
		gnupg1
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -yq nodejs

# Enable with ssh configures for Azure App Service
ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
	&& apt-get install -y --no-install-recommends openssh-server \
	&& echo "$SSH_PASSWD" | chpasswd 
COPY Docker/sshd_config /etc/ssh/

# Install PM2
RUN npm install -g pm2

# Entry point script
COPY Docker/init.sh /usr/local/bin/init.sh
RUN chmod u+x /usr/local/bin/init.sh

# Copy the default nginx.config provided by tiangolo/node-frontend
COPY Docker/nginx.config /etc/nginx/sites-available/default

# Copy the static creat-react-app assets
COPY --from=build-stage /app/build/ /app/build

# Copy the Node Express server
COPY --from=build-stage /app/build.server/ /app/build.server

# Copy the disconnected mode proxy server
COPY --from=build-stage /app/scripts/disconnected-mode-proxy.js /app/build.server

# Copy the data/sitecore for running offline
COPY --from=build-stage /app/data/ /app/data
COPY --from=build-stage /app/sitecore/ /app/sitecore

WORKDIR /app

EXPOSE 80 2222
ENTRYPOINT ["/usr/local/bin/init.sh"]