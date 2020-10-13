
module.exports = app => {
  const AdminUser = require('../../models/AdminUser')
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const router = express.Router()

  router.post('/', async(req,res)=> {
    const model = await req.Models.create(req.body)
    res.send(model)
  })

  router.put('/:id', async(req,res)=> {
    const model = await req.Models.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })


  router.delete('/:id', async(req,res)=> {
    const model = await req.Models.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  // 资源列表接口
  router.get('/', async(req,res)=> {
    const queryOptions = {}
    if(req.Models.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Models.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  // 登录中间件
  const authMiddleware = require('../../middleware/auth')
  const resoureceMiddleware = require('../../middleware/resource')
  // 资源详情
  router.get('/:id', async(req,res)=> {
    const model = await req.Models.findById(req.params.id)
    res.send(model)
  })


   app.use('/admin/api/rest/:resource', authMiddleware(), resoureceMiddleware(), router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads'})
  app.use('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async(req, res)=> {
    const { username, password } = req.body
    // 根据用户名找用户
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在或密码错误')

  
    // 检验密码
    const isValid =require('bcrypt').compareSync(password, user.password)
    console.log(isValid);
    assert(isValid, 422, '用户不存在或密码错误11')
   
    //返回token
    const token = jwt.sign({ id: user._id}, app.get('secret'))
    res.send({token})
  })
  // 错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}