import AccountOverview from '@/components/AccountOverview'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='mb-12 mt-8 sm:mt-12 flex flex-col items-center justify-center text-center'>

        <AccountOverview />
        
      </MaxWidthWrapper>
    </>
  )
}
