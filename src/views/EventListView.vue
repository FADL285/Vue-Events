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
        &laquo;
      </router-link>
      <router-link
        v-for="page in totalPages"
        :key="page"
        :to="{ name: 'eventList', query: { page: page } }"
        :class="{ active: currentPage(page) }"
      >
        {{ page }}
      </router-link>
      <router-link
        id="page-next"
        :to="{ name: 'eventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        &raquo;
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
    totalPages() {
      return Math.ceil(this.totalEvents / perPage);
    },
    hasNextPage() {
      return this.page < this.totalPages;
    },
  },
  methods: {
    currentPage(page) {
      return this.page === page;
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
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  margin: 0 2px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}
</style>
