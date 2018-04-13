const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/buydb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('==========================')
  console.log('mongoose db open')
  console.log('===========================')
});

const models = require('./models');
const Schema = mongoose.Schema;

for(var m in models){
    mongoose.model(m,new Schema(models[m]))
}

module.exports = {
    getModel:function(type){
        return mongoose.model(type)
    }
}