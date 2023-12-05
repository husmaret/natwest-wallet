'use client'

import { cn, roundTo5centsAsString } from '@/lib/utils'

interface DisplayAmountProps {
  type: string,
  amount: string | number,
  currency: string,
  displaySmall?: boolean
}

const DisplayAmount = ({type, amount, currency, displaySmall}: DisplayAmountProps) => {

  const amountToUse = type !== 'Credit' ? '-'+amount : amount
  const roundedAndFormattedAmount = roundTo5centsAsString(Number(amountToUse))
  const isNegative = Number(amountToUse) < 0

  return (
    <>
     <div className={cn('flex items-center justify-between space-x-1.5', {
        'text-xs': displaySmall
     })}>
          <p className={cn('font-bold ', {
            'text-red-500': isNegative,
            'text-gray-900': !isNegative,
            'text-xs': displaySmall
            })}> 
            {roundedAndFormattedAmount}
          </p>
          <p className={cn('text-gray-500', { 'text-xs': displaySmall })}>{currency}</p>
        </div>
    </>
  )
}

export default DisplayAmount
