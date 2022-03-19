<template>
  <h1>Incoming Events</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'eventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page > 1"
      >
        &#60; Previous
      </router-link>
      <router-link
        id="page-next"
        :to="{ name: 'eventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";
import { watchEffect } from "vue";

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
    EventCard,
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
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
        console.log(error);
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
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
