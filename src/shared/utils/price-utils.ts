export const CURRENCY = 'MXN';

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: CURRENCY
});

export const formatPrice = (cents: number) => formatter.format(cents / 100);

export const toDecimalPrice = (cents: number) => (cents / 100).toFixed(2);
