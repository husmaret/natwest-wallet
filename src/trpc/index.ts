import { publicProcedure, router } from './trpc';
import axios from 'axios';
import { z } from 'zod';
import { NatWestTransactionResponse } from '@/types/NatWestTransactionResponse';
import { NatWestAccountResponse } from '@/types/NatWestAccountResponse';
import { NatWestAccountDetailResponse } from '@/types/NatWestAccountDetailResponse';
import { NATWEST_BASEURL } from '@/config/natwest';

const openBankingEndpointV3_1 = '/open-banking/v3.1/aisp';

const getAccountRequestToken = async () => {
  const credentials = {
    grant_type: 'client_credentials',
    client_id: process.env.NATWEST_CLIENT_ID,
    client_secret: process.env.NATWEST_CLIENT_SECRET,
    scope: 'accounts',
  };

  // request the access token
  const accessToken = await axios.post(NATWEST_BASEURL + '/token', 
    // @ts-ignore
    new URLSearchParams(credentials),
  ).catch((error) => {
    console.log(error);
  }
  ).then(
    (response) => {
      return response?.data.access_token
    }
  );
  return accessToken
};

const getConsent = async (accountAccessToken: string) => {

  const consentId = await axios.post(NATWEST_BASEURL + '/open-banking/v3.1/aisp/account-access-consents', {
    "Data": {
      "Permissions": [
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadTransactionsCredits",
        "ReadTransactionsDebits",
        "ReadTransactionsDetail"
      ]
    },
    "Risk": {}
  },
  {
    headers: {
      'Authorization': 'Bearer ' + accountAccessToken,
    }
  }
  ).catch((error) => {
    console.log(error);
  }
  ).then(
    (response) => {
      return response?.data.Data.ConsentId
    }
  );
  return consentId
}

const approveConsent = async (consentId: string) => {

  const approveParams = {
    client_id: process.env.NATWEST_CLIENT_ID,
    response_type: 'code id_token',
    scope: 'openid accounts',
    request: consentId,
    redirect_uri: 'https://6519f0de-9da8-46a3-8604-4d776d0d69f6.example.org/redirect',
    state: 'ABC',
    authorization_mode: 'AUTO_POSTMAN',
    authorization_username: '123456789012@6519f0de-9da8-46a3-8604-4d776d0d69f6.example.org'
  }
  const redirectURI = await axios.get(NATWEST_BASEURL + '/authorize', {
    // @ts-ignore
    params: new URLSearchParams(approveParams)
  }).catch((error) => {
    console.log(error);
  }).then(
    (response) => {
      return response?.data.redirectUri
    }
  );
  const parsedHash = new URLSearchParams(
    redirectURI.substring(redirectURI.indexOf('#') + 1)
  );
  return parsedHash.get("code")
}

const getAPIAccessToken = async (authorizationCode: string) => {
  const params = {
    client_id: process.env.NATWEST_CLIENT_ID,
    client_secret: process.env.NATWEST_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code: authorizationCode,
  };

  const accessToken = await axios.post(NATWEST_BASEURL + '/token', 
    // @ts-ignore
    new URLSearchParams(params),
  ).catch((error) => {
    console.log(error);
  }).then(
    (response) => {
      return response?.data.access_token
    }
  );
  return accessToken
};



const authorizeConsent = async () => {
  const accountToken = await getAccountRequestToken();
  const consentId = await getConsent(accountToken);
  const authorizationCode = await approveConsent(consentId)
  if (authorizationCode) {
    return await getAPIAccessToken(authorizationCode)
  } 
  return undefined
}

export const appRouter = router({
  listAccounts: publicProcedure.query(async () => {
    const baseUrl = NATWEST_BASEURL;
    const token = await authorizeConsent();
    const result = await axios.get<NatWestAccountResponse>(
      baseUrl + openBankingEndpointV3_1 + '/accounts', {
        headers: {
          Authorization: 'Bearer ' + token,
        },    
      },
    ).catch((error) => {
      console.log(error);
    })
    return result?.data.Data.Account;
  }),

  accountTotal: publicProcedure
    .input(
      z.object({
        accountId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { accountId } = input;
      const baseUrl = NATWEST_BASEURL;
      const token = await authorizeConsent();
      const result = await axios.get<NatWestTransactionResponse>(
        baseUrl +
          openBankingEndpointV3_1 +
          '/accounts/' +
          accountId +
          '/transactions', {
            headers: {
              Authorization: 'Bearer ' + token,
            },    
          }
      );
      return result.data.Data.Transaction[0].Balance;
    }),

  accountDetail: publicProcedure
    .input(
      z.object({
        accountId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { accountId } = input;
      const baseUrl = NATWEST_BASEURL;
      const token = await authorizeConsent();
      const result = await axios.get<NatWestAccountDetailResponse>(
        baseUrl + openBankingEndpointV3_1 + '/accounts/' + accountId, {
          headers: {
            Authorization: 'Bearer ' + token,
          },    
        }
      );
      return result.data.Data.Account[0];
    }),

  accountTransactions: publicProcedure
    .input(
      z.object({
        accountId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { accountId } = input;
      const baseUrl = NATWEST_BASEURL;
      const token = await authorizeConsent();
      const result = await axios.get<NatWestTransactionResponse>(
        baseUrl +
          openBankingEndpointV3_1 +
          '/accounts/' +
          accountId +
          '/transactions', {
            headers: {
              Authorization: 'Bearer ' + token,
            },    
          }
      );
      return result.data.Data.Transaction;
    }),
});

export type AppRouter = typeof appRouter;
