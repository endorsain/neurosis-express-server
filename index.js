import http from "http";
import express from "express";
// middleware
import cookieParser from "cookie-parser";
import corsMiddleware from "./middlewares/cors-midd.js";
import errorMiddleware from "./middlewares/error-midd.js";
// routes
import commonWebUserRouter from "./routes/common-web-user/index.js";
//mongo
import connectToMongoDB from "./config/mongodb-connection.js";

const port = process.env.PORT || 1234;
const app = express();
connectToMongoDB(); // Conexion con mongo
app.use(express.json()); // Middleware para parsear JSON
app.use(cookieParser()); // Middleware para las cookies
app.use(express.urlencoded({ extended: true })); // Middleware para parsear bodies URL-encoded
app.use(corsMiddleware); // Middleware CORS

app.use("/common-web-user", commonWebUserRouter);

app.use(errorMiddleware); // Middleware para ERRORES

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server corriendo en el puerto ${port}`);
});
