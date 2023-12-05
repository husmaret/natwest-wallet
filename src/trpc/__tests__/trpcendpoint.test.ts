

import { appRouter } from '..'
 
it('Test listAccount endpoint',async () => {
  const caller = appRouter.createCaller({})
  const result = await caller.listAccounts()
  expect(result).toBeTruthy()
  expect(result).toBeInstanceOf(Array)
  expect(result?.length).toBeGreaterThan(0)
})

it('Test accountDetail endpoint', async () => {
  const caller = appRouter.createCaller({})
  const result = await caller.accountDetail({
    accountId: 'c615cc8c-0b12-4289-b709-2c891fe684e6'
  })
  expect(result).toBeTruthy()
  expect(result.AccountId).toBe('c615cc8c-0b12-4289-b709-2c891fe684e6')
})

it('Test accountTransactions endpoint', async () => {
  const caller = appRouter.createCaller({})
  const result = await caller.accountTransactions({
    accountId: 'c615cc8c-0b12-4289-b709-2c891fe684e6'
  })
  expect(result).toBeTruthy()
  expect(result).toBeInstanceOf(Array)
  expect(result.length).toBeGreaterThan(0)
})