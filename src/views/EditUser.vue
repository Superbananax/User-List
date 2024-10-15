
<template>
    <UserForm mode="edit" :userData="userData" />
  </template>
  
  <script setup>
  import UserForm from '../components/UserForm.vue';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useInterns } from '../composables/useInterns';
  
  const route = useRoute();
  const { fetchInternById } = useInterns();
  const userData = ref({});
  
  onMounted(async () => {
    const id = route.params.id;
    userData.value = await fetchInternById(id);
  });
  </script>
  