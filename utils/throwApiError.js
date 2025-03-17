const throwApiError = ({
  message,
  // statusCode = 500,
  // code = "server/error",
  // type = "server_error",
  statusCode = null,
  code = "throw-api-error",
  type = "throw_api_error",
  details = null,
}) => {
  const error = new Error(message);
  error.status = statusCode;
  error.code = code;
  error.type = type;
  error.details = details;
  throw error;
};

export default throwApiError;
