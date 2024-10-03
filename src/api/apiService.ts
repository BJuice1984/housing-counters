import axios from 'axios';
import { IAddress } from '../types/types';

const baseUrl = 'http://showroom.eis24.me/api/v4/test/';

export const fetchMeters = async (limit: number, offset: number) => {
  const response = await axios.get(`${baseUrl}meters/`, {
    params: { limit, offset },
  });
  return response.data;
};

export const fetchAddress = async (areaIds: string[]): Promise<IAddress[]> => {
  try {
    const params = new URLSearchParams();
    areaIds.forEach((id) => params.append('id__in', id));

    const response = await axios.get(`${baseUrl}areas/`, {
      params,
    });

    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results;
    } else {
      throw new Error('Неправильный формат данных');
    }
  } catch (error) {
    console.error('Ошибка при запросе адресов', error);
    throw error;
  }
};

export const deleteMeter = async (id: string) => {
  const response = await axios.delete(`${baseUrl}meters/${id}`);
  return response.data;
};
