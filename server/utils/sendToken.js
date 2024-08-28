// token creation and saving in cookie

const send_token = (user, statuscode, res) => {
  const token = user.generateToken();

  //options for cookie
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statuscode).cookie("aktoken", token, options).json({
    success: true,
    user: user,
  });
};

module.exports = send_token;
