import UserModel from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js'

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    if (!name || !email || !password) {
        throw new Error("Name, email, and password are required fields");
    }

    // Create a new user
    const authenticatedUser = await UserModel.create({ name, email, password });
    if (authenticatedUser) {
        console.log(authenticatedUser)
        generateToken(res, authenticatedUser._id)

        res.status(200).json({

            _id: authenticatedUser._id,
            name: authenticatedUser.name,
            email: authenticatedUser.email,

        })
        console.log(authenticatedUser)

    } else {
        res.status(400)
        throw new Error("invalid user credentials ")

    }

})

const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ error: "enter all the desired fields" })
    }
    const authenticatedUser = await UserModel.findOne({ email });

    if (authenticatedUser && (await authenticatedUser.matchPasswords(password))) {
        generateToken(res, authenticatedUser._id)

        res.status(200).json({

            _id: authenticatedUser._id,
            name: authenticatedUser.name,
            email: authenticatedUser.email,

        })
        console.log(authenticatedUser)

    } else {
        res.status(400).json({ error: "invalid email or passwords" })

    }
}
export { registerUser, loginUser }