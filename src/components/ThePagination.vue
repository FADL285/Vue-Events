<template>
  <div class="pagination">
    <router-link
      id="page-prev"
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      rel="prev"
      v-if="page > 1"
    >
      &laquo;
    </router-link>
    <router-link
      v-for="page in totalPages"
      :key="page"
      :to="{ name: 'EventList', query: { page: page } }"
      :class="{ active: currentPage(page) }"
    >
      {{ page }}
    </router-link>
    <router-link
      id="page-next"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
    >
      &raquo;
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ThePagination",
  props: ["page", "totalPages"],
  computed: {
    hasNextPage() {
      return this.page < this.totalPages;
    },
  },
  methods: {
    currentPage(page) {
      return this.page === page;
    },
  },
};
</script>

<style scoped>
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
  background-color: #42b983;
  color: white;
  border-radius: 5px;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}
</style>
