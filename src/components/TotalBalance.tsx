'use client'

import { trpc } from '@/app/_trpc/client'
import { cn, roundTo5centsAsString } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import DisplayAmount from './DisplayAmount'

interface TotalBalanceProps {
  accountId: string,
  addToTotalBalance: (accountId: string, totalBalance: number) => void
}

const TotalBalance = ({accountId, addToTotalBalance}: TotalBalanceProps) => {

  const [amount, setAmount] = useState<string>("0.00")

  const { data: balance, isLoading } = trpc.accountTotal.useQuery({accountId}, {
    onSuccess: (data) => {
      addToTotalBalance(accountId, Number(data.Amount.Amount))
      setAmount(data.Amount.Amount)
    }
  })

  return (
    <>
      {!isLoading ? (
        <DisplayAmount type={balance!.CreditDebitIndicator} amount={amount} currency={balance!.Amount.Currency} />
      ) : (
        <Loader2 className='h-6 w-6 animate-spin text-zinc-800' />
      )}
     
    </>
  )
}

export default TotalBalance
