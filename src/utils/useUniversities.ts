import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { University } from '../types';
import { useMemo } from 'react';
import useDebounce from '../hooks/useDebounce';

const fetchUniversities = async (name: string): Promise<University[]> => {
    let url = 'http://universities.hipolabs.com/search?country=Czech+Republic';
    if (name.trim() !== '') {
        url += `&name=${encodeURIComponent(name)}`;
    }
    const { data } = await axios.get(url);
    return data;
};

export const useUniversities = (name: string) => {
    const debouncedName = useDebounce(name, 100);


    const query = useQuery({
        queryKey: ['universities', debouncedName],
        queryFn: () => fetchUniversities(debouncedName),
        enabled: true,
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    });

    return useMemo(() => ({
        isLoading: query.isLoading,
        isError: query.isError,
        data: query.data || [],
        error: query.error,
    }), [query.isLoading, query.isError, query.data, query.error]);
};
