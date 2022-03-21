import { createRouter, createWebHistory } from "vue-router";
import EventListView from "../views/EventListView.vue";
import AboutView from "@/views/AboutView";
import EventLayout from "@/views/event/LayoutView";
import EventDetails from "@/views/event/DetailsView";
import EventRegister from "@/views/event/RegisterView";
import EventEdit from "@/views/event/EditView";
import NotFound from "@/views/NotFound";
import NetworkError from "@/views/NetworkError";
import NProgress from "nprogress";
import EventService from "@/services/EventService";
import GStore from "@/store";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    component: EventLayout,
    props: true,
    beforeEnter: async (to) => {
      try {
        const response = await EventService.getEvent(to.params.id);
        GStore.event = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return {
            name: "404Resource",
            params: {
              resource: "event",
            },
          };
        } else {
          return { name: "NetworkError" };
        }
      }
    },
    children: [
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    component: AboutView,
  },
  {
    path: "/about-us",
    redirect: { name: "About" },
  },
  {
    path: "/:notFound(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
  NProgress.inc(0.35);
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
