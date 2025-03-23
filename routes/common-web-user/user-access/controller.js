import { auth } from "../../../config/firebase-admin.js";
import { userModel } from "../../../mongo/index.js";
import { sendSuccessResponse, throwApiError } from "../../../utils/index.js";

export const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // compara si el nombre de usuario o email existen
    const existingUser = await userModel.findOne(
      { $or: [{ "auth.email": email }, { "profile.username": username }] },
      { "auth.email": 1, "profile.username": 1, _id: 0 }
    );
    if (existingUser) {
      throwApiError({
        message:
          existingUser.auth.email === email
            ? "Email already exists."
            : "Username already exists.",
        statusCode: 400,
        code:
          existingUser.auth.email === email
            ? "auth/email-already-exists"
            : "auth/username-already-exists",
        type: "validation_error",
        details: null,
      });
    }

    //Crea usuario en firebase
    const createUserFirebase = await auth.createUser({
      email,
      password,
    });
    //Id de el nuevo usuario
    const firebaseUID = createUserFirebase.uid;

    const newUser = new userModel({
      user_data: {
        firebase_auth: {
          firebase_id: firebaseUID,
          email,
        },
        profile: {
          username,
          email,
        },
      },
    });
    const savedUser = await newUser.save();
    const userId = savedUser._id;

    //Establece los nuevos parametros para el idToken
    await auth.setCustomUserClaims(firebaseUID, {
      user_data: {
        firebase_id: firebaseUID,
        username,
        user_id: userId,
      },
    });
    //Crea el nuevo idToken
    const customToken = await auth.createCustomToken(firebaseUID);
    console.log("____idToken: ", customToken);

    return sendSuccessResponse(res, {
      data: {
        userId,
        idToken: customToken,
      },
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.headers["x-refresh-token"];

    //TODO: Mejorar este error con throwError()
    if (!idToken && !refreshToken) {
      throw new Error("Missing tokens /sign-in request.");
    }

    //console.log("idToken: ", idToken);
    //console.log("refreshToken: ", refreshToken);

    res.cookie(process.env.KEY_REFRESHTOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.cookie(process.env.KEY_IDTOKEN, idToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return sendSuccessResponse(res, {
      data: {
        idToken,
      },
      message: "User login successful",
      status: 200,
    });
  } catch (error) {
    next(error);
  }
};
