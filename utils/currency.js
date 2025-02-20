const formatter = new Intl.NumberFormat('ru-RU', {currency: 'USD', style: 'currency'})
export function currency(value) {
    return formatter.format(value)
}