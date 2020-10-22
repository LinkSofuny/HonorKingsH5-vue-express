module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')

  const Category = mongoose.model('Category')

  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')


  // 导入新闻数据
  router.get('/news/init', async(req,res) => {
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitle = ["看B站直播，赢华为平板/荣耀水晶/B站周边等豪礼！", "王者五周年主题曲、动画梦幻来袭！ 全英雄全皮肤活动现已开启！", "风物志大赛 | 创意周边&amp;绝美插画，承包你一年的壁纸！速来收图！", "周年庆返场皮肤票选规则优化，武陵仙君最新消息【老亚瑟的答疑时间】", "【周年庆皮肤】裴擒虎 x 李小龙！梦幻联动，同心筑梦", "10月18日【客服反馈】页面异常说明", "10月16日体验服停机更新公告", "10月16日全服不停机更新公告", "英雄调整情报丨夏洛特加强，白起削弱，马可波罗/瑶优化", "10月15日全服不停机更新公告", "裴擒虎x李小龙皮肤奇遇记【怀旧版】H5活动开启", "限定皮肤返场投票开启公告及FAQ", "周年盛典将至，票选活动即将开启，限定皮肤免费体验", "【金秋回馈 登录送好礼】活动公告", "“一”启幸运活动开启，概率得永久史诗皮肤", "2020年秋冬赛事战令全新升级，终极奖励韩信星元皮肤等你拿！", "2020年KPL秋季赛9月16日热血开赛，主场地域化全面升级", "2020年KPL秋季赛热血来袭，线下售票9月7日12:00开启！", "2020年KGL秋季赛选手大名单公布，9月13日该我上场！", "2020年KPL秋季赛大名单公布"]
    const newsList = newsTitle.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => 
        Math.random() - 0.5
      )
      return {
        categories: randomCats.slice(0, 2),
        title: title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  // 新闻列表接口
  router.get('/news/list', async (req, res) => {
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    // res.send(parent)
    const parent = await Category.findOne({
      name: '新闻分类'
    })

    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      { $lookup: {
        from: 'articles',
        localField: '_id',
        foreignField: 'categories',
        as: 'newsList'
       }
      },
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 0, 5] }
        }
      }
      
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map( cat => {
      cat.newsList.map( news =>{
        news.categoryName = cat.name === '热门' ? news.categories[1].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })

  // 导入英雄数据
  router.get('/heroes/init', async (req, res) => {
    const rawData = require('getHeroList.js')


    for (let cat of rawData) {
      if(cat.categoryName === '热门') {
        continue
      }
      // 找到当前分类在数据库中对应的数据
      const category = await Category.findOne({
        name: cat.categoryName
      })
      console.log(category);
      cat.heroes = cat.heroes.map( hero => {
        hero.categories = [category]
        return hero
      })
      // 录入英雄
      await Hero.insertMany(cat.heroes)

    }
    res.send(await Hero.find())
  })

  // 英雄列表接口
  router.get('/heroes/list', async (req, res) => {

    const parent = await Category.findOne({
      name: '英雄分类'
    })

    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      { $lookup: {
        from: 'heroes',
        localField: '_id',
        foreignField: 'categories',
        as: 'heroList'
       }
      },
      
    ])
    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean()
    })

    res.send(cats)
  })

  app.use('/web/api', router)

}