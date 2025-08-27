const bcrypt = require('bcryptjs')
const userModel = require('../../models/user')
const jwt = require("jsonwebtoken")


const register = async (req, res) => {
    let { userName, email, password } = req.body;

    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new userModel({ userName, email, password: hash });
        await user.save();
        res.status(200).json({
            success: true,
            message: "registration successfull"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured "
        })
    }
}

const login = async (req, res) => {
    let { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser)
            return res.status(400).json({ success: false, message: "User Not Exist! Kindly Register" })

        const checkPassword = await bcrypt.compare(password,existingUser.password );

        if(!checkPassword){
            return res.json({ success: false, message: "Incorrect Password ! Try again" })
        }
         

        const token = jwt.sign({id:existingUser._id ,role: existingUser.role ,email: existingUser.email ,userName:existingUser.userName},'CLIENT_SECRET_KEY',{expiresIn:'60m'})
        
        
        res.cookie('token' , token ,{httpOnly:true , secure:false}).json({
            success:true,
            message:"Login Successfully",
            user:{
                email:existingUser.email,
                id:existingUser._id,
                role:existingUser.role,
                userName:existingUser.userName,
            }
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const logout = async (req ,res)=>{
    res.clearCookie("token")

    res.status(200).json({
        success: true,
        message: "Logout Successfully!"
    });
}

const authMiddleware = async (req,res,next)=>{
        const token = req.cookies?.token;
       
        if(!token) { return res.status(401).json({success:false , message:"Unauthorized User! No token "})}

        try{
            const decodedToken = jwt.verify(token , 'CLIENT_SECRET_KEY');
            req.user = decodedToken;
            next()

        }catch(error){
            res.status(401).json({success:false , message:"Unauthorized User!"})
        }
}

module.exports = { register ,login , logout ,authMiddleware }
