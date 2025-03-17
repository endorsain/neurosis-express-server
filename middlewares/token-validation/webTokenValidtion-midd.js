import { checkMonthlyTrackingInToken } from "./utils/checkMonthlyTrackingInToken.js";

const webTokenValidationMiddleware = async (req, res, next) => {
  try {
    console.log("----web token validation middleaware----");
    const idTokenKey = process.env.KEY_IDTOKEN;
    const refreshtTokenKey = process.env.KEY_REFRESHTOKEN;

    const idToken = req.cookies[idTokenKey];
    const refreshToken = req.cookies[refreshtTokenKey];
    const params = await req.query;

    if (!refreshToken && !idToken && !params.currentDate) {
      //TODO: Usar throwApiError()
      console.log("No hay tokens");
      throw new Error("No hay tokens");
    }

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
    //TODO: Borra los cookies porque es un posible intento de hack.
    // if(error.code === 'token invalido'){
    //   res.clearCookie("nombre de la cookie", {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "None",
    //   });
    // }
    console.log("salio mal", error);
    next(error);
  }
};

export default webTokenValidationMiddleware;
