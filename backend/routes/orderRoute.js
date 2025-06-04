import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)

// User Features
orderRouter.post('/userorders',authUser, userOrders)


export default orderRouter