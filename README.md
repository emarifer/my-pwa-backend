# my-pwa-backend

## It is prerequisite to have installed nodejs.

### An .env file is required that stores the environment variables corresponding to the database credentials in MongoDB Atlas. Likewise, in this file it is necessary to create the SECRET variable to store the secret key with which the backend digitally signs the JSON WEB TOKEN:

```
PORT=3500 (e.g)
MONGODB_URI=mongodb+srv://XXXX:XXXX.4temp.mongodb.net/XXXX?retryWrites=true&w=majority
SECRET=XXXX

// Replace 'XXXX' with the corresponding values.
```
