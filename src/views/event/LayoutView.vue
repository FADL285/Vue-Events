<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event"></router-view>
  </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
  name: "EventLayout",
  data() {
    return {
      event: null,
    };
  },
  props: ["id"],
  async created() {
    try {
      const response = await EventService.getEvent(this.id);
      this.event = response.data;
    } catch (error) {
      console.log(error);

      await this.$router.push({
        name: "404Resource",
        params: {
          resource: "event",
        },
      });
    }
  },
};
</script>

<style scoped></style>
