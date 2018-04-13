const router = require('koa-better-router')().loadMethods();
const body = require('koa-better-body');
const Image = require('../mongoose/models/image');
const Spec = require('../mongoose/models/spec');
const Product = require('../mongoose/models/product');
const path = require('path');

router.post('/product/add',body({ 
    encoding: 'utf-8',
    uploadDir: path.join(__dirname,'..', 'uploads/images'),
    keepExtensions: true
  }),function * (){
      const fields = this.request.fields;
      const imgPath = this.request.files[0].path || '';
    
      let imgId = '', productId = '';
      imgId = productId = new Date().getTime();
      yield Image.create(imgId,imgPath);

      const specIdArr = [];
      const specs = JSON.parse(fields.spec);
      for(const key in specs){
        let specId = new Date().getTime();
        specIdArr.push(specId);
        yield Spec.create({id: specId, productId,...specs[key]}); 
      }
      const product = JSON.parse(fields.product);
      product.specId = specIdArr;
      product.imageId = imgId;
      product.id = productId;
      yield Product.create(product).then((res) => {
        this.body = {
            code: res ? 200 : 500,
            message: res ? '添加成功' :'添加失败'
        }
      })

})

router.post('/product/update',body({ 
    encoding: 'utf-8',
    uploadDir: path.join(__dirname,'..', 'uploads/images'),
    keepExtensions: true
  }),function * (){

      const fields = this.request.fields;
      const imgPath = this.request.files.length !== 0 && this.request.files[0].path;
      if(imgPath && fields.imageId){
        yield Image.findOneAndUpdate(fields.imageId, imgPath);
      }

      const specIdArr = [];
      const specs = fields.spec ? JSON.parse(fields.spec) : [];
      for(const key in specs){
        if(specs[key].id){
            specIdArr.push(specs[key].id);
            yield Spec.findOneAndUpdate(specs[key]);
        }else{
            let specId = new Date().getTime();
            specIdArr.push(specId);
            yield Spec.create({id: specId,...specs[key]});
        }
    }

      const product = JSON.parse(fields.product);
      product.specId = specIdArr;
      console.log(product)
      yield Product.findOneAndUpdate(product).then((res) => {
        this.body = {
            code: res ? 200 : 500,
            message: res ? '编辑成功' :'编辑失败'
        }
      })
})

router.post('/product/list', body(),function * (){
    const fields = this.request.fields;
    console.log(this.request)
    yield Product.findByPage(Number(fields.pageNo),Number(fields.pageSize)).then((res) => {
        this.body = {
            code: res ? 200 : 500,
            message: res ? '查询成功' :'查询失败',
            content: res || []
        }
    });
    
})

router.post('/product/del', body(), function * () {
    yield Product.findOneAndRemove(this.request.fields.id).then((res) =>{
        this.body = {
            code: res ? 200 : 500,
            message: res ? '删除成功' :'删除失败'
        }
    })
})



module.exports = router;