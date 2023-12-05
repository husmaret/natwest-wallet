export interface NatWestTransactionResponse {
    Data:  Data;
    Links: Links;
    Meta:  Meta;
}

export interface Data {
    Transaction: Transaction[];
}

export interface Transaction {
    AccountId:                      string;
    TransactionId:                  string;
    Amount:                         Amount;
    CreditDebitIndicator:           string;
    Status:                         string;
    BookingDateTime:                string;
    ValueDateTime:                  string;
    TransactionInformation:         string;
    AddressLine:                    string;
    BankTransactionCode:            BankTransactionCode;
    ProprietaryBankTransactionCode: ProprietaryBankTransactionCode;
    Balance:                        Balance;
    MerchantDetails:                MerchantDetails;
}

export interface Amount {
    Amount:   string;
    Currency: string;
}

export interface Balance {
    Amount:               Amount;
    CreditDebitIndicator: string;
    Type:                 string;
}

export interface BankTransactionCode {
    Code:    string;
    SubCode: string;
}

export interface MerchantDetails {
    MerchantName:         string;
    MerchantCategoryCode: string;
}

export interface ProprietaryBankTransactionCode {
    Code:   string;
    Issuer: string;
}

export interface Links {
    Self: string;
    Prev: string;
    Next: string;
}

export interface Meta {
    TotalPages: number;
}
