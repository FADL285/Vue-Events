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
  <TheSpinner v-else />
</template>

<script>
import EventService from "@/services/EventService";
import TheSpinner from "@/components/TheSpinner";

export default {
  name: "EventLayout",
  components: {
    TheSpinner,
  },

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
      if (error.response && error.response.status === 404) {
        await this.$router.push({
          name: "404Resource",
          params: {
            resource: "event",
          },
        });
      } else {
        await this.$router.push({ name: "NetworkError" });
      }
    }
  },
};
</script>

<style scoped></style>
