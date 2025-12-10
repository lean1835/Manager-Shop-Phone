export const getUriSearchParam = (search) => {
    const searchParams = new URLSearchParams(search);
    return Object.fromEntries(searchParams);
}

export const formarCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
}