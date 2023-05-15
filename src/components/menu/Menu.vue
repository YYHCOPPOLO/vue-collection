<template>
  <!-- sidebar -->
  <!-- default-openeds 是默认展开的菜单项，以 index 为序号 -->
  <el-menu
    class="menu-container"
    :collapse="isMenuCollapse"
    :default-openeds="['1', '3']"
    :default-active="activeIndex"
  >
    <!-- 遍历生成父菜单选项 -->
    <template v-for="menu in getMenus">
      <!-- 有子菜单就用 el-submenu -->
      <el-submenu
        v-if="menu.subMenus && menu.subMenus.length"
        :index="menu.index"
        :key="menu.index"
      >
        <!-- 父菜单的 icon 和 title -->
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.text }}</span>
        </template>
        <!-- 子菜单内容 -->
        <el-menu-item-group class="el-subMenu">
          <router-link
            tag="div"
            v-for="subMenu in menu.subMenus"
            :key="subMenu.index"
            :to="{ name: subMenu.routerName }"
          >
            <el-menu-item :index="subMenu.index">
              {{ subMenu.text }}
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- 没子菜单就用 el-menu-item -->
      <router-link
        v-else
        tag="div"
        :index="menu.index"
        :key="menu.index"
        :to="{ name: menu.routerName }"
      >
        <el-menu-item>
          <i :class="menu.icon"></i>
          <span slot="title"> {{ menu.text }} </span>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  props: {
    isMenuCollapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      menusData: [
        {
          text: "服务管理", // 父菜单名字
          icon: "el-icon-setting", // 父菜单图标
          subMenus: [{ text: "服务信息", routerName: "Service" }], // 子菜单列表
        },
        {
          text: "产品管理",
          icon: "el-icon-menu",
          subMenus: [
            { text: "产品信息", routerName: "ProductList" },
            { text: "新增", routerName: "ProductAdd" },
          ],
        },
        {
          text: "日志信息",
          icon: "el-icon-message",
          routerName: "",
        },
        {
          text: "配置化表单",
          icon: "el-icon-setting",
          subMenus: [
            { text: "表单配置化设计", routerName: "FormToJson" },
            { text: "所见即所得表单", routerName: "Wysiwyg" },
            { text: "表单抽离", routerName: "FormModel" },
          ],
        },
        {
          text: "TODO",
          icon: "el-icon-notebook-1",
          routerName: "TodoList",
        },
      ],
      activeIndex: "",
    };
  },
  computed: {
    getMenus() {
      return this.menusData.map((x, i) => ({
        ...x,
        subMenus: (x.subMenus || []).map((y, j) => {
          return { ...y, index: `${i}-${j}` };
        }),
        index: `${i}`,
      }));
    },
  },
  watch: {
    $route(to) {
      let activeIndex;
      this.getMenus.forEach((x) => {
        if (x.routerName === to.name) {
          activeIndex = x.index;
        } else {
          const subMenuItem = x.subMenus.find((y) => y.routerName === to.name);
          if (subMenuItem) {
            activeIndex = subMenuItem.index;
          }
        }
      });
      // 将 activeIndex 设置为对应的菜单 index
      if (activeIndex) {
        this.activeIndex = activeIndex;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  width: 280px;
  height: 100%;
}

.el-subMenu {
  background-color: #ddd;
}
</style>
