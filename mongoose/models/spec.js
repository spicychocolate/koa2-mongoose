const Spec = require('../db').getModel('spec');
module.exports =  {
    findOneAndUpdate : (spec) => {
        return new Promise((resolve) => {
            Spec.findOneAndUpdate({id:spec.id},{...spec}, (err, doc) => {
                if(err){
                   console.error(err)
                }
                resolve(doc) 
            })
        })
    },
    findOneAndRemove: (id) => {
        return new Promise((resolve) => {
            Spec.findOneAndRemove({id}, (err, doc) => {
                if(err){
                   console.error(err)
                }
                resolve(doc) 
            })
        })
    },
    create: (spec) => {
        return new Promise((resolve) => {
            Spec.create({...spec}, (err, doc) => {
                if(err){
                    console.dir(err)
                }
                resolve(doc)
            })
        })
    },
    removeAll: (productId) => {
        return new Promise((resolve) => {
            Spec.remove({productId}, (err, doc) => {
                if(err){
                    console.dir(err)
                }
                resolve(doc)
            })
        })
    },
    findAll: (productIdArr) => {
        return new Promise((resolve) => {
            Spec.find({productId:{$in:productIdArr}}).populate("addrId").exec((err, doc) => {
                if(err){
                    console.dir(err)
                }
                resolve(doc)
            })
        })
    }
}