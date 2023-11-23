import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  console.log(res)
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("jwt", token, {
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 60 * 60 * 1000, //          Expires in 1 hour
  });

  return token;
};

export default generateToken;
