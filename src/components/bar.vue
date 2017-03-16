<template>
  <div>
    <div class="p-t-10"></div>
    <group>
      <cell title="filter使用">
        {{msg | trim('_-')}}
      </cell>
      <cell title="filter使用">
        {{num | multiply(3)}}
      </cell>
    </group>
    <div class="p-t-10"></div>
    <group>
      <cell :title="item.name" @click.native="onClick" v-for="item in data"></cell>
    </group>
    <div class="p-t-10"></div>
    <ChildComponent>
      <p slot="article">观自在菩萨,行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。舍利子，色不异空，空不异色，色即是空，空即是色，受想行识，亦复如是。舍利子，是诸法空相，不生不灭，不垢不净，不增不减。是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界，乃至无意识界。无无明，亦无无明尽，乃至无老死，亦无老死尽。无苦集灭道，无智亦无得。以无所得故，菩提萨埵，依般若波罗蜜多故，心无罣碍，无罣碍故，无有恐怖，远离颠倒梦想，究竟涅磐。三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。故说般若波罗蜜多咒，即说咒曰：揭谛揭谛 波罗揭谛 波罗僧揭谛 菩提萨婆诃。 </p>
    </ChildComponent>
    <div class="p-t-10"></div>
  </div>
</template>
<script type="text/babel">
  import { Cell, Group } from 'vux'
  import ApisMixins from '../assets/js/apis-mixins'
  import FiltersMixins from '../assets/js/filters-mixins'
  import ChildComponent from './elements/child_component.vue'

  const _ = require('lodash')

  export default{
    components: {
      Cell,
      Group,
      ChildComponent,
    },
    data() {
      return {
        data: null,
        msg: '-_-abc-_-',
        num: 2,
      }
    },
    methods: {
      onClick() {
        this.$vux.toast.show({
          type: 'text',
          text: '被戳了一下',
        })
        console.log('1111')
      },
    },
    created() {
      console.log('11', _.isNumber(NaN))
      console.log('11', NaN + 1)
      this.comment().then((res) => {
        console.log('res', res)
        this.data = res
      })
    },
    mixins: [ApisMixins, FiltersMixins],
  }
</script>
