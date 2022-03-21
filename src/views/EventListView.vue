<template>
  <h1>Incoming Events</h1>
  <div class="events">
    <template v-if="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <ThePagination :page="page" :total-pages="totalPages"></ThePagination>
    </template>
    <TheSpinner v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";
import ThePagination from "@/components/ThePagination";
import TheSpinner from "@/components/TheSpinner";

// Posts per page
const perPage = 4;

export default {
  name: "EventListView",
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  props: ["page"],
  components: {
    TheSpinner,
    ThePagination,
    EventCard,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalEvents / perPage);
    },
  },
  async beforeRouteEnter(routeTo, routeFrom, next) {
    try {
      const response = await EventService.getEvents(
        perPage,
        parseInt(routeTo.query.page) || 1
      );
      next((vm) => {
        vm.events = response.data;
        vm.totalEvents = response.headers["x-total-count"];
      });
    } catch (error) {
      next({ name: "NetworkError" });
    }
  },
  async beforeRouteUpdate(routeTo) {
    try {
      const response = await EventService.getEvents(
        perPage,
        parseInt(routeTo.query.page) || 1
      );
      this.events = response.data;
      this.totalEvents = response.headers["x-total-count"];
    } catch (error) {
      return { name: "NetworkError" };
    }
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
