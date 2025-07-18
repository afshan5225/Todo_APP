import User from "../modals/User.js";
import generateToken from "../utils/generateToken.js";


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  const user = await User.create({ username, email, password });

  if (user) {
    
    res.status(201).json({
      success: true,
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};





export const loginUser = async(req,res)=>{
    const{email,password} = req.body;

    const user =  await User.findOne({email});

    if(!user){
        return res.status(400).json({message:'User not found'});
    }

    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        return res.status(401).json({message:"invalid credentials!"})
    }
    const token = generateToken(res,user._id)

    res.status(200).json({
        
        success: true,
        
        _id:user._id,
        username:user.username,
        email:user.email,
        
    })
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};


export const logoutUser = async(req,res)=> {

    res.cookie('jwt',"",{
    httpOnly:true,
    expires: new Date(0)

    })

    res.status(200).json({message:"logged out successfully!"})

}