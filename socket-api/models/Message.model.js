const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const messageSchema = new Schema({
    message: String,
    from: String
})

module.exports = model("Message", messageSchema);
