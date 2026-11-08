import { GENERIC_ERROR } from '@/shared/constants/errors';

import type { CartErrorCode } from '../types';

const MESSAGES: Partial<Record<CartErrorCode, string>> = {
  CART_NOT_FOUND: 'Tu carrito ya no existe. Agrega los productos de nuevo.',
  CART_ITEM_NOT_FOUND: 'Ese producto ya no está en tu carrito.',
  VARIANT_NOT_FOUND: 'Este producto ya no está disponible.',
  NOT_ENOUGH_STOCK: 'No hay suficiente stock para esa cantidad.',
  DISCOUNT_CODE_NOT_APPLICABLE: 'Ese código de descuento no aplica a tu carrito.',
  INVALID_INPUT: 'Revisa los datos e intenta de nuevo.'
};

export const getCartError = (code: CartErrorCode) => ({
  error: MESSAGES[code] ?? GENERIC_ERROR,
  errorCode: code
});
