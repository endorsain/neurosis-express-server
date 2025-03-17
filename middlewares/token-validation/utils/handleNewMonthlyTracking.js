import { monthlyTrackingMondel } from "../../../mongo/index.js";
import { auth } from "../../../config/firebase-admin.js";
import { renewTokens } from "./renewTokens.js";

export const handleNewMonthlyTracking = async (refreshToken, userData) => {
  const newMonthlyTrackingId = await createMonthlyTrackingDoc(userData.user_id);

  Object.assign(userData, {
    monthly_tracking: {
      id: newMonthlyTrackingId.toString(),
      created_at: Date.now(),
    },
  });

  const newIdToken = await updateTokenClaims(
    userData.firebase_id,
    refreshToken,
    userData
  );

  return { idToken: newIdToken, userData };
};

const createMonthlyTrackingDoc = async (userId) => {
  const newMonthlyTracking = await monthlyTrackingMondel.create({
    user_id: userId,
  });

  return newMonthlyTracking._id;
};

const updateTokenClaims = async (firebaseId, refreshToken, claims) => {
  await auth.setCustomUserClaims(firebaseId, { user_data: claims });
  const newIdToken = await renewTokens(refreshToken);
  console.log("renewToken: ", newIdToken);

  return newIdToken;
};

//TODO: Importante
// await updateUserProgress(userId, newProgressId, time.year, time.month);

// const updateUserProgress = async (userId, newProgressId, year, month) => {
//   await userModel.updateOne(
//     { _id: userId },
//     {
//       $push: {
//         "progressPerMonth.records": {
//           progressId: newProgressId,
//           createdAt //Aunque esto tendria que estar en "meta"
//           // year,
//           // month,
//           totalTime: 0,
//           progressTime: 0,
//         },
//       },
//     }
//   );
// };
