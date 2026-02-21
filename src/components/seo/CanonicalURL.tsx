interface CanonicalURLProps {
  path: string;
}

export function CanonicalURL({ path }: CanonicalURLProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://localhost:3000');
  const canonicalUrl = `${baseUrl}${path}`;

  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}
