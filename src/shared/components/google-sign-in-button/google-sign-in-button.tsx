'use client';

import './google-identity';

import { useRef, useState, useTransition } from 'react';
import Script from 'next/script';

import { signInWithGoogle } from '@/lib/customer/actions/sign-in-with-google';
import { getErrorMessage } from '@/shared/utils/error-message-utils';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

type Props = {
  onSuccess?: () => void;
};

export const GoogleSignInButton = ({ onSuccess }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCredential = (credential: string) => {
    startTransition(async () => {
      const result = await signInWithGoogle(credential);

      if (!result.isSuccess) {
        setError(getErrorMessage(result.errorCode));
        return;
      }

      setError(null);
      onSuccess?.();
    });
  };

  const renderButton = () => {
    if (!window.google || !containerRef.current || !GOOGLE_CLIENT_ID) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: ({ credential }) => handleCredential(credential)
    });
    window.google.accounts.id.renderButton(containerRef.current, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with'
    });
  };

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" onReady={renderButton} />
      <div ref={containerRef} aria-busy={isPending} />
      {error && <p role="alert">{error}</p>}
    </>
  );
};
