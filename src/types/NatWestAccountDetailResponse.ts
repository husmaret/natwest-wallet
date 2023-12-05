export interface NatWestAccountDetailResponse {
    Data:  Data;
    Links: Links;
    Meta:  Meta;
}

export interface Data {
    Account: DataAccount[];
}

export interface DataAccount {
    AccountId:      string;
    Currency:       string;
    AccountType:    string;
    AccountSubType: string;
    Description:    string;
    Nickname:       string;
    Account:        AccountAccount[];
}

export interface AccountAccount {
    SchemeName:     string;
    Identification: string;
    Name:           string;
}

export interface Links {
    Self: string;
}

export interface Meta {
    TotalPages: number;
}
