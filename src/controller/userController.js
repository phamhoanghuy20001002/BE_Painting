import userService from "../service/userService"
const handleRegister = async (req, res) => {
    try {
        let data = await userService.Register(req.body)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'email already in use'
        })
    }
}
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs'
        })
    }
    let userData = await userService.handleLogin(email, password)
    //check email exist
    //compare password
    // return userInfo
    //access token:jwt (json web token)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = { handleRegister, handleLogin };