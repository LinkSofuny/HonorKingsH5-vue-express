<template>
  <div>
    <swiper  :options="swiperOptions" >
      <swiper-slide >
        <img class="w-100" src="../assets/images/024e2cbbdcb3eb2ada65809445dc2343.jpeg" alt="">
      </swiper-slide>
      <swiper-slide >
        <img class="w-100" src="../assets/images/b8c80e1e944c98a0658a0867043c6447.jpeg" alt="">
      </swiper-slide>
      <swiper-slide >
        <img class="w-100" src="../assets/images/1152bf8bae5e8a4fabf9b34fa77c736c.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right pr-3 pb-2 " slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 fs-xs text-center text-dark-1 pt-3">
      <div class=" d-flex flex-warp">
        <div v-for="n in 10" :key=n
          class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm ">
        <i class="sprite sprite-uparrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <div class="py-2 fs-lg d-flex" v-for="(news, i) in category.newsList" :key="i">
          <span class="note-category fs-xs mr-2"
          :class="noteCatColor(`${news.categoryName}`)">{{news.categoryName}}</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </div>
      </template>
    </m-list-card>






    <m-card  icon="cc-menu-circle" title="英雄列表"></m-card>
    <m-card  icon="cc-menu-circle" title="精彩视频"></m-card>
    <m-card  icon="cc-menu-circle" title="图文攻略"></m-card>
  

  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
  <p>1</p>
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
  data () {
    return {
      swiperOptions: {
          pagination: {
            el: '.pagination-home'
          },
          autoplay: 3000,
          loop:true,
          speed: 1000,
          
      },
      newsCats: [],
    }
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data    
    },
    noteCatColor(categoryName) {
      if(categoryName === '新闻'){
         return 'note-category-news'
       } else if (categoryName === '公告') {
         return 'note-category-note'
       } else if (categoryName === '活动') {
         return 'note-category-activity'
       } else if (categoryName === '赛事') {
         return'note-category-race'
       }
    },
  },
  created () {
    this.fetchNewsCats()
  },

}
</script>

<style lang='scss'>
@import '../assets/scss/variables';

.note-category {
  border-radius: .2rem;
  padding: .05rem .1rem;
  color: map-get($colors, 'orange' );
  color: red;
  border: 0.0769rem solid map-get($colors, 'orange' );
  &.note-category-news {
    color: #1e96ab;
    border-color: #1e96ab;
  }
  &.note-category-note {
    color: #f09a37;
    border-color: #f09a37;
  }
  &.note-category-activity {
    color: #ff3636;
    border-color: #ff3636;
  }
  &.note-category-race {
    color: map-get($colors, 'orange' );
    border-color: map-get($colors, 'orange' );
  }
  
}

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($map: $colors, $key: 'white');
  }
  .swiper-pagination-bullet-active {
    background: map-get($map: $colors, $key: 'info');
  }
}
.nav-icons {
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;

    }
  }

}

// sprite 
.sprite {
  background: url(../assets/images/index.png) no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;
  &.sprite-news {
    width: 1.7692rem;
    height: 1.5385rem;
    background-position: 63.546% 15.517%;
  }
  &.sprite-story {
    width: 1.7692rem;
    height: 1.5385rem;
    background-position: 90.483% 15.614%;
  }
  &.sprite-shop {
    width: 1.4615rem;
    height: 1.6923rem;
    background-position: 36.746% 0.924%;
  }
  &.sprite-experience {
    width: 1.5385rem;
    height: 1.5385rem;
    background-position: 10.408% 15.517%;
  }
  &.sprite-new {
    width: 1.4615rem;
    height: 1.6923rem;
    background-position:89.733% 1.266%
  }
  &.sprite-inherit {
    width: 1.8462rem;
    height: 1.5385rem;
    background-position: 36.467% 15.287%;
  }
  &.sprite-king {
    width: 1.8462rem;
    height: 1.8462rem;
    background-position: 63.3% 0.927%;
  }
  &.sprite-commod {
    width: 1.8462rem;
    height: 1.5385rem;
    background-position: 0 96.207%;
  }
  &.sprite-version {
    width: 1.4615rem;
    height: 1.6923rem;
    background-position: 36.746% 0.924%;
  }
  &.sprite-enviorment {
    width: 2.6154rem;
    height: 1.4615rem;
    background: url(../assets/images/djhj.png ) no-repeat 50% 50%;
    background-size: 90%;
  }
  &.sprite-kingteam {
    width: 2.6154rem;
    height: 1.4615rem;
    background: url(../assets/images/wxwzt.png) no-repeat 50% 50%;
    background-size: 90%;

  }
  &.sprite-interaction {
    width: 2.6154rem;
    height: 1.4615rem;
    background: url(../assets/images/cyhdy.png) no-repeat 50% 50%;
    background-size: 95%;
  }  
  &.sprite-uparrow {
    background-position: 38.577% 52.076%;
    width: 0.7692rem;
    height: 0.7692rem; 
  }
}

</style>