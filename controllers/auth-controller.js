/* import { AuthSignupModel, AuthSigninModel } from "../models/auth-model.js";
import { sendSuccessResponse } from "../utils/helpers/responses.js";
import { addResMiddleware } from "../middlewares/add-res.js";
import { signupValidate } from "../utils/auth.schema.js";
import { auth_paths } from "../utils/paths-names.js";
import createError from "http-errors";

export class AuthController {
  static async signUp(req, res, next) {
    const userForm = signupValidate(req.body);

    // Esto nunca retorna al front-end
    if (userForm.error) {
      const errors = userForm.error.errors.map((err) => ({
        path: err.path[0],
        message: err.message,
      }));
      return res.status(400).json({ errors });
    }

    const { em, ps, un, nm, ln } = userForm.data;
    console.log(userForm.data);

    try {
      const usernameExists = await AuthSignupModel.checkUsernameExists(un);
      if (usernameExists) {
        throw createError(400, "The username is already in use", {
          path: auth_paths.sign_up.error.username,
          frontMsg: "Username already exists.",
        });
      }

      const newUser = await AuthSignupModel.createUserInFirebase(em, ps);
      await AuthSignupModel.saveUserInfo(newUser, un, nm, ln);

      const customToken = await AuthSignupModel.setCustomClaims(newUser, un);

      console.log(customToken);

      sendSuccessResponse(
        res,
        { idToken: customToken },
        auth_paths.sign_up.success,
        200,
        null
      );
    } catch (error) {
      console.error("Error en endpoint /sign-up: ", error);

      if (error.path) {
        next(error);
      } else {
        if (error.code === "auth/email-already-exists") {
          next(
            createError(400, "The email is already in use", {
              path: auth_paths.sign_up.error.email,
              frontMsg: "Email already exists.",
            })
          );
        }
        next(
          createError(500, "Error registering user", {
            path: auth_paths.sign_up.error.default,
            frontMsg: "Error creating user.",
          })
        );
      }
    }
  }
  static async signIn(req, res) {
    try {
      const idToken = req.headers.authorization?.split(" ")[1];
      const refreshToken = req.headers["x-refresh-token"];

      if (!idToken && !refreshToken) {
        //return res.status(400).json({ error: "auth/sign-in/tokens-are-missing" });
        throw createError(400, "Tokens not found", {
          path: auth_paths.sign_in.error.tokens,
        });
      }

      console.log("esto es control auth: ", refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      sendSuccessResponse(res, null, auth_paths.sign_in.success, 200, null);
    } catch (error) {
      console.error("Error en endpoint /sign-in: ", error);

      if (error.path) {
        next(error);
      } else {
        next(
          createError(500, "Error logging in", {
            path: auth_paths.sign_in.error.default,
            frontMsg: "Error logging in.",
          })
        );
      }
    }
  }
} */
