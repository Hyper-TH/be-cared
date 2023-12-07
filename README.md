# Pre-requisites

## Firebase setup

You must have a Firebase account setup.

## Firestore [FOR PROTOTYPE]
Have a collection named `SPC` be initalized

### Private key

Within your Firebase console, go to:

`Project settings` > `Service Accounts`

Then select `Generate new private key`

Paste this into `mock_files/mock_creds.json`

Note that it's preferrable to rename these according to the way it's imported within `server.js`

### Project ID

Within your Firebase console, go to:

`Project settings`

The `Project ID` should be displayed.

Paste this into `mock_files/.test.env` and rename file to `.env`

### Firebase config

Within your Firebase console, go to:

`Project settings`

Below the `Your project` section is another section called `Your apps`

Copy the SDK setup and configuration.

Paste this into `mock_files/mock_config.json`

Note that it's preferrable to rename these according to the way it's imported within `server.js`

## Libraries

Within the `be-cared` directory, run these scripts

```
npm install axios
npm install react-router-dom
npm install nodemon
```

Within the `server` directory, run these scripts
```
npm install nodemon
npm install @google-cloud/firestore
npm install axios
npm install cors
npm install dotenv
npm install express
npm install firebase
npm install firebase-admin
npm install https
```