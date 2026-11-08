export const register = async () => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  await import('./lib/vendyx/vendyx-config');
  await import('./shared/utils/site-url');
};
