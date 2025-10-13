const User = require('../model/user');
const {hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// test
const test = (req,res) => {
    res.json('test is working')
};

// register
const registerUser = async (req,res) => {
    const token = jwt.sign(
        { id: register._id, email: register.email},
        process.env.JWT_SECRET,
        {expiredIn: '1d'}
    );
    try {
        const {name, dob, email, password} = req.body;
        // validate required fields
        if (!name || !dob || !email || !password){
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        if (password.length < 8){
            return res.status(400).json({
                error: 'Password must be atleast 6 characters'
            });
        }
        
        // check if email is already registered
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({
                error: 'Email is already taken'
            });
        }
        // hash password and create user
        const hashedPassword = await hashPassword(password)
        const register = await User.create({
            name,
            dob,
            email,
            password: hashedPassword
        });
        
        res.status(201).json({
            message: 'User registered successfully.',
            user: {
            id: register._id,
            name: register.name,
            email: register.email,
        },
        token,
        });

    } catch (error) {
        console.error('Register error', error.message);
        res.status(500).json({error: 'Internal server error'});

}
};

// login 
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        //validate input
        if (!email || !password) {
            res.status(400).json({
                error: 'Email and Password is required.'
            });
        }

        //check if the user exists
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({
                error: 'No user with this email found'
            });
        }

        //check if the passwords match
        const isMatch = await comparePassword( password, user.password );
        if (!isMatch) {
        res.status(401).json({ error: 'Invalid password' });
        }
        
        // generate jwt token
        const token = jwt.sign(
            {id: user._id, email: user.email, name:user.name},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );
        res
            .cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: listSearchIndexes,
            })
            .json({ 
                message: 'Login successful',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
            },
        });
        } catch (error){
            console.error('Login Error: ', error.message);
            res.status(500).json({error: 'Internal server error.'});
        }
};
module.exports = {
    test,
    registerUser, 
    loginUser
};