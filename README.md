## Run this app:

1. In the ReactNative/confusion folder, run 

**npm install** 

=> to install all the required packages.

2. In the baseUrl.js file, set the base URL with your computer's IP address 

3. Go to the json-server folder and run: 

**json-server --watch db.json -p 3001 -H *YOUR_IP_ADDRESS*** 

=> to connect to the JSON server and get/post the data.

4. Finally, go to the ReactNative/confusion folder and run 

**expo start**

=> to run the app.


## Debug this app:

Run **sudo yarn global add react-devtools@3.2.3** to install react-devtools.

In the ReactNative/confusion folder and run **react-devtools**.



## Publish and Distribute this App:

1. Publish: https://docs.expo.io/workflow/publishing/.

2. Distribute to App stores: https://docs.expo.io/distribution/app-stores/.