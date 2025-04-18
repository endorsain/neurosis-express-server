import throwApiError from "../../utils/throwApiError.js";
import { checkMonthlyTrackingInToken } from "./utils/checkMonthlyTrackingInToken.js";

const webTokenValidationMiddleware = async (req, res, next) => {
  try {
    console.log("----web token validation middleaware----");
    const idTokenKey = process.env.KEY_IDTOKEN;
    const refreshtTokenKey = process.env.KEY_REFRESHTOKEN;

    const idToken = req.cookies[idTokenKey];
    const refreshToken = req.cookies[refreshtTokenKey];
    const params = await req.query;

    // console.log("---idtoken: ", idToken);
    // console.log("---refreshToken: ", refreshToken);

    if (!refreshToken || refreshToken === undefined || !params.currentDate) {
      console.log("No hay tokens");
      throwApiError({
        message: "Missing tokens",
        statusCode: 401,
        code: "auth/missing_tokens",
      });
    }
    //TODO: Verificar si refreshToken es valido.
    // - Firebase no tiene forma de verificar el refreshToken.
    // - Guardar el refreshToken en la base de datos para verificar la validez.

    const checkProgress = await checkMonthlyTrackingInToken(
      idToken,
      refreshToken,
      Number(params.currentDate)
    );

    res.cookie(process.env.KEY_REFRESHTOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.cookie(process.env.KEY_IDTOKEN, checkProgress.idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    req.body = { ...req.body, userData: checkProgress.userData };

    next();
  } catch (error) {
    console.log("salio mal", error);
    res.clearCookie(process.env.KEY_REFRESHTOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.clearCookie(process.env.KEY_IDTOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    next(error);
  }
};

export default webTokenValidationMiddleware;
