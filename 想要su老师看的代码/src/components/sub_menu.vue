<template>
  <div>
    <template v-for="(item, index) in router">
      <el-submenu :key="index" v-if="item.children" :index="item.name">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <SubMenu :router="item.children" />
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
  props: { router: Array },
  data() {
    return {
      xxx: 1234567,
    };
  },
  methods: {},
  mounted() {
  },
};
</script>

<style></style>
