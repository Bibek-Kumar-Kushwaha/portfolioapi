import encryptPassword from '../Utils/Bcrypt.js';
import userRegisterSchema from '../models/userRegisterSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const register = async (req, res) => {

    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required😁' });
    }

    try {
        // Check if the username or email already exists
        const existingUser = await userRegisterSchema.findOne({
            $or: [{ username }, { email }]
        });

        //check user is existing or not is our database
        if (existingUser) {
            return res.status(409).json({ message: 'User already registered👍' });
        }
        //hashing password
        const hashPassword = await encryptPassword(password, 10);

        // Create a new user instance with the provided data
        const userData = new userRegisterSchema(
            {
                username,
                email,
                password: hashPassword
            }
        );

        // Save the user data to the database
        await userData.save();

        // Send a success response with the registered user data
        res.status(201).json({ message: 'Successfully registered😊', data: userData });
    } catch (error) {
        // Log the error and send an error response with details
        console.error('Error saving user data:', error);
        res.status(500).json({ error: 'Error registering user😒', details: error.message });
    }
};

const login = async (req, res) => {
    // Destructure email, username, and password from the request body
    const { email, username, password } = req.body;

    // Ensure either email or username is provided
    if (!email && !username) {
        return res.status(400).json({ message: 'Either Email or Username is required😁' });
    }

    // Ensure password is provided
    if (!password) {
        return res.status(400).json({ message: 'Password is required😁' });
    }

    try {
        // Find the user by username or email
        const existingUser = await userRegisterSchema.findOne({
            $or: [{ username }, { email }]
        });

        // If the user does not exist, return an error response
        if (!existingUser) {
            return res.status(409).json({ message: 'You are not registered yet😒' });
        }

        // Compare the provided password with the stored hashed password
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);

        // If the password does not match, return an unauthorized response
        if (!isCorrectPassword) {
            return res.status(401).json({ message: 'Your credentials do not match😩' });
        }

        //cookies set
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            path: '/',
            expiresIn: 84600 * 7,
            sameSite: 'None'
        }

        res.cookie('token', token, {
            ...cookieOptions
        })


        // If the password matches, return a success response
        res.status(200).json({ message: 'Successfully Logged in😊' });
    } catch (error) {
        // Log the error and send an error response with details
        console.error({ message: 'Error on login', error });
        res.status(500).json({ message: 'Error on login😒', details: error.message });
    }
};

export { register, login };
