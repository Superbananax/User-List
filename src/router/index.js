import { createRouter, createWebHistory } from 'vue-router';
import InternList from '../components/InternList.vue';
import UserForm from '../components/UserForm.vue';

const routes = [
  { path: '/', component: InternList },
  { 
    path: '/add', 
    component: UserForm,
    props: { mode: 'add' }
  },
  { 
    path: '/edit/:id', 
    component: UserForm, 
    props: route => ({ mode: 'edit', userData: { id: route.params.id } })
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
