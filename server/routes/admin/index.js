module.exports = app => {
  const express = require('express')
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

  router.get('/', async(req,res)=> {
    const queryOptions = {}
    if(req.Models.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Models.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })



  router.get('/:id', async(req,res)=> {
    const model = await req.Models.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', async(req, res, next) => {
    // 通过inflection插件 categories 转换为 req.Models 
    const modelName = require('inflection').classify(req.params.resource)
    req.Models = require(`../../models/${modelName}`)
    next()
  }, router)
}