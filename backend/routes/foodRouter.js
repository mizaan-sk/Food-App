import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();
 
//Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads", // Folder to save the uploaded files
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`) // Naming the file with current time and original name``
    }
})  

const upload = multer({ storage: storage })

foodRouter.post("/add", upload.single('image'), addFood)//single('image') means it expects a single file upload with the field name image.
foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)
export default foodRouter;