import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    // userschema.pre is a hook this means tha befor we 'save' you have to perform this task
    if (!this.isModified("password")) {  // and here "this" belongs to the particula class or the user that is being created 
        //remeber to use the password field or any field here in ""
        next()  // next simply means proceed  next 
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const UserModel = mongoose.model("Users", userSchema)
export default UserModel