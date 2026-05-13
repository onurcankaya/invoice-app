import NavigationHeader from './NavigationHeader';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <NavigationHeader />
      {children}
    </section>
  );
}
