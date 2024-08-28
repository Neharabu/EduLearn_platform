const jwt = require("jsonwebtoken");
const User = require("../modals/user");

exports.auth = async (req, res, next) => {
  try {
    const { aktoken } = req.cookies;
    if (!aktoken) {
      return res.status(401).json({
        success: false,
        message: "login to access this resource",
      });
    }
    const decode_data = jwt.verify(aktoken, process.env.JWT_SECRET);
    req.user = await User.findById(decode_data._id);
    if(req.user.status === false){
      return res.status(403).json({
        success: false,
        message:'This Email is Deactivated'
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.admin=async(req,res,next)=>{


  try {
    const { aktoken } = req.cookies;

    if (!aktoken) {
      return res.status(401).json({
        success: false,
        message: "login to access this resource",
      });
    }
    const decode_data = jwt.verify(aktoken, process.env.JWT_SECRET);
    req.user = await User.findById(decode_data._id);
    if(req.user.status === false){
      return res.status(403).json({
        success: false,
        message:'This Email is Deactivated'
      });
    }

if(req.user.role != "admin"){
  return res.status(403).json({
success:false,
message:'NO Access to this IP'
  })
}


    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
}

exports.me=async(req,res,next)=>{


  try {
    const { aktoken } = req.cookies;

    if (!aktoken) {
      return res.status(401).json({
        success: false,
        message: "login to access this resource",
      });
    }
    const decode_data = jwt.verify(aktoken, process.env.JWT_SECRET);
    const user = await User.findById(decode_data._id).populate('current_batch')
    if(user.status === false){
      return res.status(403).json({
        success: false,
        message:'This Email is Deactivated'
      });
    }

return res.status(200).json({
  success:true,
  user
})



  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
}