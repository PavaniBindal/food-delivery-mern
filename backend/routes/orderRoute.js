import express from "express"
import { placeOrder , userOrder , allOrders , updateStatus} from "../controllers/orderController.js"
import auth from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/userOrders" , auth, userOrder);
orderRouter.get("/allOrders" , allOrders);
orderRouter.post('/status', updateStatus);

export default orderRouter;