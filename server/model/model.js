const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    post: {
        type:String,
        required:[true, "Please enter a Post"]
    }
}
)

const Userdb = mongoose.model('userdb', schema)

module.exports = Userdb