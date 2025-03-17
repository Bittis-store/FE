import ColorVariantItem from '~/components/ProductAttribute/ColorVariantItem';
import useFilter from '~/hooks/common/useFilter';
import { IColor } from '~/types/Color';
import { useCallback } from 'react';

type ColorProps = {
    colorData: IColor[];
};

const ColorList = ({ colorData }: ColorProps) => {
    const { updateQueryParam, query } = useFilter();

    const handleFilter = useCallback(
        (id: string) => {
            let queryValue = '';
            if (query['variants.color-arr']?.includes(id)) {
                queryValue = query['variants.color-arr']
                    .split(',')
                    .filter((item: string) => item !== id)
                    .join(',');
            } else {
                queryValue = query['variants.color-arr'] ? `${query['variants.color-arr']},${id}` : id;
            }
            updateQueryParam({
                ...query,
                ['variants.color-arr']: queryValue,
                page: 1,
            });
        },
        [query]
    );

    return (
        <div className='grid grid-cols-2 items-center justify-center gap-4 default:grid-cols-5 md:grid-cols-3 lg:grid-cols-4'>
            {colorData?.map((item) => <ColorVariantItem item={item} key={item._id} updateQueryParam={handleFilter} />)}
        </div>
    );
};

export default ColorList;
