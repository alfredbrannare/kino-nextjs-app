export const checkAuth = (req) => {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(" ")[1];
  console.log(authHeader);

  if (token !== `${process.env.SECRET}`) {
    return false;
  }
  return true;
};
