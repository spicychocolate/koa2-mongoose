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
                Product.find().populate("imageId").skip((pageNo - 1) * pageSize).limit(pageSize).sort('createTime').exec((err, doc) => {
                    
                    const productIdArr = doc.map((item) => {
                        return item.id
                    });
                    Spec.findAll(productIdArr).then((specs) => {
                        const list = JSON.parse(JSON.stringify(doc));
                        for(let i = 0; i < list.length; i++){
                            for(let j = 0; j < specs.length; j++){
                                if(list[i].id == specs[j].productId){
                                    list[i].specs = list[i].specs || [];
                                    list[i].specs.push(specs[j])
                                }
                            }
                        }
                        resolve({
                            totalPage: Math.ceil(count / pageSize),
                            totalSize: count,
                            pageNo,
                            pageSize,
                            list
                        })
                    })
                });
                
           })
        })
       
        
    }
}