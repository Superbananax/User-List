<template>
  <h2 class="page-title">User List</h2>
  <div class="intern-list-container">
    

    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search for users..." @input="searchInterns" />
      <button @click="goToAddIntern" class="btn btn-add">+ Add User</button>
    </div>

    <div class="intern-list">
      <div class="header">
        <h3 class="name-header">Full Name</h3>
        <h3 class="actions-header">Action</h3>
      </div>

      <div v-for="(intern, index) in filteredInterns" :key="intern.id" :class="['intern-card', index % 2 === 0 ? 'even' : 'odd']">
        <img :src="intern.avatar || 'https://via.placeholder.com/50'" alt="avatar" class="intern-avatar" />
        <div class="intern-details">
          <h3>{{ intern.first_name }} {{ intern.last_name }}</h3>
        </div>
        <div class="intern-actions">
          <button @click="editIntern(intern.id)" class="btn-icon">
            <svg-icon type="mdi" :path="mdiSquareEditOutline"></svg-icon>
          </button>
          <button @click="deleteIntern(intern.id)" class="btn-icon">
            <svg-icon type="mdi" :path="mdiDelete"></svg-icon>
          </button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button @click="fetchInterns(currentPage - 1)" :disabled="currentPage === 1">«</button>
      <button v-for="page in calculatedTotalPages" :key="page" @click="fetchInterns(page)" :class="{ active: page === currentPage }">{{ page }}</button>
      <button @click="fetchInterns(currentPage + 1)" :disabled="currentPage === calculatedTotalPages">»</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useInterns } from '../composables/useInterns';
import { useRouter } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiDelete, mdiSquareEditOutline } from '@mdi/js';

const { interns, fetchInterns, removeIntern, currentPage } = useInterns();
const router = useRouter();
const searchQuery = ref('');

const itemsPerPage = 10;
const calculatedTotalPages = computed(() => Math.ceil(interns.value.length / itemsPerPage));

onMounted(() => {
  fetchInterns(currentPage.value);
});

const goToAddIntern = () => {
  router.push('/add');
};

const editIntern = (id) => {
  router.push(`/edit/${id}`);
};

const deleteIntern = async (id) => {
  await removeIntern(id);
  await fetchInterns(currentPage.value); 
};

const searchInterns = () => {
  fetchInterns(1);
};

const filteredInterns = computed(() => {
  if (!searchQuery.value) {
    return interns.value;
  }
  return interns.value.filter((intern) =>
    `${intern.first_name} ${intern.last_name}`.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
