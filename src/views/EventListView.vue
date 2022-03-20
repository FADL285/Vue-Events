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
import { watchEffect } from "vue";
import ThePagination from "@/components/ThePagination";
import TheSpinner from "@/components/TheSpinner";

// Posts per page
const perPage = 2;

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
  created() {
    watchEffect(async () => {
      this.events = null;
      try {
        const response = await EventService.getEvents(perPage, this.page);
        this.events = response.data;
        this.totalEvents = response.headers["x-total-count"];
      } catch (error) {
        await this.$router.push({ name: "NetworkError" });
      }
    });
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
