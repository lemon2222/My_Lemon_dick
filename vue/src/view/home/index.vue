<template>
  <el-container id="home">
    <el-header>
      <div class="out" @click="logingOut">
        <i class="el-icon-switch-button"></i>
        退出
      </div>
      <div class="name" @click="dialogVisible = true">
        <el-image class="headerImg" :src="user.url"></el-image>
        <span>{{ user.nickName }}</span>
      </div>
    </el-header>


    <el-container>
      <el-aside width="240px">
        <div class="accept el-icon-d-arrow-right" ></div>

        <el-menu
          :router="true"
          :default-active="active"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
        >
          <SubMenu :router="routerMenu" />
        </el-menu>
      </el-aside>
      <el-main>
        <!-- home：显示路由页面（当前页面下，也就是home的子项） -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      Copyright © 易校园有限公司
      湘ICP备15014295号-2公安机关备案号：43011102001327 友情链接：易校园
    </el-footer>
    <Dialog
      :dialogVisible="dialogVisible"
      :userId="user.id"
      v-on:close="dialogVisible = false"
    />
  </el-container>
</template>

<script>
import SubMenu from "@/components/sub_menu.vue";
import Dialog from "@/components/dialog.vue";
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")) || {},
      active: "",
      // 默认展开有children的节点
      openeds: [],
      // 有submenu，那必定会有children。
      routerMenu: JSON.parse(localStorage.getItem("router")),
      dialogVisible: false,
    };
  },
  components: {
    SubMenu: SubMenu,
    Dialog: Dialog,
  },
  // 切换同级children，监听$route的变化来修改菜单
  watch: {
    //to:即将去哪个路由，from:从哪个路由过来
    $route(to) {
      this.active = to.path;
      this.routerMenu = JSON.parse(localStorage.getItem("router"));
    },
    routerMenu() {
      this.getSubMenu(this.routerMenu);
      this.getActive(this.routerMenu[0], this.$route.path);
    },
  },
  methods: {
    logingOut() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    // 打开submenu
    getSubMenu(router) {
      router.forEach((item) => {
        if (item.children) {
          this.openeds.push(item.name);
          this.getSubMenu(item.children);
        }
      });
    },
    // 手动解决重定向
    getActive(router, redirect) {
      // 如果进来是 '/' 说明需要重定向，不是'/'则不走我们的重定向代码
      if (redirect !== "/") {
        this.active = this.$route.path;
        return;
      }
      // 根据children来决定谁是第一个，也就是重定向的目标
      if (router.children) {
        router.children.forEach((item, index) => {
          if (index === 0) {
            if (item.children) {
              this.getActive(item);
            } else {
              this.active = item.path;
              this.$router.push({ path: item.path });
            }
          }
        });
      } else {
        this.active = router.path;
      }
    },
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.$router.push({ name: "Login" });
    }

    this.getSubMenu(this.routerMenu);
    this.getActive(this.routerMenu[0], this.$route.path);
  },
};
</script>

<style lang="scss">
#home {
  height: 100%;
  width: 100%;
  background: #fcfcfc;
  position: relative;

  .el-header {
    background: linear-gradient(270deg, #17c7bb 0%, #0fbc77 100%) !important;
    line-height: 70px !important;
    height: 70px !important;
    padding: 0 31px;
    .name {
      float: right;
      margin-right: 20px;
      height: 100%;
      cursor: pointer;
      .headerImg {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: relative;
        top: 9px;
      }
      span {
        position: relative;
        top: -8px;
        font-weight: 400;
        margin-left: 20px;
        color: rgb(238, 234, 234);
      }
    }
    .out {
      float: right;
      color: #fff;
      cursor: pointer;
    }
  }
  .el-footer {
    background: #343533;
    color: #fff;
    text-align: center;
    line-height: 43px !important;
    height: 43px !important;
    font-size: 16px;
  }
  .el-aside {
    width: 205px !important;
    border-right: 1px solid #ccc;
    background: #fff;
    .el-menu-vertical-demo {
      border-right: 0px solid #fff;
    }
    .accept {
      width: 30px;
      height: 30px;
      background-color: #1dbd84;
      position: absolute;
      top: 55%;
      left: 15%;
      border-radius: 10px;
      z-index: 99;
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
