import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { VendyxImage } from './vendyx-image';

const SOURCE = 'https://cdn.vendyx.so/vendyx-prod/images/shirt';

describe('VendyxImage', () => {
  test('renders the image at the width of its size', () => {
    render(<VendyxImage alt="Shirt" size="medium" src={SOURCE} />);

    expect(screen.getByRole('img', { name: 'Shirt' })).toHaveAttribute('src', `${SOURCE}?w=640`);
  });

  test('renders a double width version for high density screens', () => {
    render(<VendyxImage alt="Shirt" size="small" src={SOURCE} />);

    expect(screen.getByRole('img', { name: 'Shirt' })).toHaveAttribute(
      'srcset',
      `${SOURCE}?w=320 1x, ${SOURCE}?w=640 2x`
    );
  });

  test('renders the image with the attributes it receives', () => {
    render(
      <VendyxImage alt="Shirt" height={640} loading="lazy" size="medium" src={SOURCE} width={640} />
    );

    const image = screen.getByRole('img', { name: 'Shirt' });

    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('width', '640');
  });
});
