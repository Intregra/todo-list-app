# todo-list-app
Simple TODO angular aplication created with help from [fountain-JS](https://github.com/FountainJS/generator-fountain-webapp) generator.
Main filed you would like to look at are
```
src/index.html
src/index.css
src/app/hello.html
src/app/hello.js
protractor/spec.js
protractor/conf.js
```

## Install
Open directory where you put the app and download necessary packages with
```
npm install
```

## Run the app
Start up the server with
```
npm run serve
```
then open your web browser and go to `localhost:9000`

## Test the app
Package includes one test which tests the language option in the app.
Test requires Protractor to be installed.
Run it with
```
protractor protractor/conf.js
```

Note: The server at `localhost:9000` needs to be running in order to successfully complete the test.
