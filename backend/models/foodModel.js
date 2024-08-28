import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},    
    category:{type:String,required:true},
})

// Create the food model, using an existing model if it exists or creating a new one if it doesn't
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);
export default foodModel;