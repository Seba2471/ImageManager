# Piclist - Sieciowy menadzer zdjęc 

## Demo version - https://piclist-image-manager.herokuapp.com/


# Project setup

## Server

### Install npm package

```
npm install
```

### Set environment variables

###### Change filename .env.example to .env

#### Set required value in .env

```
PORT= //The port on which the application will work //Example: 3001
DATABASE= //MongoDB connection string //Example: mongodb://127.0.0.1:27017/ImageManager
ACCESS_KEY= //Secret access key to generate JWT access token //Random string
REFRESH_KEY= //Secret refresh key to generate JWT refresh token //Random string
```

### Run aplication

```
npm run dev
```



## Client

### Go to client folder

```
cd client
```

### Install npm package

```
npm install
```

### Set environment variables

###### Change filename .env.example to .env

#### Set required value in .env

```
VUE_APP_BASE_URL= //Server aplication base url //Example: 'http://localhost:3001'
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
