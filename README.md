# notes-app

## It is prerequisite to have installed nodejs and vue cli

## Project setup: run build.sh script in project folder
### the script requires as the first argument the name of our domain followed by the string '/notes-app/api'. Also configure the nginx server.
```
./build.sh arg
```
### An .env file is required that stores the environment variables corresponding to the database credentials in MongoDB Atlas. The listening port on our server is 3500, which can also be specified in that file.

### Hot-reloads for development
```
npm run devbabel
```

### Or start the local server to run the app
```
npm start
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
