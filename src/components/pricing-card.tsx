import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  description: string
  price: string
  popular?: boolean
  features: string[]
  buttonText: string
  buttonVariant?: "default" | "outline"
  className?: string
}

export function PricingCard({
  title,
  description,
  price,
  popular,
  features,
  buttonText,
  buttonVariant = "default",
  className,
}: PricingCardProps) {
  return (
    <div className={cn(
      "rounded-xl border-2 border-gray-200 bg-white p-8",
      popular && "border-green-500",
      className
    )}>
      <div className="flex flex-col gap-5">
        <div>
          {popular && (
            <span className="inline-block rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              Most Popular
            </span>
          )}
          <h3 className="mt-4 text-2xl font-semibold uppercase">{title}</h3>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-gray-500">From</span>
          <span className="text-4xl font-mono font-normal">{price}</span>
          <span className="text-sm text-gray-500">/ month</span>
        </div>

        <Button 
          variant={buttonVariant}
          className="w-full"
        >
          {buttonText}
        </Button>

        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500">Everything in the Free Plan, plus:</p>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6.666 10l2.5 2.5 4.167-4.167"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 