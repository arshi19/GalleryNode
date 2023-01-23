const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


mongoose.connect("mongodb://127.0.0.1:27017/GalleryDatabase")
.then(() => {
    console.log("Connected to Gallery Database")
})
.catch( (err) => err);