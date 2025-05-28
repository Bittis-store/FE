import { useCallback } from 'react';
import TagVariantItem from '~/components/ProductAttribute/TagVariantItem';
import useFilter from '~/hooks/common/useFilter';
import { ITag } from '~/types/Tag';

type TagProps = {
    tagData: ITag[];
};

const TagList = ({ tagData }: TagProps) => {
    const { updateQueryParam, query } = useFilter();

    const handleFilter = useCallback(
        (id: string) => {
            let queryValue = '';
            if (query['tags']?.includes(id)) {
                queryValue = query['tags']
                    .split(',')
                    .filter((item: string) => item !== id)
                    .join(',');
            } else {
                queryValue = query['tags'] ? `${query['tags']},${id}` : id;
            }
            updateQueryParam({
                ...query,
                ['tags']: queryValue,
                page: 1,
            });
        },
        [query]
    );

    return (
        <div className='grid grid-cols-2 items-center justify-center gap-4 default:grid-cols-4 md:grid-cols-3'>
            {tagData?.map((item) => <TagVariantItem item={item} key={item._id} updateQueryParam={handleFilter} />)}
        </div>
    );
};

export default TagList;
