import jwt from 'jsonwebtoken'
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1hr"
    })
    const isSecure = process.env.NODE_ENV === 'production'; // Check if the environment is production (HTTPS)

    res.cookie("myJWT_Cookie", token, { //this will set a cookie named  myJWT_Cookie but  the token variable should contain the actual token value

        httpOnly: true,// this will restrict the cookie from being accessesed by client side scripts , basically it prevents croos site scripting attacks

        secure: isSecure,//this will make sure the exchange of cookies only on https connections making it more secure

        sameSite: "strict", // this  will make sure to send the cookie in first part context and avoid CSRF

        maxAge: 60 * 60 * 1000 // this will make sure to expire token in given time in this case 1hr
    })
}

export default generateToken