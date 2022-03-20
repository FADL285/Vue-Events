<template>
  <p>Register for this event</p>
  <button @click="register">Register</button>
</template>

<script>
export default {
  name: "EventRegister",
  props: ["event"],
  methods: {
    register() {
      //  Call API
      //  Redirect after success
      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>

<style scoped></style>
