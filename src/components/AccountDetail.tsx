'use client';

import { trpc } from '@/app/_trpc/client';
import {
  Banknote,
  Ghost,
  Loader2,
  ArrowDownNarrowWide,
  ArrowUpWideNarrow,
  PiggyBank,
} from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import dayjs from 'dayjs';
import TotalBalance from './TotalBalance';
import DisplayAmount from './DisplayAmount';
import { Transaction } from '@/types/NatWestTransactionResponse';

interface AccountDetailProps {
  accountId: string;
}

const AccountDetail = ({ accountId }: AccountDetailProps) => {

  const [sort, setSort] = useState<'asc' | 'desc'>('desc'); // default sort
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])

  const { data: accountDetail, isLoading: isLoadingAccount } =
    trpc.accountDetail.useQuery({ accountId });

  const { data: transactions, isLoading: isLoadingTransactions } =
    trpc.accountTransactions.useQuery({ accountId },
      {
        onSuccess: (data) => {
          setAllTransactions(data)
        }
      });

  const sortTransactions = (a: Transaction, b: Transaction) => {
    if (sort === 'desc') {
      return new Date(b.BookingDateTime).getTime() -
      new Date(a.BookingDateTime).getTime()
    } else {
      return new Date(a.BookingDateTime).getTime() -
      new Date(b.BookingDateTime).getTime()
    }
  }

  return (
    <main className='mx-auto w-[clamp(480px,80%,720px)] md:p-10'>
      <Card>
        <CardTitle className='mt-3 text-sm text-gray-400'>
          Total Balance
        </CardTitle>
        <CardContent>
          {isLoadingAccount ? (
            <div className='mt-3 flex items-center justify-between'>
              <div />
              <Loader2 className='h-6 w-6 animate-spin' />
              <div />
            </div>
          ) : (
            <div className='mt-3 flex items-center justify-between'>
              {accountDetail?.AccountSubType === 'Savings' ? (
                <PiggyBank className='h-8 w-8 text-zinc-800' />
              ) : (
                <Banknote className='h-8 w-8 text-zinc-800' />
              )}
              <TotalBalance
                accountId={accountId}
                addToTotalBalance={(accountId, x: number) => {}}
              />
              <div className='h-8 w-8' />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className='m-auto mb-0 flex items-center justify-between'>
            Valuta: {dayjs().format('DD.MM.YYYY')}
          </div>
        </CardFooter>
      </Card>
      <div className='mt-8 flex items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-xl text-gray-900'>Transactions</h1>
        {!isLoadingTransactions && (
          sort === 'desc' ? (
            <ArrowDownNarrowWide onClick={() => setSort('asc')} className='cursor-pointer h-6 w-6 text-zinc-800'></ArrowDownNarrowWide>
            ) : (
            <ArrowUpWideNarrow onClick={() => setSort('desc')} className='cursor-pointer h-6 w-6 text-zinc-800'></ArrowUpWideNarrow>
          )
        )}
      </div>

      {/* display all account transactions */}
      {allTransactions && allTransactions?.length !== 0 ? (
        <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200'>
          {allTransactions
            .filter((transaction) => transaction.AccountId === accountId)
            .sort(sortTransactions)
            .map((transaction) => (
              <li
                key={transaction.TransactionId}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'
              >
                <div className='py-3 px-3 flex w-full items-center justify-between space-x-6'>
                  <div>
                    <div className='block left-0 text-left'>
                      <p className='truncate text-sm font-medium text-zinc-600'>
                        {dayjs(transaction.BookingDateTime).format(
                          'DD.MM.YYYY'
                        )}
                      </p>
                      <h3 className='truncate text-sm font-weight-normal text-zinc-900'>
                        {transaction.TransactionInformation}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <div className='block left-0 text-right'>
                      <DisplayAmount
                        type={transaction.CreditDebitIndicator}
                        amount={transaction.Amount.Amount}
                        currency={transaction.Amount.Currency}
                      />
                      <DisplayAmount
                        displaySmall
                        type={transaction.Balance.CreditDebitIndicator}
                        amount={transaction.Balance.Amount.Amount}
                        currency={transaction.Balance.Amount.Currency}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoadingTransactions ? (
        <Skeleton height={100} className='my-2' count={3} />
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>
            No transactions found for the selected account
          </h3>
        </div>
      )}
    </main>
  );
};

export default AccountDetail;
