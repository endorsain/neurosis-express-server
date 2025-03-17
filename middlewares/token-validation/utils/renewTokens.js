export const renewTokens = async (refreshToken) => {
  //Hace una peticion utilizando la clave de firebase
  const response = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    }
  );
  const data = await response.json();
  //Retorna el idToken renovado.
  return data.id_token;
};
