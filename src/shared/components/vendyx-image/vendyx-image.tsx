import type { ComponentProps } from 'react';

type Props = Omit<ComponentProps<'img'>, 'src' | 'srcSet'> & {
  src: string;
  alt: string;
  size: keyof typeof IMAGE_WIDTHS;
};

export const VendyxImage = ({ src, alt, size, ...props }: Props) => {
  const width = IMAGE_WIDTHS[size];
  const srcSet = `${getImageUrl(src, width)} 1x, ${getImageUrl(src, width * 2)} 2x`;

  return <img alt={alt} src={getImageUrl(src, width)} srcSet={srcSet} {...props} />;
};

const IMAGE_WIDTHS = {
  small: 320,
  medium: 640,
  large: 1280
};

const getImageUrl = (source: string, width: number) => {
  const url = new URL(source);
  url.searchParams.set('w', String(width));

  return url.toString();
};
