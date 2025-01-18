const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { createToken } = require('../middlewares/auth')
const cloudinary = require('cloudinary')


exports.register = async (req, res) => {
    try {
        const { name, email, password, avatar, skills, resume } = req.body;

        // Check for missing fields
        if (!name || !email || !password || !avatar || !resume) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Upload avatar to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'avatar',
            crop: "scale",
        }).catch((err) => {
            return res.status(500).json({ message: 'Failed to upload avatar to Cloudinary', error: err.message });
        });

        // Upload resume to Cloudinary
        const myCloud2 = await cloudinary.v2.uploader.upload(resume, {
            folder: 'resume',
            crop: "fit",
        }).catch((err) => {
            return res.status(500).json({ message: 'Failed to upload resume to Cloudinary', error: err.message });
        });

        // Hash password
        const hashPass = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashPass,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            skills,
            resume: {
                public_id: myCloud2.public_id,
                url: myCloud2.secure_url
            }
        });

        // Create token
        const token = createToken(user._id, user.email);

        // Send response
        res.status(201).json({
            message: "User Created",
            user,
            token
        });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                
                message: "User does not exists"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                
                message: "Wrong Password"
            })
        }

        const token = createToken(user._id, user.email)

        res.status(200).json({
            
            message: "User logged In Successfully",
            token
        })



    } catch (err) {
        res.status(500).json({
            
            message: err.message
        })
    }
}


exports.isLogin = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        if (user) {
            return res.status(200).json({
                
                isLogin: true
            })
        } else {
            return res.status(200).json({
                
                isLogin: false
            })
        }

    } catch (err) {
        res.status(500).json({
            
            message: err.message
        })
    }
}

exports.me = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            
            user
        })

    } catch (err) {
        res.status(500).json({
            
            message: err.message
        })
    }
}

exports.changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findById(req.user._id)

        const userPassword = user.password;

        const isMatch = await bcrypt.compare(oldPassword, userPassword);

        if (!isMatch) {
            return res.status(401).json({
                
                message: "Old password is wrong"
            })
        }

        if (newPassword === oldPassword) {
            return res.status(400).json({
                
                message: "New password is same as old Password"
            })
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).json({
                
                message: "New Pasword and Confirm Password are not matching"
            })
        }

        const hashPass = await bcrypt.hash(newPassword, 10);

        user.password = hashPass;

        await user.save();

        res.status(200).json({
            
            message: "User password changed"
        })



    } catch (err) {
        res.status(500).json({
            
            message: err.message
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { newName, newEmail, newAvatar, newResume, newSkills } = req.body;

        const user = await User.findById(req.user._id);

        const avatarId = user.avatar.public_id ;
        const resumeId = user.resume.public_id ;

        await cloudinary.v2.uploader.destroy(avatarId) ;
        await cloudinary.v2.uploader.destroy(resumeId) ;

        
        const myCloud1 = await cloudinary.v2.uploader.upload(newAvatar, {
            folder: 'avatar',            
            crop: "scale",
        })

        const myCloud2 = await cloudinary.v2.uploader.upload(newResume, {
            folder: 'resume',           
            crop: "fit",
        })
      

        user.name = newName
        user.email = newEmail
        user.skills = newSkills
        user.avatar = {
            public_id: myCloud1.public_id,
            url: myCloud1.secure_url
        }
        user.resume = {
            public_id: myCloud2.public_id,
            url: myCloud2.secure_url
        }

        await user.save()

        res.status(200).json({
            
            message: "Profile Updated"
        })


    } catch (err) {
        res.status(500).json({
            
            message: err.message
        })
    }
}


exports.deleteAccount = async (req,res) => {
    try{

        const user = await User.findById(req.user._id) 

        const isMatch =  await bcrypt.compare(req.body.password, user.password);
        
        if(isMatch){
            await User.findByIdAndRemove(req.user._id) ;
        }else{
            return res.status(200).json({
                
                message: "Password does not match !"

            })
        }
        

        res.status(200).json({
            
            message: "Account Deleted"
        })

    }catch(err){
        res.status(500).json({
            
            message: err.message
        })
    }
}