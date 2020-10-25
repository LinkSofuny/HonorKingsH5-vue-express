<template>
  <div class="about">
    <h1>{{id ? '编辑' : '创建'}}英雄 </h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-tabs  type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">

          <el-form-item label="名称"><el-input v-model="model.name"></el-input></el-form-item>
          <el-form-item label="称号"><el-input v-model="model.title"></el-input></el-form-item>
    
    
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="res => $set(model, 'avatar', res.url)">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner', res.url)">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
    
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
               v-for="item of categories"
               :label="item.name"
               :value="item._id"
               :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度"><el-rate style="margin-top: 0.6rem;" :max="9" show-score v-model="model.scores.diffcult"></el-rate></el-form-item>
          <el-form-item label="技能"><el-rate style="margin-top: 0.6rem;" :max="9" show-score v-model="model.scores.skills"></el-rate></el-form-item>
          <el-form-item label="攻击"><el-rate style="margin-top: 0.6rem;" :max="9" show-score v-model="model.scores.attack"></el-rate></el-form-item>
          <el-form-item label="生存"><el-rate style="margin-top: 0.6rem;" :max="9" show-score v-model="model.scores.survive"></el-rate></el-form-item>
    
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
               v-for="item of items"
               :label="item.name"
               :value="item._id"
               :key="item._id"></el-option>
            </el-select>
          </el-form-item>
    
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
               v-for="item of items"
               :label="item.name"
               :value="item._id"
               :key="item._id"></el-option>
            </el-select>
          </el-form-item>
    
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
    
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
    
          <el-form-item label="团战技巧">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
          

        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-button size="mini" @click="model.skills.push({})" style="margin-bottom: 0.5rem;"> <i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex" class="el-row-addskills">
            <el-col :md="12" v-for="(item, id) in model.skills" :key="id">
              <el-card class="el-card-skills">
                <el-button
                 type="danger"
                  icon="el-icon-close"
                   circle size="mini"
                    class="el-button-skills"
                     @click="model.skills.splice(id, 1)"></el-button>
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="getAuthHeaders()"
                  :on-success= "res => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" autosize v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="冷却值">
                  <el-input type="textarea" autosize v-model="item.delay"></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input type="textarea" autosize v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type="textarea" autosize v-model="item.tips"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳搭档" name="partners">
          <el-button size="mini" @click="model.partners.push({})" style="margin-bottom: 0.5rem;"> <i class="el-icon-plus"></i> 添加英雄</el-button>
          <el-row type="flex" class="el-row-addskills">
            <el-col :md="12" v-for="(item, id) in model.partners" :key="id">
              <el-card class="el-card-skills">
                <el-button
                 type="danger"
                  icon="el-icon-close"
                   circle size="mini"
                    class="el-button-skills"
                     @click="model.partners.splice(id, 1)"></el-button>

                <el-form-item label="英雄">
                  <el-select filterable v-model="item.hero">
                    <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="描述">
                  <el-input type="textarea" autosize v-model="item.description"></el-input>
                </el-form-item>

              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>



      <el-form-item style="margin-top: 1rem;">
        <el-button type= 'primary' native-type='submit'>保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {getChildrenCategories} from '../../methods/chooseChidrenList.js'
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {
          name: '',
          avatar: '',
          skills: [],
          scores: {},
          partners: [],
        },
        categories: [],
        items: [],
        heroes: []
      }
    },
    methods: {
      async save() {
        let res = res
        if (this.id) {
          res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
        } else {
          res = await this.$http.post('rest/heroes', this.model)
        }
         this.$router.push('/heroes/list') 
         this.$message.success('保存成功')
      },
      async fetch() {
        const res = await this.$http.get(`rest/heroes/${this.id}`)
        res.data.scores ? this.model.scores = res.data.scores : this.model.scores = {}
        this.model = Object.assign({}, this.model, res.data)
        

        

      },
      async fetchCategories() {
        const res = await this.$http.get(`rest/categories`)
        getChildrenCategories(this.categories, res.data, '英雄分类')

      },
      async fetchItems() {
        const res = await this.$http.get(`rest/items`)
        this.items = res.data
      },
      async fetchHeroes() {
        const res = await this.$http.get(`rest/heroes`)
        this.heroes = res.data
      },

    },
     created() {
       this.fetchCategories()
       this.fetchItems()
       this.fetchHeroes()
       this.id && this.fetch()
    },
  
  }
</script>

<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    display: block;
  }
  .el-row-addskills {
    flex-wrap: wrap;
  }
  .el-card-skills {
    position: relative;
    margin: 0.133333rem;
  }
  .el-button-skills {
    position: absolute;
    width: 35px;
    height: 35px;
    top: -15px;
    right: -15px;
  }
  .el-button-skills >>> .el-icon-close:before {
    position: relative;
    content: "\e6db";
    top: 8px;
    right: 6px;
}
</style>