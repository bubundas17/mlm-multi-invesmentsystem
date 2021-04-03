# TheTruthClub

> MLM Plan

$ sudo su - bubun

$ cd mlm-multi-invesmentsystem

$ git pull


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

############### GitClone

git clone https://github.com/bubundas17/mlm-multi-invesmentsystem.git

cd mlm-multi-invesmentsystem

yarn install





















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
# After Restart

sudo service mongod start
pm2 restart all

