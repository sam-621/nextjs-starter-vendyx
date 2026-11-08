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
  PHONE_NUMBER_ALREADY_EXISTS: 'Ya existe una cuenta con ese teléfono.',
  INVALID_OAUTH_TOKEN: 'No pudimos iniciar sesión con Google. Intenta de nuevo.',
  INVALID_PASSWORD_TOKEN: 'El enlace para cambiar tu contraseña expiró. Pide uno nuevo.',
  PASSWORDS_DO_NOT_MATCH: 'Las contraseñas no coinciden.'
};

export const SESSION_EXPIRED_ERROR = 'Tu sesión expiró. Inicia sesión de nuevo.';

export const getCustomerError = (code: CustomerErrorCode) => ({
  error: MESSAGES[code] ?? GENERIC_ERROR,
  errorCode: code
});
