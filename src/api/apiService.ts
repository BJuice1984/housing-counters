import axios from 'axios';

export const fetchMeters = async (limit: number, offset: number) => {
  const response = await axios.get(
    `http://showroom.eis24.me/api/v4/test/meters/`,
    {
      params: { limit, offset },
    }
  );
  return response.data;
};
