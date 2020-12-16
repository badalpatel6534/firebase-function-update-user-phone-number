
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
        // step to call callable function from Angular/Ionic
        // 1) function module import in app.module.ts
        //    import { AngularFireFunctionsModule } from '@angular/fire/functions';
        //    imports: [AngularFireFunctionsModule]
        // 2) Now, import function in class (component/page)
        //    import { AngularFireFunctions } from '@angular/fire/functions';
        // 3) inject dependency in constructor
        //    private functions: AngularFireFunctions
        // 4) call callable function
        //    const callable = this.functions.httpsCallable('updateUserPhoneNumber');
        //    const obs = callable({ uid: this.user.patientId, phoneNumber: '+91xxxxxxxxxx' });
        //    obs.subscribe(async res => {});
        const userUpdate = await admin.auth().updateUser(request.uid, {
          phoneNumber: request.phoneNumber
        });
        return userUpdate;
      } catch (e) {
        return e;
      }
    }
  );