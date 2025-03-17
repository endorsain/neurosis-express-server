const errorMiddleware = (err, req, res, next) => {
  console.error("Server Error: ", err);

  const statusCode = err.status || 500;
  const response = {
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error",
    error: {
      code: err.code || "server/error",
      type: err.type || "server_error",
      details: err.details || null,
    },
  };
  console.log(response);

  res.status(statusCode).json(response);
};

export default errorMiddleware;
