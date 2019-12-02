import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: () => import("../views/Error.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/register",
    component: () => import("../views/RegisterForm.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/registerSuccess",
    component: () => import("../views/RegisterSuccess.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/login",
    component: () => import("../views/LoginForm.vue"),
    meta: { requireAuth: false }
  },
  {
    path: "/select",
    component: () => import("../views/SelectUserForm.vue")
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/message",
    component: () => import("../views/Message.vue")
  },
  {
    path: "/admin",
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/adminUserInfo",
    component: () => import("../views/AdminUserInfo.vue")
  },
  {
    path: "/healthmanger",
    component: () => import("../views/HealthManager.vue")
  },
  {
    path: "/editUserInfo",
    component: () => import("../views/editUserInfo.vue")
  },
  {
    path: '/editPassword',
    component: () => import('../views/editPassword.vue')
  },
  {
    path: '/editPhone',
    component: () => import('../views/editPhone.vue')
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let requireAuth = true;
  if (to.meta.requireAuth != undefined) requireAuth = to.meta.requireAuth;

  console.log(
    "router.beforeEach to:{0} from:{1} requireAuth:{2}".format(
      to.path,
      from.path,
      requireAuth
    )
  );
  if (requireAuth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem("sessionid")) {
      //判断本地是否存在access_token
      next();
    } else {
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/login") {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

export default router;
