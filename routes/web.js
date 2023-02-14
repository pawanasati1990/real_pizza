const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customers/cartController')
const orderController=require('../app/http/controllers/customers/orderContorllers')


const adminController=require('../app/http/controllers/admin/orderController')
const statusController=require('../app/http/controllers/admin/statusController')

//Middleware
import geust from '../app/http/middleware/geust';
import  auth from '../app/http/middleware/auth';
import  admin from '../app/http/middleware/admin';

function initRoutes(app){
    app.get('/',homeController().index);
    app.get('/cart',cartController().cart);
    app.post('/update-cart',cartController().update);
    app.post('/delete-cart',cartController().deleteItem);
    app.get('/login',geust,authController().login);
    app.post('/login',authController().postLogin);
    app.get('/register',geust,authController().register);
    app.post('/register',authController().postRegister);
    app.post('/logout',authController().logout);

    //Customer route
    app.post('/orders',auth,orderController().store);
    app.get('/customer/orders',auth,orderController().index);
    app.get('/customer/orders/:id',auth,orderController().show);

    //Admin route
    app.get('/admin/orders',admin,adminController().index);
    app.post('/admin/order/status',admin,statusController().update);

}


module.exports=initRoutes
