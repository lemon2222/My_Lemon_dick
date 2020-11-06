<template>
  <el-container id="home">
    <el-header>
      <div class="left"><img src="../../assets/img/case.png" alt="" /></div>
      <div class="right">
        <el-input
          v-model="input"
          icon="el-icon-search"
          placeholder="请输入查找内容"
        ></el-input>
        <div class="name" @click="dialogVisible = true">
          <el-image class="headerImg" :src="user.url"></el-image>
        </div>
        <div class="out" @click="logingOut">
          <i class="el-icon-bell"></i>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="105px">
        <el-menu
          width="105px"
          :router="true"
          :default-active="active"
          :default-openeds="openeds"
          class="el-menu-vertical-demo"
        >
          <SubMenu :router="routerMenu" />
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

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
      input: "",
      user: JSON.parse(localStorage.getItem("user")) || {},
      active: "",
      openeds: [],
      routerMenu: JSON.parse(localStorage.getItem("router")),
      dialogVisible: false,
    };
  },
  components: {
    SubMenu: SubMenu,
    Dialog: Dialog,
  },
  watch: {
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
    getSubMenu(router) {
      router.forEach((item) => {
        if (item.children) {
          this.openeds.push(item.name);
          this.getSubMenu(item.children);
        }
      });
    },
    getActive(router, redirect) {
      if (redirect !== "/") {
        this.active = this.$route.path;
        return;
      }
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
    background: rgb(35, 78, 139) !important;
    line-height: 70px !important;
    height: 70px !important;
    padding: 0 31px;
    display: flex;

    .left {
      width: 200px;
      height: 100%;
      line-height: 70px;
      img{
        line-height: 70px;
      }
    }
    .el-input {
      width: 300px;
    }
    .el-input__inner {
      width: 300px;
      background-color: rgb(9, 45, 95);
      border-radius: 25px;
      outline: none;
      height: 40px;
    }
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
      margin-right: 40px;
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
    width: 105px !important;
    border-right: 1px solid #ccc;
    background: #fff;
    .el-menu-vertical-demo {
      width: 105px !important;
      border-right: 0px solid #fff;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
