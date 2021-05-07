# TheTruthClub

> MLM Plan

## Build Setup

### ENV SETUP

MongoDB Install

``` bash
# Add MongoDB Kay
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 68818C72E52529D4
# Add Mongo Repo
sudo echo "deb http://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
# Installing MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
# Start MongoDB at Startup
sudo systemctl enable mongod
```

## NodeJs Install
``` bash
# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```

```npm install pm2 -g```

Cloan This Repo

``` bash
git clone https://github.com/bubundas17/mlm-multi-invesmentsystem.git
cd mlm-multi-invesmentsystem
yarn install
```
PM2 Setup 

``` bash
$ pm2 startup systemd
$ pm2 start ecosystem.config.js --env production
$ pm2 save
```

Nginx Reverse Proxy Setup
``` bash
$ sudo apt install nginx
$ systemctl status nginx
$ sudo systemctl enable nginx
```
Edit /etc/nginx/sites-available/default
and put
```
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
```

And check Nginx Syntax 
```$ sudo nginx -t```

After That Restart Nginx

```sudo systemctl restart nginx```

Backup And Restore MongoDb

> For Backup
``` bash
sudo mongodump --gzip --archive=04-04-21.gz
```
> For Restore
``` bash
sudo mongorestore --gzip --archive=04-04-21.gz
```

Server Config
> Server Config files are mostly stored in 
server/config-editable.json
and
server/config.js


For Future Updates

``` bash
$ sudo su - bubun
$ cd mlm-multi-invesmentsystem
$ git pull
$ yarn build
$ pm2 restart all
```
For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
# After Restart  Of VPS

sudo service mongod start

pm2 restart all

