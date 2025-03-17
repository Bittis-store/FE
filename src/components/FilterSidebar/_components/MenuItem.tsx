import useGetAllColors from '~/hooks/Colors/Queries/useGetAllColors';
import useGetAllSizes from '~/hooks/Sizes/Queries/useGetAllSizes';
import { MenuProps } from 'antd';
import ColorList from './ColorList';
import PriceRange from './PriceRange';
import SizeList from './SizeList';

type MenuItem = Required<MenuProps>['items'][number];

export const FilterItem = () => {
    const { data: colorRes } = useGetAllColors();
    const { data: sizeRes } = useGetAllSizes();

    const items: MenuItem[] = [
        {
            key: 'sizes',
            label: 'Kích cỡ',
            children: [
                {
                    key: 'sizes-1',
                    type: 'group',
                    label: <SizeList sizeData={sizeRes?.data.sizes || []} />,
                },
            ],
        },
        {
            key: 'colors',
            label: 'Màu sắc',
            children: [
                {
                    key: 'colors-1',
                    type: 'group',
                    label: <ColorList colorData={colorRes?.data.colors || []} />,
                },
            ],
        },
        {
            key: 'cost',
            label: 'Khoảng giá',
            children: [
                {
                    key: 'cost-1',
                    type: 'group',
                    label: <PriceRange />,
                },
            ],
        },
    ];
    return items;
};
