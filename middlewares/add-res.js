// web
export const addResWebMidd = (res, body) => {
  if (res.locals.idToken) {
    return {
      ...body,
      idToken: res.locals.idToken,
    };
  }
  return body;
};
// mobile
export const addResMobileMidd = (res, body) => {
  if (res.locals.idToken && res.locals.refreshToken) {
    return {
      ...body,
      idToken: res.locals.idToken,
      refreshToken: res.locals.refreshToken,
    };
  }
  return body;
};
