import mongoose from "mongoose";
export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://mizaan:7208151615@cluster0.vmtq1wk.mongodb.net/food-del')
        .then(() => {
            console.log("DB Connected")
        })
}