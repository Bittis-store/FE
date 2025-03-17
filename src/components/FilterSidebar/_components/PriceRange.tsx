import { Form, Slider } from 'antd';
import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { MAX_PRICE, MIN_PRICE } from '~/constants/products';
import useFilter from '~/hooks/common/useFilter';
import { Currency } from '~/utils/FormatCurreny';

const PriceRange = () => {
    const { query, updateQueryParam } = useFilter();
    const [form] = Form.useForm();

    const onChangePrice = (value: number[]) => {
        const [min, max] = value;
        updateQueryParam({
            ...query,
            ['price[gte]']: min,
            ['price[lte]']: max,
            page: 1,
        });
    };
    const debounceFn = useCallback(_.debounce(onChangePrice, 700), [query]);

    const resetForm = () => {
        form.resetFields();
    };

    useEffect(() => {
        if (!query['price[gte]'] && !query['price[lte]']) {
            resetForm();
        }
    }, [query]);
    return (
        <div className='min-h-32 w-full bg-white px-2 pl-2'>
            <div className='mt-4 flex justify-between'>
                <span className='cursor-default text-sm font-medium'>{Currency(query['price[gte]'] || MIN_PRICE)}</span>
                <span className='cursor-default text-sm font-medium'>{Currency(query['price[lte]'] || MAX_PRICE)}</span>
            </div>
            <Form form={form}>
                <Form.Item
                    name='slider'
                    initialValue={[query['price[gte]'] || MIN_PRICE, query['price[lte]'] || MAX_PRICE]}
                >
                    <Slider
                        className='slider-custom mb-4 pb-6'
                        range
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        onChange={debounceFn}
                        tooltip={{
                            formatter(value) {
                                return Currency(Number(value));
                            },
                        }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default PriceRange;
