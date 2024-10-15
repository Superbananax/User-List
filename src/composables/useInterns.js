import { ref } from 'vue';
import { getInterns, getInternById, createIntern, updateIntern, deleteIntern } from '../api/interns';

export function useInterns() {
  const interns = ref([]);
  const intern = ref(null);
  const currentPage = ref(1);

  const fetchInterns = async (page = 1) => {
    try {
      const response = await getInterns(page);
      interns.value = response.data.data;
      currentPage.value = page;
    } catch (error) {
      console.error(error);
      alert('Failed to fetch interns list');
    }
  };

  const fetchInternById = async (id) => {
    try {
      const response = await getInternById(id);
      return response.data;
    } catch (error) {
      console.error(error);
      alert('Failed to fetch intern data.');
    }
  };

  const addIntern = async (data) => {
    try {
      await createIntern(data);
      alert('Intern added sucessfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add intern.');
    }
  };

  const updateExistingIntern = async (id, data) => {
    try {
      await updateIntern(id, data);
      alert('Intern updated sucessfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update intern.');
    }
  };

  const removeIntern = async (id) => {
    try {
      await deleteIntern(id);
      alert('Intern removed sucessfully.');
      fetchInterns(currentPage.value);
    } catch (error) {
      console.error(error);
      alert('Failed to remove intern');
    }
  };

  return {
    interns,
    intern,
    currentPage,
    fetchInterns,
    fetchInternById,
    addIntern,
    updateExistingIntern,
    removeIntern
  };
}
