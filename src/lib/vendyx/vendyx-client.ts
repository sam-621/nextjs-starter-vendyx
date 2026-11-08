import 'server-only';

import type { TypedDocumentString } from './codegen/graphql';
import { VendyxConfig } from './vendyx-config';

type Options = {
  accessToken?: string;
};

type GraphqlResponse<R> = {
  data?: R;
  errors?: { message: string }[];
};

export const vendyxFetch = async <R, V>(
  document: TypedDocumentString<R, V>,
  variables?: V,
  { accessToken }: Options = {}
): Promise<R> => {
  const response = await fetch(`${VendyxConfig.apiUrl}/storefront-api`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      x_lune_shop_id: VendyxConfig.shopId,
      x_lune_storefront_api_key: VendyxConfig.storefrontApiKey,
      ...(VendyxConfig.locale && { x_lune_storefront_locale: VendyxConfig.locale }),
      ...(accessToken && { authorization: `Bearer ${accessToken}` })
    },
    body: JSON.stringify({ query: document.toString(), variables })
  });

  if (!response.ok) {
    throw new Error(`Vendyx request failed with status ${response.status}`);
  }

  const { data, errors } = (await response.json()) as GraphqlResponse<R>;

  if (errors?.length || !data) {
    throw new Error(errors?.map(error => error.message).join('\n') ?? 'Vendyx returned no data');
  }

  return data;
};
