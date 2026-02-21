interface CanonicalURLProps {
  path: string;
}

export function CanonicalURL({ path }: CanonicalURLProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL!;
  const canonicalUrl = `${baseUrl}${path}`;

  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}
