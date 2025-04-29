const authEx = async (req, res, next) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization?.split(" ")[1];

  if (token !== "secret") {
    return res.status(401).json({ message: "Not authorized - No token" });
  }

  next();
};

export default authEx;
