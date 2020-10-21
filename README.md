# node-vue-moba

仿王者荣耀官方网站


## 管理后台

### 基于Element UI 后台管理基础界面搭建

#### 后台基本功能开发

#### 通用CRUD接口

具体代码:

[https://juejin.im/post/6881871023180873742]()

##### 一.分类管理

​	由于定义了通用接口,所以分类的CRUD非常的容易做,值得注意的是对于存在子分类的分类操作.

###### 1) 流程

![1](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/1.png)



![2](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/2.png)



![3](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/3.png)

​		![4](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/4.png)

###### 2) 模板定义:

```nodjs
const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

```

###### 3) 原理: 

​	创建分类时,上级分类会渲染出此前我们添加的分类**,由于在mongoDB中,数据并非树状,而是扁平的,所以在上级分类中渲染出来的数据,是不会有级别之分的**

​	定义模板时,加入一个parent对象,即该分类的父级,通过ref到Category中去查找ObjectID(父类:爸爸),相当于给儿子添加了一个parent对象.

![5](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/5.png)

##### 二.  物品管理

###### 	1) 简单的CURD

###### 	2) 图片上传

##### 三.  英雄管理

###### 	1) 英雄创建

![Snipaste_2020-10-15_15-22-14](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/Snipaste_2020-10-15_15-22-14.png)

![Snipaste_2020-10-15_15-22-23](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/Snipaste_2020-10-15_15-22-23.png)

###### 2) 英雄技能创建

​	![Snipaste_2020-10-15_15-23-08](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/Snipaste_2020-10-15_15-23-08.png)

###### 	3)  英雄列表

#####  四. 文章管理

###### 	1) 文章分类 (如新闻)

​			要先创建一个上级分类文章.,由于我这里加了一个父类筛选,所以在文章这个页面显示的是在文章下的子分类(广告分类同理)

###### 	2) 富文本编辑

​		自定义图片上传模式,优化请求效率,传索引地址,而非文件本身

```vue
<vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body" />
```

```
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await this.$http.post('upload', formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
      },
  
```

![Snipaste_2020-10-15_15-28-54](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/Snipaste_2020-10-15_15-28-54.png)

###### 	

​		

###### 2)  广告

​	广告的CRUD

##### 五.  管理员用户管理

###### 	1)  管理员用户的CRUD

###### 	2)  对密码的加密处理

​		通过bcrypt加密密码

```
const schema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false,
    set(val) {
    return require('bcrypt').hashSync(val, 10)
  } }
  
})

```

##### 六.  登录的校验

###### 	1.)  输入检验

​		输入为空提示

​		输入错误提示

###### 	

##### 七.  安全性优化

###### 	1)  用户登录成功后赋予token

###### 	2)  vue路由守卫

###### 	3)  设置Authorization(Header)

​		获取数据库时的权限判断,存在token则为所有的http请求绑定一个Header

```
// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){
    config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })
```

​	4) 为所有的图片上传绑定Headers

​	![Snipaste_2020-10-15_15-50-34](https://raw.githubusercontent.com/LinkSofuny/node-vue-moba/main/README-Picture/Snipaste_2020-10-15_15-50-34.png)

​	入口文件定义getAuthHeaders

```
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
```

###### 4)  登录校验中间件

​	通过中间件判单用户是否登录,在允许发送请求

```node
    // 登录校验中间件
      return async(req, res, next) => {
      const token = String(req.headers.authorization || '').split(' ').pop()
      assert(token, 401 , '请先登录')
      const { id } = jwt.verify(token, req.app.get('secret'))
      assert(id, 401 , '请先登录')
      req.user = await AdminUser.findById(id)
      assert(req.user, 401, '请先登录') 
    
      await next()
    } 
```

```vue
   app.use('/admin/api/rest/:resource',authMiddleware(),resoureceMiddleware(), router)

```

​	<!--resoureceMiddleware() 此中间件用于判断当前请求页面对应的数据库模板去查找相应页面的数据-->

## web移动端