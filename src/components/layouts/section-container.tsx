import { Ref, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sectionContainerVariants = cva(' relative mx-auto container', {
  variants: {
    width: {
      normal: 'lg:px-16 xl:px-20',
      smallScreenFull: 'max-w-full lg:container px-0',
    },
    height: {
      normal: 'py-16 md:py-24 lg:py-24',
      narrow: 'py-6 md:py-8',
      none: '',
    },
  },
  defaultVariants: {
    width: 'normal',
    height: 'normal',
  },
})

interface Props extends VariantProps<typeof sectionContainerVariants> {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * To have tailwind classes applied correctly, use this component instead of SectionContainer
 *
 * @param width - 'normal' (default) or 'full'
 * @param height - 'normal' (default) or 'narrow'
 */
const SectionContainer = forwardRef(
  ({ children, className, id, width, height }: Props, ref: Ref<HTMLDivElement>) => (
    <section ref={ref} id={id} className={cn(sectionContainerVariants({ width, height }), className)}>
      {children}
    </section>
  )
)

SectionContainer.displayName = 'SectionContainer'

export default SectionContainer