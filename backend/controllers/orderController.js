import orderModel from "../models/orderModel.js";
import usermodel from "../models/usermodel.js";  // Correcting the case of userModel import
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // Clear user's cart data after placing the order
        await usermodel.findByIdAndUpdate(req.body.userId, { cartdata: {} });

        // Create line items for the Stripe checkout session based on order items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name     // Product name from each item
                },
                unit_amount: item.price * 100     // Unit amount in cents (paisa)
            },
            quantity: item.quantity     // Quantity of each item
        }));

        // Add a delivery charge as a line item (example: ₹20 delivery charge)
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 20 * 100   // ₹20 in cents (paisa)
            },
            quantity: 1 // Quantity of the delivery charge item
        });

        // Create a new checkout session with Stripe
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        // Respond with the success and the URL for the Stripe checkout session
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const UserOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const listOrders = async (req, res) => {
    try {
        const order = await orderModel.find({})
        res.json({ success: true, data: order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "ERROR" })
    }
}
//update food status on frontend

const UpdateStatus =async (req,res) =>{
try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}
export { placeOrder, verifyOrder, UserOrders, listOrders ,UpdateStatus};

