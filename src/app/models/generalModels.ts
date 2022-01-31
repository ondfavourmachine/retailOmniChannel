export interface GenericGetHttpBackEndResponseFormat{
    data: Array<any>,
    firstPage: string
    lastPage: string
    message: string
    nextPage: string
    pageNumber: number
    pageSize: number
    previousPage: number
    succeeded: boolean
    totalPages: number
    totalRecords: number
}

export type InformationForRetailDateRange = {
    labelText?: string,
    buttonText?: string,
    buttonWidth?: string,
    labelTextColor?: string,
    fontFamily?: string,
    fontWeight?: string,
    sortingIcon?: boolean,
    extraButtonClasses: Array<string>
}
export type BankOperation = 'mobile app transactions' | "ussdpay" | "mobile" | "ibank" | 'airtime transactions' | 'bills transactions' | 'mobile accounts' | 'nip transactions'
export interface TransactionToLoad{
    transactions: BankOperation,
    totalMoney: any,
    data?: BillsTransaction | AirtimeTransactions | MobileRIBUSSDTransactions | NipTransaction
}

export interface searchCompRequiredInfo{
    parentComp: 'dashboard' | 'users' | 'transactions',
    searchEvent: Event | PointerEvent | KeyboardEvent;
    date?: string[]
    // parentDivSelector: string
}

export type AccountStatus = "Profile Locked" | "Account Active";

let reg: AccountStatus = 'Profile Locked';

export interface User{
    firstname: string
    middlename: string
    phoneNo: null | string
    primaryAccount: null | string
    status:  AccountStatus
    surname: string
    reason: null | string
    username: null | string,
    showActions?: boolean
    accountbal: number
    accountnumber: string
    changepassword: number
    channelcreated: string
    createdon: string
    customerid: string
    errorcount: number
    phoneno: string 
}



export interface SuccessfulGetAllUsers extends GenericGetHttpBackEndResponseFormat{
    data: Array<User>,
    error: any,
}

export interface ACustomer{
    changE_PASSWORD: null | string
    channeL_CREATED: string
    createD_ON: string
    customerid: string
    email: string
    erroR_COUNT: null | string
    firstname: string
    hasBiz: number
    id: number
    interneT_BANKING: null | string
    mobilE_BANKING: number
    primarY_ACCOUNT: string
    pword: string
    socialmedia: null |string
    status: number
    transactioN_PIN: string
    username: null | string
    ussd: number
}

export interface FullCustomerDetails{
    currentStatus: AccountStatus
    device: any[],
    userInfo: ACustomer
    reg: null | RegisterCustomerDetails,
    userLogs: []
}

export interface RegisterCustomerDetails{
accounT_OPENED: boolean
accountnumbeR_VALID: boolean
accountnumber: string
answeR1: null | string
answeR2: null | string
bvN_MOBILE: null | string
bvN_VALID: boolean
bvn: string
channel: number
createD_ON: string
customerid: string
datE_BIRTH: string
email: null | string
firstname: string
gender: string
id: number
idcarD_URL: null | string
lastname: string
middlename: null | string
omnI_PROFILED: null | string
onmobile: boolean
onussd: boolean
passporT_URL: null | string
phonE_VALID: boolean
phone: string
phonecode: string
questioN1: null | string
questioN2: null | string
referraL_CODE: null | string
referreD_BY: null | string
registeR_COMPLETE: null | string
residentiaL_ADDRESS: string
sessioN_CREATED: string
session: null | string
signaturE_URL: null | string
u_SESSION: string
username: null | string
utility: null | string
}

export interface MobileTransactionsFormat{
    accountBalance: number
    accountNumber: string
    customerid: string
    dateCreated: string
    error_count: number
    status: AccountStatus
    username: null | string
}

export interface SuccessfulFetchingOfMobileTrans extends GenericGetHttpBackEndResponseFormat{
    data: Array<MobileTransactionsFormat>
}

export interface AccountTypesInGlobus{
    activeAccounts: number,
    inActiveAccounts: number,
    totalNumberOfAccounts: number
}

export interface RetailBackend{
    totalMobileRecords: number
    totalRibRecords: number
    totalSumMobileTransaction: number
    totalSumRibTransaction: number
    totalSumUssdTransaction: number
    totalUssdRecords: number
}

export interface SuccessfullFetchingOfDashboardSummaries{
    message: null | string
    retailBackend: RetailBackend
    success: boolean
}

export interface SuccessfulAirtimeAndBills{
    airtimeSum: number,
    billsSum: number,
    airtimeCount: number,
    billsCount: number
  }

  export interface SuccessfulChannelRecords{
      message: string,
      retailBackend: RetailBackend,
      success: boolean
  }

  export interface USSDMobileAndIbank{
    amount: number
    bankname: string
    datecreated: string
    destinationaccount: string
    destinationaccountname: string
    errormessage: null | string
    sourceaccount: string
    sourceaccountname: string,
    
  }

  export interface FullTransactionDetailsForUSSDMobileAndIbank extends GenericGetHttpBackEndResponseFormat{
    data: USSDMobileAndIbank[],
    errors: null | string,

  }


  export interface FullTransactionListForAirtime extends GenericGetHttpBackEndResponseFormat{
    data: AirtimeTransactions[],
    errors: null | string,

  }

  export interface AirtimeTransactions{
    accountnumber: number,
    network: string,
    amount: number,
    responsemessage:  string,
    date_added: string,
    receiver: number,
    modulename: string,
    uniqueref: string,
    sub_billers: null | string
  }

  export interface FullBillsTransactionsList extends GenericGetHttpBackEndResponseFormat{
      data: BillsTransaction[],
      errors: null | string
  }

  export interface BillsTransaction{
    accountname: string,
    accountnumber: string,
    token: string,
    amount: number,
    response_message: string,
    created_on: string,
    customerphone: any,
    modulename: string,
    customeremail: string,
    reference_number: string,
    sub_billers: string,
    category?: string
  }

export interface NipTransaction {
    amount: number
    appcode: string
    appuser: string
    datecreated: string
    destinationaccount: string
    destinationaccountname: string
    errormessage: string
    narration: string
    sessionid: string
    sn: number
    sourceaccount: string
    sourceaccountname: string
}

export interface MobileRIBUSSDTransactions{
    sourceaccount: string,
      destinationaccount: string,
      destinationaccountname: string,
      sourceaccountname: string,
      errormessage: null | string,
      bankname: string,
      amount: number,
      datecreated: number
}

export interface ACustomerTransactionLimit{
        user_id: number,
        username: string
        trans_type: 1,
        transactiontype: string,
        daily_limit: number,
        token: number
    
}

export interface SuccessfulNipTransactions extends GenericGetHttpBackEndResponseFormat{
   data: NipTransaction[]
   error: null | string
}

export interface SuccessfulMobileUSSDRIBTransactions extends GenericGetHttpBackEndResponseFormat{
    data: MobileRIBUSSDTransactions[],
    error: null | string
}



export interface SuccessfulFetchingOfCustomersTransactionLimits extends GenericGetHttpBackEndResponseFormat{
    data: ACustomerTransactionLimit[],
    error: null | string
}