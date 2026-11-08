const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
});

export const formatPrice = (cents: number) => formatter.format(cents / 100);
