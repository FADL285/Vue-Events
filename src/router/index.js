import { createRouter, createWebHistory } from "vue-router";
import EventListView from "../views/EventListView.vue";
import AboutView from "@/views/AboutView";
import EventDetails from "@/views/EventDetails";

const routes = [
  {
    path: "/",
    name: "eventList",
    component: EventListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "eventDetails",
    component: EventDetails,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
