import { DownOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import { FilterItem } from './_components/MenuItem';

const FilterSidebar = () => {
    const items = FilterItem();
    return (
        <div className={`shadow-2 z-999 bg-white`}>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemActiveBg: '#fffff',
                            itemSelectedColor: '#000',
                            horizontalItemSelectedColor: '#000',
                            itemHoverBg: 'transparent',
                            colorBgContainer: 'transparent',
                            itemSelectedBg: 'transparent',
                            horizontalItemHoverBg: 'transparent',
                            subMenuItemBg: 'transparent',
                        },
                        Slider: {
                            trackBg: '#333',
                            handleColor: '#000',
                            handleActiveColor: '#333',
                            dotActiveBorderColor: '#000',
                        },
                    },
                    token: {
                        colorPrimaryBorderHover: '#000',
                    },
                }}
            >
                <Menu
                    className={`custom-menu w-full bg-white p-3 text-base font-medium text-black`}
                    mode='inline'
                    defaultOpenKeys={['cost', 'sizes','tags', 'colors']}
                    items={items}
                    expandIcon={<DownOutlined />}
                />
            </ConfigProvider>
        </div>
    );
};

export default FilterSidebar;
