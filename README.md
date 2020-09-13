## Project Info

This is the project for storing the user information from the google auth.
This projet is hosted on the url - https://google-users-auth-api.herokuapp.com

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:5000] to view it in the local.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `App.js`

We have the connection to mongoDB using mongoose and other middlewares(ex-bodyparser).
Also we the routes defined in this file

### `routes`
we have three routes configured - 
1. /users method:GET - To store user info
2. /users method:POST - To show all the users info
3. /delete-user method:POST - To delete the userinfo

### `isAuth middleware`
The isAuth middleware JWT token to determine the user is authenticated or not,  /users : POST and /delete-user : POST are the routes which are accesbile only after authentication, and only loggedin user are only Authorized to delete their own data.
