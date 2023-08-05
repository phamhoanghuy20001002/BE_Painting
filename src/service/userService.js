const db = require("../models")
import bcrypt, { hash } from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let Register = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.email || !data.password
                || !data.phoneNumber) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter user'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)

                await db.User.create({
                    name: data.name,
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    phoneNumber: data.phoneNumber,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error);
        }

    })
}
let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'name', 'password', 'phoneNumber', 'id'],
                    where: { email: email },
                    raw: true

                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'ok';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `your's email isn't exist in your system.Plz try other email`;

            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error);
        }

    })
}
module.exports = {
    Register: Register,
    handleLogin: handleLogin,

}