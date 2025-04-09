import Link from "next/link"

export function CTASection() {
  return (
    <section className="mt-32 bg-[var(--color-card)] px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-[34px] font-medium text-[var(--color-foreground)]">
          Database Problems. Try INCERTO For Free!
        </h2>
        <Link
          href="/discover"
          className="mt-8 inline-flex rounded-md bg-[var(--color-primary)] px-4 py-2 text-[13px] font-medium text-[var(--color-card)] shadow-sm ring-1 ring-[var(--color-primary)]/75 transition-colors hover:bg-[var(--color-primary)]/90"
        >
          Discover Now
        </Link>
      </div>
    </section>
  )
} 