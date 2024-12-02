const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

let firebaseApp;

function initFirebase() {
    if (!firebaseApp) {
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('Firebase initialized');
    }
    return firebaseApp;
}

module.exports = { initFirebase };
