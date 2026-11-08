import 'server-only';

export const VendyxConfig = {
  apiUrl: process.env.VENDYX_API_URL ?? 'https://api.vendyx.so',
  shopId: process.env.VENDYX_SHOP_ID ?? '',
  storefrontApiKey: process.env.VENDYX_STOREFRONT_API_KEY ?? '',
  locale: process.env.VENDYX_LOCALE
};
