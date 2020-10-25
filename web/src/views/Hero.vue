<template>
  <div class="page-hero" v-if="model">
    <div class="topbar text-white bg-black py-2 px-3 d-flex ai-center">
      <router-link tag="div" to="/">
        <img src="../assets/logo.png" height="30">
      </router-link>
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white ml-3">攻略站</span>
      </div>
      <router-link to="/" tag="div"> 更多英雄 &gt;</router-link>
    </div>
    <div>
      <div class="top" :style="{'background-image': `url(${model.banner})`}">
        <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
          <div class="fs-sm">{{model.title}}</div>
          <h2 class="my-1 fs-xxl">{{model.name}}</h2>
          <div class="ft-sm">{{model.categories.map(v => v.name ).join("/")}}</div>
          <div class="d-flex jc-between pt-1">
            <div class="scores d-flex ai-center" v-if="model.scores">
              <span>难度</span>
              <span class="badge bg-orange-1">{{model.scores.diffcult}}</span>
              <span>技能</span>
              <span class="badge bg-blue-1">{{model.scores.skills}}</span>
              <span>攻击</span>
              <span class="badge bg-danger">{{model.scores.attack}}</span>
              <span>生存</span>
              <span class="badge bg-dark">{{model.scores.survive}}</span>
            </div>
            <router-link tag="span" class="text-grey fs-sm" to="/">
              皮肤: 2 &gt;
            </router-link>
          </div>
        </div>

      </div>
      <!-- end of top -->

      <div>
        <div class="bg-white">
          <div class="nav pb-2 pt-3 border-bottom mx-3">
            <div class="nav-item active">
              <div class="nav-link">英雄初识</div>
            </div>
            <div class="nav-item">
              <div class="nav-link">进阶攻略</div>
            </div>
          </div>
        </div>
      </div>


      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom" style="padding-top: 9px">
              <div class="d-flex jc-between">
                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                  <i class="iconfont icon-cc-menu-circle"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg flex-1 ml-2">
                  <i class="iconfont icon-cc-menu-circle"></i>
                  一图识英雄
                </router-link>
              </div>
              <!-- skills -->
              <div class="skills bg-white" style="margin-top: 2.5rem">
                <div class="d-flex jc-around">
                  <img 
                  @click="currentSkillIndex = i"
                  class="icon" 
                  :class="{active: currentSkillIndex === i}" 
                  :src="item.icon" 
                  v-for="(item, i) in model.skills" :key="item.i" width="65" height="65">
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex"  style="padding:2rem 0 1rem 0">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span class="text-grey-1 ml-5 fs-sm">
                      (冷却值: {{currentSkill.delay}}
                       消耗: {{currentSkill.cost}})
                    </span>
                  </div>
                  <p class="m-0" >{{currentSkill.description}}</p>
                </div>
              </div>
            </div>
            <div>
              <m-card plain icon="cc-menu-circle" title="出装推荐" class="hero-items">
                <div class="fs-xl">顺风出装</div>
                <div class="d-flex  jc-around text-center">
                  <div v-for="item in model.items1" :key="item.name" class="pt-3">
                    <img :src="item.icon" alt="" class="icon">
                    <div class="fs-xs">{{item.name}}</div>
                  </div>
                </div>
              <div class="border-bottom my-3"></div>
                <div class="fs-xl">逆风出装</div>
                <div class="d-flex  jc-around text-center">
                  <div v-for="item in model.items2" :key="item.name" class="pt-3">
                    <img :src="item.icon" alt="" class="icon">
                    <div class="fs-xs">{{item.name}}</div>
                  </div>
                </div>
              </m-card>
              <m-card plain icon="cc-menu-circle" title="使用技巧">
                <p class="m-0">{{model.usageTips}}</p>
              </m-card>
              <m-card plain icon="cc-menu-circle" title="对抗技巧">
                <p class="m-0">{{model.battleTips}}</p>
              </m-card>
              <m-card plain icon="cc-menu-circle" title="团战思路">
                <p class="m-0">{{model.teamTips}}</p>
              </m-card>
              <m-card plain icon="cc-menu-circle" title="英雄关系">
                <div class="fs-xl m-0">最佳搭档</div>
                <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
                    <img :src="item.hero.avatar" alt="" width="48px" height="48px">
                    <p class="m-0 ml-3 pt-1">{{item.hero.name}}: {{item.description}}</p>
                </div>
              </m-card>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>

        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data () {
    return {
      model: null,
      currentSkillIndex: 0,
    }
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex]
    },

  },
  methods: {
    async fetch() {
      const res =  await this.$http(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.page-hero {
  p {
    line-height:1.5385rem;
  }
  .top {
    height: 50vw;
    background: rgb(15, 15, 15) no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1));
    .scores {
      position: relative;
      .badge {
        margin: 0 0.25rem;
        padding-right: 0.0385rem;
        display: inline-block;
        width: 1.3rem;
        height: 1.3rem;
        line-height: 1.25rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.75rem;
        transform: scale(0.7);
        border: 1px solid rgba(255,255,255,0.3);
      }
    }
  }
  .skills {
    img.icon {
      border-radius: 50%;
      border: 3px solid map-get($map: $colors, $key: 'white');
      &.active {
      border-color: map-get($map: $colors, $key: 'primary');
    }
    }

  }
  .hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>