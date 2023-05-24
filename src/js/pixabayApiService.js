import axios from 'axios';
export { searchParams, pixabayApiService };

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36326636-76b3e37fcbe8c7da541d5c25c';

const searchParams = {
  key: API_KEY,
  q: '',
  image_type: 'all',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

async function pixabayApiService(params) {
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
