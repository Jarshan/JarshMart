import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders } from '../controllers/orderController.js'
//Up Need to add verifyStripe
import authUser from '../middleware/auth.js'
import { verify } from 'jsonwebtoken'


const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)

// User Features
orderRouter.post('/userorders',authUser, userOrders)

// verify payment 
// orderRouter.post('/verifyStripe',authUser,verifyStripe)


export default orderRouter