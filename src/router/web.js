import express from "express";
import homeController from '../controller/homeController'
import userController from '../controller/userController'
import productController from '../controller/productController'
const router = express.Router();
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHome);
    // router.post("/api/user", function(req,res) )
    router.post('/api/user', userController.handleRegister);
    router.post('/api/user-login', userController.handleLogin);
    router.post('/api/add-product', productController.handleAddProduct);
    router.get('/api/get-all-product', productController.getAllProduct);
    router.get('/api/get-detail-product-by-id', productController.getDetailProductId);
    router.post('/api/buy-product', productController.handleBuyProduct);
    router.get('/api/get-all-order-by-id', productController.getAllOrder);
    router.get('/api/get-all-product-by-userid', productController.getAllProductByUserId);

    router.delete('/api/delete-order-by-id', productController.handleDeleteOrder);
    router.delete('/api/delete-product-by-id', productController.handleDeleteProduct);


    return app.use('/', router);
}
export default initWebRoutes;