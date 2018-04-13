const Address = require('../db').getModel('address');
module.exports =  {
    findOneAndUpdate : (addr) => {
        return new Promise((resolve) => {
            Address.findOneAndUpdate({id:Number(addr.id)},{name: addr.name}, (err, doc) => {
                if(err){
                   console.error(err)
                }
                resolve(doc)
            })
        })
    },
    findOneAndRemove: (id) => {
        return new Promise((resolve) => {
            Address.findOneAndRemove({id}, (err, doc) => {
                if(err){
                   console.error(err)
                }
                resolve(doc) 
            })
        })
    },
    create: (name) => {
        return new Promise((resolve) => {
            Address.create({id: new Date().getTime(), name}, (err, doc) => {
                if(err){
                    console.dir(err)
                }
                resolve(doc)
            })
        })
    },
    findAll: () => {
        return new Promise((resolve) => {
            Address.find({}, (err, doc) => {
                if(err){
                    console.dir(err)
                }
                resolve(doc)
            })
        })
    }
}