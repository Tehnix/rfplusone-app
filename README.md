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

# Compling SVG images

First inkscape is needed. Either download it or install via homebrew and cask

```bash
brew cask install inkscape
```

and imagemagick

```bash
brew install imagemagick
```

then finally, run `make` in graphics

```bash
cd graphics
make
```

and the images should be created.

# Dependencies

Basically the following should be enough, but in any case, the rest of the dependencies are listed here as well.

```bash
npm -i install
rnpm install react-native-fbsdk
```

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
npm install --save react-router
npm install --save react-native-router-flux
```

## Installing immutable.js
```bash
npm install --save immutable
```


## Adding persistence
```bash
npm install --save redux-persist
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


# Complains about missing module with graphics
Related to [https://github.com/facebook/react-native/issues/4968](https://github.com/facebook/react-native/issues/4968). Only fix that worked for me, personally, was to rebuild in Xcode.
