const sendSuccessResponse = (
  res,
  { data = null, message = null, status = 200, headers = {} }
) => {
  // Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));

  return res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
};

export default sendSuccessResponse;
