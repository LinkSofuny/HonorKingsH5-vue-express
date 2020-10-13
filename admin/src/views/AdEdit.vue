<template>
  <div class="about">
    <h1>{{id ? '编辑' : '创建'}}广告位 </h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      
      <el-form-item label="广告">
        <el-button size="mini" @click="model.items.push({})" style="margin-bottom: 0.5rem;"> <i class="el-icon-plus"></i> 添加广告</el-button>
        <el-row type="flex" class="el-row-addskills">
          <el-col :md="24" v-for="(item, id) in model.items" :key="id">
            <el-card class="el-card-skills">
              <el-button
               type="danger"
                icon="el-icon-close"
                 circle size="mini"
                  class="el-button-skills"
                   @click="model.items.spliceURL(id, 1)"></el-button>
              <el-form-item label="跳转链接(URL)">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="图片" style="margin-top: .5rem;">
                <el-upload
                class="avatar-uploader"
                :action="uploadUrl()"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success= "res => $set(item, 'image', res.url)">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
      

      <el-form-item>
        <el-button type= 'primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {
          items: []
        },
      }
    },
    methods: {
      async save() {
        let res = res
        if (this.id) {
          res = await this.$http.put(`rest/ads/${this.id}`, this.model)
        } else {
          res = await this.$http.post('rest/ads', this.model)
        }
         this.$router.push('/ads/list') 
         this.$message.success('保存成功')
      },
      async fetch() {
        const res = await this.$http.get(`rest/ads/${this.id}`)
        this.model = Object.assign({},this.model , res.data)
      },
    },
     created() {
       this.id && this.fetch()
    },
  }
</script>

<style scoped>
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