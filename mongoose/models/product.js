const Product = require('../db').getModel('product');
const Spec = require('./spec');
const Image = require('./image');

module.exports = {
    create: (product) => {
        return new Promise((resolve) => {
            Product.create({
                no: `NO${new Date().getTime()}`,
                ...product
            }, (err, doc) => {
                if (err) {
                    console.dir(err)
                }
                resolve(doc)
            })
        })
    },
    findOneAndUpdate: (product) => {
        return new Promise((resolve) => {
            Product
                .findOneAndUpdate({
                    id: product.id
                }, {
                    ...product
                }, function (err, doc) {
                    if (err) {
                        console.dir(err)
                    }
                    resolve(doc)
                })
        })
    },
    findOneAndRemove: (id) => {
        return new Promise((resolve) => {
            Product
                .findOneAndRemove({
                    id: id
                }, function (err, doc) {
                    if (err) {
                        console.dir(err)
                    } else {
                        Spec.removeAll(id);
                        Image.findOneAndRemove(id);
                    }
                    resolve(doc)
                })
        })
    },
    findOne: (id) => {
        return new Promise((resolve) => {
            Product.findOne({id}, function (err, doc) {
                    if (err) {
                        console.dir(err)
                    }
                    resolve(doc)
                })
        })
    },
    findByPage: (pageNo, pageSize) => {
        return new Promise((resolve) => {
            Product.count({}, (err, count) => {
                Product.find().skip((pageNo - 1) * pageSize).limit(pageSize).exec((err, doc) => {
                    resolve({
                       totalPage: Math.ceil(count / pageSize),
                       totalSize: count,
                       pageNo,
                       pageSize,
                       list:doc
                   })
                });
                
           })
        })
       
        
    }
}