interface RegionContentProps {
  content: string;
}

export function RegionContent({ content }: RegionContentProps) {
  return (
    <div 
      className="prose prose-gray max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
