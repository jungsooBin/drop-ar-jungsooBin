# drop-ar

A React Native iOS app that lets users create 3D art in augmented reality

## features

- Signup/login with email or Facebook account
- Explore a universal feed of 3D art
- View an art and give it a like
- Create an art and save it to the feed
- Collaborate with others in real-time

## [demo](https://www.youtube.com/watch?v=AEFKYCpou0k)

## Setup

To use this app, you'll need to take the following steps:

* Run the following commands:

```
git clone https://github.com/drop-ar/drop-ar
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json`
* `npm install`
* `go domain.js and change the Ip Address what you're using`
* This file is `.gitignore`'d, and will *only* be required in your *development* environment

Follow firebase instructions and add your own information into your config object in secrets.js: 

```
//FaceBook
process.env.FACEBOOK_APP_ID = '';
process.env.FACEBOOK_CLIENT_SECRET = '';
const firebaseConfig = {
 apiKey: '',
 authDomain: '',
 databaseURL: '',
 projectId: '',
 storageBucket: '',
 messagingSenderId: '',
};
export default firebaseConfig;
```

All of this info can be found in your Firebase console and Facebook OAuth.

## Start
You'd better download Expo App first. It can be downloaded from Apple’s App Store or Android Market.
`npm run start-dev` will run the server.
`npm start` will run the app using Expo.

## Usage

![home](https://github.com/jungsooBin/drop-ar-jungsooBin/blob/master/screenshots/Screen%20Shot%202018-12-26%20at%205.51.51%20PM.png "Home")
![journal](https://github.com/jungsooBin/drop-ar-jungsooBin/blob/master/screenshots/Screen%20Shot%202018-12-26%20at%205.52.15%20PM.png "Feed")
![contacts](https://github.com/jungsooBin/drop-ar-jungsooBin/blob/master/screenshots/Screen%20Shot%202018-12-26%20at%205.52.39%20PM.png "Load Scene")

## Credits

[Jungsoo Bin](https://www.linkedin.com/in/jungsoo-bin-1a2b9b136/)
[Zohayb Shaikh](https://www.linkedin.com/in/zohaybshaikh/)
[Brian Kim](https://www.linkedin.com/in/brianjckim/)
[Matthew Dworkin](https://www.linkedin.com/in/matthew-dworkin-phd/)