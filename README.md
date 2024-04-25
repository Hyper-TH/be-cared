## This web application is no longer deployed

# beCared
## A medical web application made for you

This is my Final Year Project. It stands as a testament to how medical web applications can evolve, offering broad accessibility and utility to users of all ages and technical skill levels.

- Users can search for medicines that are available in [medicines.ie](https://www.medicines.ie).
- Users can have a personal list of saved medicines and be up to date with SPC/PIL documents.
- Users can search for drug and food interactions, pulled from [drugbank.com](https://go.drugbank.com).
- Users can search for biochemical products, pulled from [sigmaaldrich.com](https://www.sigmaaldrich.com/IE/en).


This project was submitted at the 12th of April, 2024.

## Prerequisites
- Node.js v18.18.0
- A Firebase account
- A server: [be-cared-server](https://github.com/Hyper-TH/be-cared-server)
- A cup of coffee

## Install dependencies
```
npm install @headlessui/react
npm install @react-pdf-viewer/core
npm install axios
npm install dompurify
npm install firebase firebase-admin
npm install flowbite flowbite-react
npm install react
npm install react-router-dom
npm install react-spinners
npm install nodemon
npm install autoprefixer postcss tailwindcss
npm install @tailwindcss/aspect-ratio
npm install @tailwindcss/line-clamp
```

## Firebase Private Key
Within your Firebase console, go to:

`Project settings` > `Service Accounts`

Then select `Generate new private key`

Then paste the values into the `.env.example`

## Environment variables
Use the `.env.example` file as a template (and remove `.example`). All of the environment variable values can be found within your `config.js` from your Firebase account. The `REACT_APP_LOCALHOST` variable can be your `localhost` domain or your deployed link.