# TheTruthClub

> MLM Plan

## Build Setup

### ENV SETUP

sudo apt update

###### MONGODB INSTALL

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 68818C72E52529D4

sudo echo "deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

sudo apt-get update

sudo apt-get install -y mongodb-org

sudo systemctl start mongod

sudo systemctl enable mongod

sudo netstat -plntu

#######  NODEjs

sudo apt install nodejs

nodejs -v

sudo apt install curl -y

curl -o- -L https://yarnpkg.com/install.sh | bash

source ~/.bashrc

yarn --version

sudo npm install pm2@latest -g

############### GitClone

git clone https://github.com/bubundas17/mlm-multi-invesmentsystem.git

cd mlm-multi-invesmentsystem

yarn install

############## Pm2 

pm2 startup systemd

sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u bubun --hp /home/bubun

pm2 save

pm2 start ecosystem.config.js --env production

pm2 save

############ Nginx Reverse Proxy Setup

sudo apt install nginx

sudo ufw app list

sudo ufw allow 'Nginx HTTP'

sudo ufw status

systemctl status nginx

curl -4 icanhazip.com

sudo systemctl enable nginx

sudo nano /etc/nginx/sites-available/default

`````
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                proxy_pass http://localhost:3000;
        }

}
`````


sudo nginx -t

sudo systemctl restart nginx

########## RESTORE MongoDb


sudo mongorestore --gzip --archive=04-04-21.gz


########### 

authorized_keys for auto backup

server/config-editable.json for leatest config



-----------------------------------------------------------------------------

FOR EDIT AND RE-UPLOAD

-----------------------------------------------------------------------------
$ sudo su - bubun

$ cd mlm-multi-invesmentsystem

$ git pull

$ yarn build

$ pm2 restart all
______________________________________________________________________________________

OLD DOC By Bubun 
---------------------------------------------------------------------------------------
> For Windows: 

Open powershell as admin and run

```npm install --global windows-build-tools```

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
# After Restart  Of VPS

sudo service mongod start

pm2 restart all

