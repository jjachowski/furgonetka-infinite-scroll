import axios, { AxiosResponse } from 'axios';
import { Package } from '../types/package';

export type Pagination = {
  page: number;
  limit: number;
};

export const getPackages = (
  pagination: Pagination
): Promise<AxiosResponse<Package[]>> => {
  const { page, limit } = pagination;
  const params = {
    page,
    limit,
  };

  return axios.get('https://test.furgonetka.pl/example-integration/packages', {
    params,
    headers: {
      authorization: process.env.REACT_APP_API_KEY ?? '',
    },
  });
};
