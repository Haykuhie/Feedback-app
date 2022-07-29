import axios from 'axios';
import humps from 'lodash-humps';
import toast from 'react-hot-toast';

export const getFeedbackStream = async (page: number = 1) => {
  const feedbackData = await axios.get(`http://localhost:8000/list-feedback`, {
    params: { page },
  });
  return humps(feedbackData.data);
};

export const postFeedback = async (fieldValues: object) => {
  try {
    await axios.post('http://localhost:8000/survey/create', fieldValues);
    toast.success('Submitted successfully!', { position: 'top-right' });
  } catch (error) {
    toast.error('Something went wrong!', { position: 'top-right' });
  }
};

export const getWaiters = async () => {
  const waiterData = await axios.get(`http://0.0.0.0:8000/survey/waiter`);
  return waiterData.data;
};
