import { ActionErrorCode } from '@/lib/vendyx/action-result';
import { CartErrorCode, CustomerErrorCode } from '@/lib/vendyx/types';

type ErrorCode = ActionErrorCode | CartErrorCode | CustomerErrorCode;

const FALLBACK_MESSAGE = 'Algo salió mal. Intenta de nuevo.';

const MESSAGES: Partial<Record<ErrorCode, string>> = {
  [ActionErrorCode.InvalidInput]: 'Revisa los datos e intenta de nuevo.',
  [ActionErrorCode.SessionExpired]: 'Tu sesión expiró. Inicia sesión de nuevo.',
  [ActionErrorCode.UnexpectedError]: FALLBACK_MESSAGE,
  [CartErrorCode.CartNotFound]: 'Tu carrito ya no existe. Agrega los productos de nuevo.',
  [CartErrorCode.CartItemNotFound]: 'Ese producto ya no está en tu carrito.',
  [CartErrorCode.VariantNotFound]: 'Este producto ya no está disponible.',
  [CartErrorCode.NotEnoughStock]: 'No hay suficiente stock para esa cantidad.',
  [CartErrorCode.DiscountCodeNotApplicable]: 'Ese código de descuento no aplica a tu carrito.',
  [CustomerErrorCode.InvalidEmail]: 'Ingresa un correo válido.',
  [CustomerErrorCode.EmailAlreadyExists]: 'Ya existe una cuenta con ese correo.',
  [CustomerErrorCode.InvalidCredentials]: 'El correo o la contraseña no son correctos.',
  [CustomerErrorCode.DisabledCustomer]: 'Tu cuenta está deshabilitada.',
  [CustomerErrorCode.CustomerNotFound]: 'No encontramos una cuenta con ese correo.',
  [CustomerErrorCode.InvalidAccessToken]: 'Tu sesión expiró. Inicia sesión de nuevo.',
  [CustomerErrorCode.InvalidPhoneNumber]: 'Ingresa un teléfono válido.',
  [CustomerErrorCode.PhoneNumberAlreadyExists]: 'Ya existe una cuenta con ese teléfono.',
  [CustomerErrorCode.InvalidOauthToken]: 'No pudimos iniciar sesión con Google. Intenta de nuevo.',
  [CustomerErrorCode.InvalidPasswordToken]:
    'El enlace para cambiar tu contraseña expiró. Pide uno nuevo.'
};

export const getErrorMessage = (errorCode: ErrorCode) => MESSAGES[errorCode] ?? FALLBACK_MESSAGE;
