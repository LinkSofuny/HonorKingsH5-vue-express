<template>
  <div class="page-article" v-if="model" >
    <header class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
        <div class="flex-1 fs-lg text-ellipsis pl-2 text-blue pr-3 fs-md" style="font-weight: bold;">
          {{model.title}}
        </div>
        <div class="text-grey fs-xs">2020-10-22</div>
    </header>
    <div v-html="model.body" class="px-3 body"></div>
    <div class="px-3  pt-5">
      
      <div>
        <i class="iconfont icon--superhero" style="font-size:2rem"></i>
        <strong class="text-blue ml-1 fs-lg">相关资讯</strong>
      </div>

      <div class="mt-3">
        <router-link tag="div"
        :to="`/articles/${item._id}`"
        v-for="item in model.related"
        :key="item._id"
        class=" py-3  d-flex "
        >
          <span class="text-ellipsis relatedinfo pr-3">{{item.title}}</span>
          <span class="text-grey">{{item.createdAt | date }}</span>
        </router-link>
        
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
  date(val) {
    return dayjs(val).format('MM/DD')
  }
  },
  props: {
    id: { required:true }
  }, 
  data () {
    return {
      model: null
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
      console.log(this.model.related);
    }
  },
  watch: {
    id: 'fetch'
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang="scss">
.page-article {
  .body {
    font-size: 1.2308rem;
    font-weight: 320;
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
  .relatedinfo {
    width: 100%;
  }
}


</style>