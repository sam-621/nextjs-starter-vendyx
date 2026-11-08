'use client';

import { useEffect } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from '@/shared/components/ui/empty';

type Props = {
  error: unknown;
  retry: () => void;
};

export default function Error({ error, retry }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Algo salió mal</EmptyTitle>
          <EmptyDescription>No pudimos cargar esta página. Intenta de nuevo.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={retry}>Intentar de nuevo</Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
