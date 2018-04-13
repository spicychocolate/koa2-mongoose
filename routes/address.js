const router = require('koa-better-router')().loadMethods();
const body = require('koa-better-body');
const Address = require('../mongoose/models/addr');
const path = require('path');

router.post('/addr/list',body(), function * () {
    yield Address.findAll().then((res) => {
        this.body = {
            code : res ? 200 : 500,
            message:　res ? '查询成功' : '查询失败',
            content:  res || []
        }
    })
})

router.post('/addr/add', body(), function * () {
    yield Address.create(this.request.fields.name).then((res) => {
        this.body = {
            code : res ? 200 : 500,
            message:　res ? '添加成功' : '添加失败'
        }
    })
})

router.post('/addr/update', body(), function *() {
    yield Address.findOneAndUpdate(JSON.parse(this.request.fields.addr)).then((res) => {
        this.body = {
            code : res ? 200 : 500,
            message:　res ? '编辑成功' : '编辑失败'
        }
    })
})

router.post('/addr/del', body(), function * (){
    yield Address.findOneAndRemove(this.request.fields.id).then((res) => {
        this.body = {
            code : res ? 200 : 500,
            message:　res ? '删除成功' : '删除失败'
        }
    })
})


module.exports = router;