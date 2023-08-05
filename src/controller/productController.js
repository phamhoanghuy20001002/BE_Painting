import productService from "../service/productService"

const handleAddProduct = async (req, res) => {
    try {
        let data = await productService.handleAddProduct(req.body)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'create new product fail'
        })
    }
}
const handleBuyProduct = async (req, res) => {
    try {
        let data = await productService.handleBuyProduct(req.body)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'create new product fail'
        })
    }
}
let getAllProduct = async (req, res) => {
    try {
        let data = await productService.getAllProduct(req.query.id)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getDetailProductId = async (req, res) => {
    try {
        let infor = await productService.getDetailProductId(req.query.id)
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getAllOrder = async (req, res) => {
    try {
        let infor = await productService.getAllOrder(req.query.id)
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server order'
        })
    }
}
let handleDeleteOrder = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters! delete"
        })
    }
    let message = await productService.handleDeleteOrder(req.query.id);

    return res.status(200).json(message);

}
let handleDeleteProduct = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters! delete product"
        })
    }
    let message = await productService.handleDeleteProduct(req.query.id);

    return res.status(200).json(message);

}
let getAllProductByUserId = async (req, res) => {
    try {
        let infor = await productService.getAllProductByUserId(req.query.id)
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server product'
        })
    }
}


module.exports = { handleAddProduct, getAllProduct, getDetailProductId, handleBuyProduct, getAllOrder, handleDeleteOrder, handleDeleteProduct, getAllProductByUserId };