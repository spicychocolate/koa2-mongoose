
const Schema = require('mongoose').Schema;

module.exports = {
    product: {
        id: {
            type: Number,
            unique: true
        },
        no: String,
        name: String,
        foreignName: String,
        remark: String,
        imageId: [{
            type: Schema.Types.ObjectId,
            ref: 'image'
        }],
        specId: Array,
        createTime: {
            type: Date,
            default:  Date.now
        },
        updateTime: {
            type: Date,
            default:  Date.now
        }
    },
    spec: {
        id: {
            type: Number,
            unique: true
        },
        productId: Number,
        type: String,
        addrId: [{
            type: Schema.Types.ObjectId,
            ref: 'address'
        }],
        price: String,
        createTime: {
            type: Date,
            default:  Date.now
        },
        updateTime: {
            type: Date,
            default:  Date.now
        }
    },
    address: {
        id: {
            type: Number,
            unique: true
        },
        name: String,
        createTime: {
            type: Date,
            default:  Date.now
        },
        updateTime: {
            type: Date,
            default:  Date.now
        }
    },
    image:{
        id: {
            type: Number,
            unique: true
        },
        path: String,
        createTime: {
            type: Date,
            default:  Date.now
        },
        updateTime: {
            type: Date,
            default:  Date.now
        }
    }
}