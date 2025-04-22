import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '~/components/_common/wrapperList/WrapperList';
import { optionsLineChart } from './_options';
import { useMonthlyStats } from '~/hooks/stats/useMonthlyStats';

const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LineChart = () => {
    const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
    const { data: result, isLoading } = useMonthlyStats(selectedYear);

    const sortedData = useMemo(() => {
        if (!result || !Array.isArray(result.data)) return [];
        return [...result.data].sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
    }, [result]);

    const months = sortedData.map((item) => item.month);
    const totalRevenue = sortedData.map((item) => item.totalRevenue);
    const totalOrders = sortedData.map((item) => item.totalOrders);

    const showRevenue = totalRevenue.some((value) => value !== undefined && value !== null);
    const showOrders = totalOrders.some((value) => value !== undefined && value !== null);

    const series = [
        {
            name: 'Doanh thu',
            data: totalRevenue,
        },
        {
            name: 'Đơn hàng',
            data: totalOrders,
        },
    ];

    const onYearChange: DatePickerProps['onChange'] = (date: Dayjs | null) => {
        if (date) {
            const newYear = date.year();
            if (newYear <= dayjs().year()) {
                setSelectedYear(newYear);
            }
        }
    };

    const disabledDate = (current: Dayjs) => {
        return current.year() > dayjs().year();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <WrapperList
            title='Đơn hàng và doanh thu theo từng tháng'
            className='xl:col-span-12'
            option={
                <DatePicker
                    onChange={onYearChange}
                    picker='year'
                    defaultValue={dayjs().year(selectedYear)}
                    disabledDate={disabledDate}
                />
            }
            lineButtonBox
        >
            <div className='border-stroke shadow-default dark:border-strokedark dark:bg-boxdark col-span-12 rounded-sm border bg-white px-5 pt-7.5 pb-5'>
                <div>
                    <div id='LineChart' className='-ml-5'>
                        <ReactApexChart
                            options={optionsLineChart(months, showRevenue, showOrders)}
                            series={series}
                            type='line'
                            height={350}
                            width={'100%'}
                        />
                    </div>
                </div>
            </div>
        </WrapperList>
    );
};

export default LineChart;
