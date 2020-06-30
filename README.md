## To run this app:

In the baseUrl.js file, modify the base URL to your computer's IP address 

Go to the json-server folder and run:

**json-server --watch db.json -p 3001 -H <IP address here>**

=> connect the server to get/post data

Then go to the ReactNative/confusion folder and run:

**expo start**

=> run the app


## To debug this app:

Run **sudo yarn global add react-devtools@3.2.3** to install react-devtools.

In the ReactNative/confusion folder and run:

**react-devtools**