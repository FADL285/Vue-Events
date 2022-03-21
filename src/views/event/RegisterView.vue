<template>
  <p>Register for this event</p>
  <button @click="register">Register</button>
</template>

<script>
export default {
  name: "EventRegister",
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      //  Call API
      //  Redirect after success
      this.GStore.flashMessage =
        "You are successfully registered for " + this.event.title;

      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);

      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>

<style scoped></style>
