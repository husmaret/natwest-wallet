'use client';

import { trpc } from '@/app/_trpc/client';
import {
  Banknote,
  Coins,
  Ghost,
  Loader2,
  PiggyBank,
} from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import { useState } from 'react';
import TotalBalance from './TotalBalance';
import { Card, CardContent, CardFooter, CardTitle } from './ui/card';
import DisplayAmount from './DisplayAmount';
import dayjs from 'dayjs';

const AccountOverview = () => {
    
  const [totalBalance, setTotalBalance] = useState<number>(-1);
  const totalBalances: {accountId: string, totalBalance: number}[] = [];

  const sumTotalBalances = () => {
      let sum = 0
      totalBalances.forEach((totalBalance) => {
        sum += totalBalance.totalBalance
      })
      setTotalBalance(sum)
  }
  
  const { data: accounts, isLoading } = trpc.listAccounts.useQuery();

  const addToTotalBalance = (accountId: string, totalBalancetoAdd: number) => {
    totalBalances.push({accountId: accountId, totalBalance: totalBalancetoAdd});
    sumTotalBalances()
  };

  return (
    <main className='mx-auto w-[clamp(480px,80%,720px)] md:p-10'>
      <Card>
        <CardTitle className='mt-3 text-sm text-gray-400'>Total Balance</CardTitle>
        <CardContent>
          <div className='mt-3 flex items-center justify-between'>
            <Coins className='h-8 w-8 text-zinc-800' />
            {totalBalance === -1 ? (
              <Loader2 className='h-6 w-6 animate-spin text-zinc-800' />
            ) : (
              <DisplayAmount type='Credit' amount={totalBalance} currency='GBP' />
            )}
            <div className='h-8 w-8' />
          </div>
        </CardContent>
        <CardFooter>
            <div className='m-auto mb-0 flex items-center justify-between'>
                Valuta: {dayjs().format('DD.MM.YYYY')}  
            </div>
        </CardFooter>
      </Card>

      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h3 className='mb-3 font-bold text-3xl text-gray-900'>Accounts</h3>
      </div>
      {/* display all user accounts */}
      {accounts && accounts?.length !== 0 ? (
        <>
          <ul className='mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200'>
            {accounts.map((account) => (
              <li
                key={account.AccountId}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'
              >
                <Link
                  href={`/${account.AccountId}`}
                  className='flex flex-col gap-2'
                >
                  <div className='pt-6 px-6 flex w-full space-x-6'>
                    <div className='flex-1 truncate'>
                      <div className='flex items-center justify-between space-x-3 mb-6'>
                        {account.AccountSubType === 'Savings' ? (
                          <PiggyBank className='h-8 w-8 text-zinc-800' />
                        ) : (
                          <Banknote className='h-8 w-8 text-zinc-800' />
                        )}
                        <h3 className='truncate text-lg font-medium text-zinc-400'>
                          {account.AccountType} - {account.AccountSubType}
                        </h3>
                        <TotalBalance
                          accountId={account.AccountId}
                          addToTotalBalance={addToTotalBalance}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : isLoading ? (
        <Skeleton height={100} className='my-2' count={3} />
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>Pretty empty around here</h3>
        </div>
      )}
    </main>
  );
};

export default AccountOverview;
