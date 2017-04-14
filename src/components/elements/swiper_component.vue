<template>
  <div class="bg-white">
    <tab :line-width=2 v-model="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false">
      <swiper-item v-for="(item, index) in list2" :key="index">
        <div class="tab-swiper p-b-10">
          <div class="tc p-t-10 p-b-10">
            {{item}}
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script type="text/babel">
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import TableDefault from '../common/table_default.vue'

  export default{
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      TableDefault,
    },
    data() {
      return {
        list2: ['非调停机组', '调停机组', '检修机组'],
        demo2: '非调停机组',
        index: 0,
      }
    },
  }
</script>
