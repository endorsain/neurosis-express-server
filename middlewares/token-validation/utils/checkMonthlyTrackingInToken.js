import { handleNewMonthlyTracking } from "./handleNewMonthlyTracking.js";
import { auth } from "../../../config/firebase-admin.js";
import { renewTokens } from "./renewTokens.js";

export const descomposeUnixTimestamp = (timestamps) => {
  if (!timestamps) return null;

  const date = new Date(timestamps);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
  };
};

export const checkMonthlyTrackingInToken = async (
  idToken,
  refreshToken,
  currentDate
) => {
  try {
    return await verifyAndDecodedToken(idToken, refreshToken, currentDate);
  } catch (error) {
    if (error.code === "auth/invalid-id-token") {
      // TODO: utilizar throwApiError()
      throwApiError({
        message: "Invalid token",
        statusCode: 401,
        code: "auth/invalid_token",
      });
    }
    const newIdToken = await renewTokens(refreshToken);
    return await verifyAndDecodedToken(newIdToken, refreshToken, currentDate);
  }
};

export const verifyAndDecodedToken = async (
  idToken,
  refreshToken,
  currentDate
) => {
  const decodedIdToken = await auth.verifyIdToken(idToken, true);

  const { monthly_tracking } = await decodedIdToken.user_data;

  const desCurrentDate = descomposeUnixTimestamp(currentDate);
  const desCollDate = descomposeUnixTimestamp(monthly_tracking?.created_at);

  if (
    !monthly_tracking ||
    desCurrentDate.year !== desCollDate?.year ||
    desCurrentDate.month !== desCollDate?.month
  ) {
    const dataBeforeCheck = await handleNewMonthlyTracking(
      refreshToken,
      decodedIdToken.user_data
    );
    return {
      userData: dataBeforeCheck.userData,
      idToken: dataBeforeCheck.idToken,
    };
  }

  return { userData: decodedIdToken.user_data, idToken };
};
