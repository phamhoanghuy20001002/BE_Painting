const db = require("../models")


let handleAddProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.title || !data.image || !data.category
                || !data.userId || !data.price || !data.description) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter product'
                })
            } else {

                await db.Product.create({
                    title: data.title,
                    imageSrc: data.image,
                    category: data.category,
                    userId: +data.userId,
                    description: data.description,
                    price: data.price,
                    sold: 'yet'
                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok create new product success'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
let handleBuyProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.productId || !data.totalPrice) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter order'
                })
            } else {

                await db.Order.create({
                    userId: data.userId,
                    productId: data.productId,
                    totalPrice: data.totalPrice,

                })
                let product = await db.Product.findOne({
                    where: {
                        id: data.productId
                    }
                })
                if (product) {
                    product.sold = 'sold'
                }
                console.log('pro trc', product)
                await product.save()
                console.log('pro sau============', product)

                resolve({
                    errCode: 0,
                    errMessage: 'ok create new order success'
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
let getAllProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === 'null') {
                let data = await db.Product.findAll()
                console.log('id============', id)

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })
            }
            else {
                let data = await db.Product.findAll({
                    where: {
                        category: id
                    }
                })

                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })
            }

        } catch (error) {
            reject(error)
        }
    })

}
let getDetailProductId = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter product'
                })
            } else {
                let data = await db.Product.findOne({
                    where: {
                        id: inputData
                    },
                })

                // if (data) {
                //     let doctorClinic = [];
                //     doctorClinic = await db.Doctor_infor.findAll({
                //         where: { clinicId: inputData },
                //         attributes: ['doctorId']

                //     })
                //     data.doctorClinic = doctorClinic;

                // } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}

let getAllOrder = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter order'
                })
            } else {
                let data = await db.Order.findAll({
                    where: {
                        userId: +inputData
                    },
                    include: [
                        { model: db.Product, as: 'orderDataProduct', attributes: ['title', 'imageSrc', 'price'] }
                    ]
                })

                // if (data) {
                //     let doctorClinic = [];
                //     doctorClinic = await db.Doctor_infor.findAll({
                //         where: { clinicId: inputData },
                //         attributes: ['doctorId']

                //     })
                //     data.doctorClinic = doctorClinic;

                // } else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}
let handleDeleteOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.Order.findOne({
            where: { id: orderId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `the user isn't exist`
            })
        }
        // await user.destroy();
        await db.Order.destroy({
            where: { id: orderId }
        })
        resolve({
            errCode: 0,
            errMessage: `order was delete`
        })
    })
}
let handleDeleteProduct = (ProductId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.Product.findOne({
            where: { id: ProductId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: `the user isn't exist`
            })
        }
        // await user.destroy();
        await db.Product.destroy({
            where: { id: ProductId }
        })
        resolve({
            errCode: 0,
            errMessage: `product was delete`
        })
    })
}

let getAllProductByUserId = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter product by user'
                })
            } else {
                let data = await db.Product.findAll({
                    where: {
                        userId: +inputData
                    },
                    include: [
                        { model: db.User, as: 'userDataProduct', attributes: ['name', 'phoneNumber'] }
                    ]

                })
                resolve({
                    errCode: 0,
                    errMessage: 'ok',
                    data
                })
            }


        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleAddProduct: handleAddProduct,
    getAllProduct: getAllProduct,
    getDetailProductId: getDetailProductId,
    handleBuyProduct: handleBuyProduct,
    getAllOrder: getAllOrder,
    handleDeleteOrder: handleDeleteOrder,
    handleDeleteProduct: handleDeleteProduct,
    getAllProductByUserId: getAllProductByUserId

}