# RF +1 App (react version)
The react version of the RF+1 app.

Technologies used:

* React-native
* Redux
* Immutable.js
* Facebook's SDK


# Running the simulators
For iOS use

```bash
react-native run-ios
```

and for Android use

```bash
react-native run-android
```

# Dependencies
## Installing redux
Install redux

```bash
npm install --save redux
```

and react bindings along with dev tools

```bash
npm install --save react-redux
npm install --save-dev redux-devtools
```

and for routing

```bash
npm install --save react-router-redux
```

## Installing immutable.js
```bash
npm install --save immutable
```


## Setting up Facebook SDK for Facebook login
For the JavaScript packages install `rnpm`

```bash
npm install -g rnpm
```

and then install the react-native-fbsdk with

```bash
rnpm install react-native-fbsdk
```

Then you need to configure the projects iOS and Android projects by following  
[the react-native-fbsdk configuration guide](https://github.com/facebook/react-native-fbsdk) (already done, but if something is missing this might be the place to start).


# Setting up the Android project
Open the `/android` folder in Android Studio as an existing Android Studio project. This will run gradle and setup the project and make sure you have the correct dependencies (for example build-tools etc).


# Setting up the iOS project
Open the `/ios/PlusOne.xcodeproj` project with xCode.
