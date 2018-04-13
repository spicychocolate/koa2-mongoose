const Image = require('../db').getModel('image');
const fs = require('fs');
module.exports =  {
    findOneAndUpdate : (id, path) => {
        return new Promise((resolve) => {
            Image.findOneAndUpdate({id},{path}, (err, doc) => {
                if(err){
                   console.error(err)
                }else{
                    if(doc && fs.existsSync(doc.path)){
                        fs.unlinkSync(doc.path)
                    }
                }
                resolve(doc) 
            })
        })
    },
    findOneAndRemove: (id) => {
        return new Promise((resolve) => {
            Image.findOneAndRemove({id}, (err, doc) => {
                if(err){
                   console.error(err)
                }
                resolve(doc) 
            })
        })
    },
    create: (id,path) => {
        return new Promise((resolve) => {
            Image.create({id, path}, (err, doc) => {
                if(err){
                    console.dir(err)
                }
                resolve(doc)
            })
        })
    },
    findOne: (id) => {
        return new Promise((resolve) => {
            Image.create({id}, (err, doc) => {
                if(err){
                    console.dir(err)
                }
                resolve(doc)
            })
        })
    }
}