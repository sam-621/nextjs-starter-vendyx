import Link from 'next/link';

import { Button } from '@/shared/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle
} from '@/shared/components/ui/empty';

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No encontramos esta página</EmptyTitle>
          <EmptyDescription>
            Puede que el enlace esté roto o que la página ya no exista.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link href="/" />}>Ir al inicio</Button>
        </EmptyContent>
      </Empty>
    </main>
  );
}
