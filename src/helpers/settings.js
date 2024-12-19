import axios from 'axios';

export const fetchSettings = async () => {
  try {
    const response = await axios.get('https://intellisoftnepal.com.np/ain/public/api/setting/1');
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};
