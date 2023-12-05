import { notFound, redirect } from 'next/navigation';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import AccountDetail from '@/components/AccountDetail';

interface PageProps {
  params: {
    accountid: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { accountid } = params;

  if (!accountid) {
    notFound()
  }

  return (
    <MaxWidthWrapper className='mb-12 mt-8 sm:mt-12 flex flex-col items-center justify-center text-center'>
      <AccountDetail accountId={accountid} />
    </MaxWidthWrapper>
  )
}

export default Page;
