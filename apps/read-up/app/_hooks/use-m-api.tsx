import { useState } from 'react';

type AP<T> = {
  pageNumber: number;
  pageSize: number;
} & T;

export const useModalApi = <T, R>(apiFunction: (params: AP<T>) => Promise<R>, initialParams: T) => {
  const [data, setData] = useState<R | null>(null);
  const [params, setParams] = useState<AP<T>>({
    pageNumber: 1,
    pageSize: 20,
    ...initialParams,
  });

  const fetchData = async () => {
    const result = await apiFunction(params);
    setData(result);
  };

  const update = (newParams: Partial<AP<T>>) => {
    setParams(prevParams => ({
      ...prevParams,
      ...newParams,
      pageNumber: 1,
    }));
  };

  const reset = () => {
    setParams({
      pageNumber: 1,
      pageSize: 20,
      ...initialParams,
    });
  };

  return { data, params, update, reset };
};
