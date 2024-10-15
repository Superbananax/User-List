<template>
  <div class="form-container">
    <button class="btn-back" @click="goBack">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5 8a.5.5 0 0 0 .5.5h7.5a.5.5 0 0 0 0-1H5.5a.5.5 0 0 0-.5.5zm0 0 2.354 2.354a.5.5 0 1 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5 8z"/>
      </svg>
      Back
    </button>
    <h2>{{ mode === 'edit' ? 'Edit User' : 'Add User' }}</h2>
    <div class="form-content">
      
      <div class="card rectangle-card">
        <div class="form-fields">
          <div class="form-field">
            <label for="firstName">First Name</label>
            <input 
              id="firstName" 
              v-model="firstName" 
              :class="{ 'input-error': firstNameError }" 
              @input="validateFirstName" 
              placeholder="First Name" 
              required 
            />
            <p v-if="firstNameError" class="error-message">Minimum 2 characters required</p>
          </div>
          <div class="form-field">
            <label for="lastName">Last Name</label>
            <input 
              id="lastName" 
              v-model="lastName" 
              :class="{ 'input-error': lastNameError }" 
              @input="validateLastName" 
              placeholder="Last Name" 
              required 
            />
            <p v-if="lastNameError" class="error-message">Minimum 2 characters required</p>
          </div>
        </div>
        <button @click="handleSubmit" class="btn btn-primary" :disabled="hasErrors"> 
          {{ mode === 'edit' ? 'Update Details' : 'Add User' }}
        </button>
      </div>
      
      
      <div class="card square-card">
        <div class="avatar-section">
          <div class="avatar-preview">
            <img v-if="avatarUrl" :src="avatarUrl" png alt="Avatar" class="avatar-circle" />
            <img v-else src="../assets/avatar.png" alt="Avatar" class="avatar-circle" />
          </div>
          <input hidden type="file"  @change="handleFileUpload" ref="fileInput" class="file-input" />
          <button type="button" class="btn btn-photo" @click="triggerFileInput">
            <svg-icon type="mdi" :path="mdiBriefcaseUpload"></svg-icon>
            Change Photo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useInterns } from '../composables/useInterns';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBriefcaseUpload } from '@mdi/js';

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: value => ['add', 'edit'].includes(value),
  },
  userData: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter();
const { fetchInternById, addIntern, updateExistingIntern } = useInterns();

const firstName = ref(props.userData.first_name || '');
const lastName = ref(props.userData.last_name || '');
const avatarFile = ref(null);
const avatarUrl = ref(props.userData.avatar || '');

const firstNameError = ref(false);
const lastNameError = ref(false);

const validateFirstName = () => {
  firstNameError.value = firstName.value.length < 2;
};

const validateLastName = () => {
  lastNameError.value = lastName.value.length < 2;
};

const hasErrors = computed(() => firstNameError.value || lastNameError.value);

watch(() => props.userData, (newData) => {
  firstName.value = newData.first_name || '';
  lastName.value = newData.last_name || '';
  avatarUrl.value = newData.avatar || '';
}, { immediate: true });

onMounted(async () => {
  if (props.mode === 'edit' && props.userData.id) {
    const user = await fetchInternById(props.userData.id);
    firstName.value = user.data.first_name;
    lastName.value = user.data.last_name;
    avatarUrl.value = user.data.avatar;
  }
});

const handleSubmit = async () => {
  validateFirstName();
  validateLastName();
  if (hasErrors.value) return;

  const user = {
    first_name: firstName.value,
    last_name: lastName.value,
    avatar: avatarUrl.value,
  };
  
  if (props.mode === 'edit') {
    await updateExistingIntern(props.userData.id, user);
  } else {
    await addIntern(user);
  }

  router.push('/');
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  avatarFile.value = file;
  avatarUrl.value = URL.createObjectURL(file);
};

const triggerFileInput = () => {
  const fileInput = document.querySelector('.file-input');
  fileInput.click();
};

const goBack = () => {
  router.back();
};
</script>


<style scoped>

.input-error {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
