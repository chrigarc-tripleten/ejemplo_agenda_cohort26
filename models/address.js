const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({ 
    street: {
        type: String,
        minlength: 5,
        required: true
    },
    ext: {
        type: Number,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        minlength: 3
    },
    municipality: {
        type: String,
        required: true,
        minlength: 3
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

module.exports = mongoose.model('address', AddressSchema);