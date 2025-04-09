const IMPACT_METRICS = [
  { number: "65%", text: "Reduction in MTTR" },
  { number: "80%", text: "Reduction in MTTR" },
  { number: "95%", text: "Cost saved on compute & storage" },
  { number: "90%", text: "Reduce on-call time" },
  { number: "<2s", text: "Time to detect exact root cause" },
  { number: "65%", text: "Increase in Query Performance" },
]

function ImpactCard({ number, text }: { number: string; text: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#D6D3D1] bg-white p-6 transition-all hover:border-[var(--color-primary)]/30">
      <div className="relative z-10 flex flex-col">
        <span className="text-[106px] font-medium leading-[1.1] tracking-tight text-[var(--color-muted-foreground)]">
          {number}
        </span>
        <span className="mt-2 text-[21px] font-medium text-[var(--color-foreground)]">
          {text}
        </span>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-border)] to-[var(--color-primary)] opacity-5" />
        <svg
          className="absolute bottom-0 right-0 h-48 w-48 text-[var(--color-primary)] opacity-5"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#grid-pattern)">
            {Array.from({ length: 10 }).map((_, i) =>
              Array.from({ length: 10 }).map((_, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={i * 10 + 5}
                  cy={j * 10 + 5}
                  r="1"
                  fill="currentColor"
                />
              ))
            )}
          </g>
          <defs>
            <clipPath id="grid-pattern">
              <rect width="100" height="100" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export function ImpactSection() {
  return (
    <section className="mt-32 px-4">
      <h2 className="text-center text-[34px] font-medium leading-tight text-[var(--color-foreground)]">
        Why Teams Love INCERTO?
        <br />
        <span className="text-[var(--color-muted-foreground)]">Its All About The Impact We Do</span>
      </h2>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {IMPACT_METRICS.map((metric, index) => (
          <ImpactCard key={index} {...metric} />
        ))}
      </div>
    </section>
  )
} 