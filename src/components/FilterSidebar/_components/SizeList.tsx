import SizeVariantItem from '~/components/ProductAttribute/SizeVariantItem';
import useFilter from '~/hooks/common/useFilter';
import { ISize } from '~/types/Size';
import { useCallback } from 'react';

type SizeProps = {
    sizeData: ISize[];
};

const SizeList = ({ sizeData }: SizeProps) => {
    const { updateQueryParam, query } = useFilter();

    const handleFilter = useCallback(
        (id: string) => {
            let queryValue = '';
            if (query['variants.size-arr']?.includes(id)) {
                queryValue = query['variants.size-arr']
                    .split(',')
                    .filter((item: string) => item !== id)
                    .join(',');
            } else {
                queryValue = query['variants.size-arr'] ? `${query['variants.size-arr']},${id}` : id;
            }
            updateQueryParam({
                ...query,
                ['variants.size-arr']: queryValue,
                page: 1,
            });
        },
        [query]
    );
    return (
        <div className='grid grid-cols-2 items-center justify-center gap-2 default:grid-cols-5 md:grid-cols-3 lg:grid-cols-4'>
            {sizeData?.map((item) => <SizeVariantItem item={item} key={item._id} updateQueryParam={handleFilter} />)}
        </div>
    );
};

export default SizeList;
