import axios from 'axios';

const baseUrl = 'http://showroom.eis24.me/api/v4/test/';

export const fetchMeters = async (limit: number, offset: number) => {
  const response = await axios.get(`${baseUrl}meters/`, {
    params: { limit, offset },
  });
  return response.data;
};

export const fetchAddress = async (id: string) => {
  console.log('🚀 ~ fetchAddress ~ id:', id);

  const response = await axios.get(`${baseUrl}areas/${id}`);
  return response.data;
};

export const deleteMeter = async (id: string) => {
  const response = await axios.delete(`${baseUrl}meters/${id}`);
  return response.data;
};
