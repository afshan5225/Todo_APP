import User from "../modals/User.js";
import generateToken from "../utils/generateToken.js";

// 📝 Register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const user = await User.create({ username, email, password });

  if (user) {
    const token = generateToken(res, user._id); // 🔷 missing in your code!
    res.status(201).json({
      success: true,
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// 📝 Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = generateToken(res, user._id);

  res.status(200).json({
    success: true,
    _id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
};

// 📝 Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    console.log(user)
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// 📝 Logout
export const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully!" });
};

// 📝 Fetch all users (to assign todos)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id username email"); 
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
