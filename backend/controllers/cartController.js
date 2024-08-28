import usermodel from "../models/usermodel.js";

//Add to cart
const addToCart = async (req, res) => {
    try {
        let UserData = await usermodel.findById(req.body.userId)
        let cartdata = await UserData.cartdata;
        // Check if the item is already in the cart
        if (!cartdata[req.body.itemId]) {
            // If not, add the item with a quantity of 1
            cartdata[req.body.itemId] = 1;
        }
        else {
            // If it is, increase the quantity by 1
            cartdata[req.body.itemId] += 1;
        }
        //  Update the user's cart in the database
        await usermodel.findByIdAndUpdate(req.body.userId, { cartdata });
        res.json({ success: true, message: "Added To Cart" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//remove from cart
const removeFromCart = async (req, res) => {
    try {
        let userdata = await usermodel.findById(req.body.userId)
        let cartdata = await userdata.cartdata;
        if(cartdata[req.body.itemId]>0){
            cartdata[req.body.itemId]-=1;
        }
        await usermodel.findByIdAndUpdate(req.body.userId, { cartdata });
        res.json({ success: true, message: "Removed From Cart" })
    } catch (error) {
         console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

//fetch from cart
const fetchFromCart = async (req, res) => {
  try {
    let userdata = await usermodel.findById(req.body.userId);
    let cartdata = await userdata.cartdata;
    res.json({success:true,cartdata})
  } catch (error) {
       console.log(error)
        res.json({ success: false, message: "Error" })
  }
}

export { addToCart, fetchFromCart, removeFromCart }