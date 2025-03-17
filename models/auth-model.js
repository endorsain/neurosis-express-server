import { db, auth } from "../config/firebase-admin.js";

export class AuthSignupModel {
  static async checkUsernameExists(username) {
    const userStatusDoc = await db
      .collection("users-status")
      .doc(username)
      .get();
    return userStatusDoc.exists;
  }
  static async createUserInFirebase(email, password) {
    return await auth.createUser({ email, password });
  }
  static async saveUserInfo(newUser, un, nm, ln) {
    const uI = {
      em: newUser.email,
      un,
      nm,
      ln,
    };
    await db.collection("users").doc(newUser.uid).set({
      uI,
      cA: new Date().toISOString(),
    });

    await db
      .collection("users-status")
      .doc(un)
      .set({
        uI,
        uS: {
          //user status
          iO: false, //is Online
        },
        cA: new Date().toISOString(),
      });
  }
  static async setCustomClaims(newUser, un) {
    await auth.setCustomUserClaims(newUser.uid, { un });
    return await auth.createCustomToken(newUser.uid);
  }
}

export class AuthSigninModel {
  static async verifyIdToken(token) {
    await auth.verifyIdToken(token);
  }
}
