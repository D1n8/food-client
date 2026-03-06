import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export const useRecipeParams = () => {
    const [searchParams] = useSearchParams();

    return useMemo(() => {
        const query = searchParams.get('name') || '';
        const sort = searchParams.get('sort-by') || '';
        const categoriesStr = searchParams.get('categories');
        const categories = categoriesStr ? categoriesStr.split(',') : [];

        return {
            query,
            sort,
            categories,
            listKey: `${query}-${sort}-${categoriesStr}` 
        };
    }, [searchParams]);
};