export class VendyxUnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VendyxUnauthorizedError';
  }
}
