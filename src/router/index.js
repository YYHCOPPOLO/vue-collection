import Vue from "vue";
import VueRouter from "vue-router";
import App from "../App.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
    name: "App",
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("../views/Home.vue"),
        name: "Home",
        children: [
          {
            path: "service",
            component: () => import("../views/service/Service.vue"),
            name: "Service",
          },
          {
            path: "product",
            component: () => import("../views/product/Product.vue"),
            name: "Product",
            children: [
              {
                path: "list",
                component: () => import("../views/product/ProductList.vue"),
                name: "ProductList",
              },
              {
                path: "add/0",
                component: () => import("../views/product/ProductEdit.vue"),
                name: "ProductAdd",
              },
              {
                path: "edit/:id",
                component: () => import("../views/product/ProductEdit.vue"),
                name: "ProductEdit",
              },
            ],
          },
          {
            path: "custom-form",
            component: () => import("../views/custom-form/index.vue"),
            children: [
              {
                path: "form-to-json",
                component: () => import("../views/custom-form/FormToJson.vue"),
                name: "FormToJson",
              },
              {
                path: "wysiwyg",
                component: () => import("../views/custom-form/CustomForm.vue"),
                name: "Wysiwyg",
              },
              {
                path: "form-model",
                component: () => import("../views/custom-form/FormModel.vue"),
                name: "FormModel",
              },
            ],
          },
          {
            path: "todo",
            component: () => import("../views/todo/TodoList.vue"),
            name: "TodoList",
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
