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
        imageId: Number,
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
        addrId: Number,
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
        productId: Number,
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