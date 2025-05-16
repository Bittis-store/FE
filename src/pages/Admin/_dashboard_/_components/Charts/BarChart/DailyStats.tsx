import React from 'react';
import ReactApexChart from 'react-apexcharts';
import WrapperList from '~/components/_common/wrapperList/WrapperList';
import { DatePicker, DatePickerProps } from 'antd';
import { useDailyStats } from '~/hooks/stats/useDailyStats';
import { optionsBarChart } from './_option';

const DailyStats: React.FC = () => {
    const { data: dailyStats } = useDailyStats();

    const revenue = dailyStats?.data.map((item: any) => item.totalRevenue);
    const orders = dailyStats?.data.map((item: any) => item.totalOrders);
    const time = dailyStats?.data.map((item: any) => item.date);

    const series = [
        {
            name: 'Orders',
            data: orders || [0],
        },
        {
            name: 'Revenue',
            data: revenue || [0],
        },
    ];
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {};
    return (
        <WrapperList title='Daily Statistics' option={<DatePicker onChange={onChange} picker='month' />} lineButtonBox>
            <div>
                <div id='barChart'>
                    <ReactApexChart
                        options={optionsBarChart(time)}
                        series={series}
                        type='bar'
                        height={350}
                        width={'100%'}
                    />
                </div>
            </div>
        </WrapperList>
    );
};

export default DailyStats;
