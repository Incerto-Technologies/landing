import { ContactBtn } from "@/components/ui/contact";

export function CTASection() {
  return (
    <section className="mt-32 bg-[var(--color-card)] px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-[34px] font-medium text-[var(--color-foreground)]">
          Database Problems. Try INCERTO For Free!
        </h2>
        <ContactBtn href="/discover" />
      </div>
    </section>
  );
}
