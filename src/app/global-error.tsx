'use client';

import { useEffect } from 'react';

import './globals.css';

type Props = {
  error: unknown;
  retry: () => void;
};

export default function GlobalError({ error, retry }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body>
        <main className="flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center">
          <h1 className="font-semibold text-lg">Algo salió mal</h1>
          <p className="text-muted-foreground text-sm">
            No pudimos cargar la tienda. Intenta de nuevo.
          </p>
          <button
            className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground text-sm"
            onClick={retry}
            type="button"
          >
            Intentar de nuevo
          </button>
        </main>
      </body>
    </html>
  );
}
