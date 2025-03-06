const currencyFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const Currency = (price: number) => {
    return currencyFormat.format(price);
};
