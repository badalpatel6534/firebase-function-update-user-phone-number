
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json'); // you can found serviceAccountKey from firebase console project setting 


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "" // database URL found from firebase console project setting
});



export const updateUserPhoneNumber = functions.https.onCall(
    async (request, context) => {
      try {
        console.log('request............', request);
        const userUpdate = await admin.auth().updateUser(request.uid, {
          phoneNumber: request.phoneNumber
        });
        return userUpdate;
      } catch (e) {
        return e;
      }
    }
  );