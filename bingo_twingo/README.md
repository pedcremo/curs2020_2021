# BINGO TWINGO
Bingo twingo is a web application development project in offline and online mode (using websockets with socket.io) that consists of a traditional online bingo game to play without an internet connection or online with other remote players. Its fast and funny and doesn't require any kind of sign in, sing up, fuck up, cookie hell... and all the annoying things usually around modern web apps.

Has been developed as single page application with RAW ES6 javascript. The only third party library used in frontend has been socket_io_client.

In backend (server side) we use nodejs + express + socket.io

DEMO HERE ->

# Start developing
`npm intall`   (only once)
`npm buildDev`
`npm start`
`Open browser http://localhost:8080`
 

# Deploying in production 
`npm buildProd`

Now in dist folder we have all javascripts, css,assets ... optimized to deploy.
Go to dist/ folder and serve your web app:
`node server.js`
`Open browser in http://YOUR_IP:8080`



Expack is the bare-bones Express and Webpack boilerplate with ES6+ babel transpilation, ESLint linting, Hot Module Reloading, and Jest test framework enabled.

Expack has two build modes: Development and Production.

When you run `npm run buildDev`, Javascript, HTML, and CSS files are unminified and not uglified, meaning that you can easily inspect them in Chrome Dev Tools. Hot Module Reloading is enabled via `webpack-dev-middleware` and `webpack-hot-middleware`. 

When you run `npm run buildProd`, Javascript, HTML, and CSS files are all minified and uglified, and images are encoded as Base64 directly into your CSS file, which results in less calls to the server for image files.

## Google App Engine Flex Deployment

Expack can be deployed directly to Google App Engine Flex with the command `npm run deploy`. **IMPORTANT:** Currently `app.yaml` is configured to use minimal resources to save on cost, which is great for development but terrible for production. Please review and update `app.yaml` to suit your own needs.

## Get starting 🚀
To be able to put the web application into operation you need to have these tools installed.

### Node.js
If your operating system is windows you can go to the official [node.js][nodejs] page and you can download the executable, if your operating system is linux perform the following steps.

Requires Node.js v4+ to run.
```sh
$ sudo apt install nodejs
```

To check if nodejs and the npm package installer has been installed correctly we can use:
```sh
$ node --version
Output
v10.19.0

$ npm --version
Output
6.4.1
```

### For development environments…

We install all the packages that the application needs for its deployment.
``` sh
$ npm install
```
When all the packages have finally been installed we will create the execution files with [weback][webpack]:
``` sh
$ npm run buildDev
```
And finally to run the project through port 8080:
``` sh
$ npm start
```
### For testing
``` sh
$ npm test
$ npm run coverage        // generates a coverage report
```

## Troubleshooting

Node.js: what is ENOSPC error and how to solve?
``` sh
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

Upgrade node to the latest stable
``` sh
$ sudo npm install -g n
$ sudo n stable
```
**Free Software, Hell Yeah!**

   [nodejs]: <https://nodejs.org/es/>
   [webpack]: <https://webpack.js.org/>


[![N|Solid](https://lh3.googleusercontent.com/proxy/lV8-HvS-mrklSXCb96a9BHsa-oEQFD9vtc4xrAMRkJUfL1Rjc09PTSPbWg_WQV2PaWHlLDmI3rtHe4Au4bzB4qrOAJ5EsdCyzomxkUlma7L4l9qZrQXt6C0_IWlXt4uUtCY0j0iud64B6gfulTmkUnc-msves_E)](https://nodesource.com/products/nsolid)