const firebase = require("firebase-admin");

// initialize the Firebase Admin SDK with your service account key
firebase.initializeApp({
    credential: firebase.credential.cert('./serviceAccountKey.json'),
});

// create a reference to the Cloud Firestore database
const db = firebase.firestore();

module.exports = {
    db,
};
