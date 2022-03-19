<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
  name: "EventDetails",
  data() {
    return {
      event: null,
    };
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  async created() {
    try {
      const response = await EventService.getEvent(this.id);
      this.event = response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped></style>
