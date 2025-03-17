import cors from "cors";

const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS
  ? process.env.ACCEPTED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:5173", "http://localhost:8081"];

const corsMiddleware = async (req, res, next) => {
  try {
    console.log("EMPIEZA CORS");
    const clientType = req.headers["x-client-type"];

    const corsOptions = {
      credentials: true,
      origin: (origin, callback) => {
        if (clientType === "mobile") {
          callback(null, true);
        } else if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    };

    const corsHandler = cors(corsOptions);
    corsHandler(req, res, next);
    // cors(corsOptions)(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default corsMiddleware;
