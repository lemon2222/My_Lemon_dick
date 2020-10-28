<template>
  <div>
    <template v-for="(item, index) in children">
      <el-submenu :key="index" v-if="item.children" :index="item.name">
        <template slot="title">
          <i class="el-icon-s-marketing"></i>
          <span>{{ item.name }}</span>
        </template>
        <SubMenu :children="item.children" />
      </el-submenu>
      <el-menu-item :key="index" v-else :index="item.path">
        {{ item.name }}
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  props: { children: Array },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(this.children);
  },
};
</script>
