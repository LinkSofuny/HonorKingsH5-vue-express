module.exports = options => {
  return async(req, res, next) => {
    // 通过inflection插件 categories 转换为 req.Models 
    const modelName = require('inflection').classify(req.params.resource)
    req.Models = require(`../models/${modelName}`)
    next()
  }
}