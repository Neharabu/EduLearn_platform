const User = require('../modals/user')
const Course = require('../modals/course')
const Course_topic = require('../modals/course_topic')
const Batch = require('../modals/batch')

exports.topic_access=async(req,res,next)=>{

try {
const student = await User.findById(req.user._id)
const {index} = req.query
const batch  = await Batch.findById(student.current_batch)
if(batch.batch_period === index+1){
    return res.status(403).json({
        success:false,
        message:'NO access'
    })
}

next()

} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
}


}