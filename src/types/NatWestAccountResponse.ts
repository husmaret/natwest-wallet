export interface NatWestAccountResponse {
    Data:  Data;
    Links: Links;
    Meta:  Meta;
}

export interface Data {
    Account: AccountElement[];
}

export interface AccountElement {
    AccountId:      string;
    Currency:       string;
    AccountType:    string;
    AccountSubType: string;
    Description:    string;
    Nickname:       string;
    Account:        AccountAccount;
    Servicer:       Servicer;
    SwitchStatus:   string;
}

export interface AccountAccount {
    SchemeName:              string;
    Identification:          string;
    SecondaryIdentification: string;
    Name:                    string;
}

export interface Servicer {
    SchemeName:     string;
    Identification: string;
}

export interface Links {
    Self: string;
    Prev: string;
    Next: string;
}

export interface Meta {
    TotalPages: number;
}
