import { GENERIC_ERROR } from '@/shared/constants/errors';

import type { CustomerErrorCode } from '../types';

const MESSAGES: Partial<Record<CustomerErrorCode, string>> = {
  INVALID_EMAIL: 'Ingresa un correo válido.',
  EMAIL_ALREADY_EXISTS: 'Ya existe una cuenta con ese correo.',
  INVALID_CREDENTIALS: 'El correo o la contraseña no son correctos.',
  DISABLED_CUSTOMER: 'Tu cuenta está deshabilitada.',
  CUSTOMER_NOT_FOUND: 'No encontramos una cuenta con ese correo.',
  INVALID_ACCESS_TOKEN: 'Tu sesión expiró. Inicia sesión de nuevo.',
  INVALID_PHONE_NUMBER: 'Ingresa un teléfono válido.',
  PHONE_NUMBER_ALREADY_EXISTS: 'Ya existe una cuenta con ese teléfono.'
};

export const getCustomerError = (code: CustomerErrorCode) => ({
  error: MESSAGES[code] ?? GENERIC_ERROR,
  errorCode: code
});
