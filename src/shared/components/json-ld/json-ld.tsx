type Props = {
  data: Record<string, unknown>;
};

export const JsonLd = ({ data }: Props) => {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
      type="application/ld+json"
    />
  );
};
