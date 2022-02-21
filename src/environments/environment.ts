// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  general_url: 'https://app.globusbank.com/Omni_ChannelBackendApi/api/',
  auth_login: 'AuthBackend/LoginUser',

  users: {
    getAllUsers: 'UserManagement/GetAllUsers',
    getACustomerInformation: 'UserManagement/GetUserDetailbyAccountNumber',
    getTotalAccs: 'UserManagement/GetTotalAccounts',
    lockedUsers: 'UserManagement/GetLockedUsers',
    activeUsers: 'UserManagement/GetUnLockedUsers',
    lockAProfile: 'UserManagement/LockUserProfile',
    unlockAProfile: 'UserManagement/InitiateUnlockProfile',
    approveUnlockProfile: 'UserManagement/ApproveUnlockProfile',
    searchUserByAcctNumber: 'UserManagement/GetUserDetailbyAccountNumber',
    searchUsersWithDates: 'UserManagement/SearchUsers',
    searchActiveUsersByDate: 'UserManagement/SearchUnLockedUsersByDate',
    searchLockedUsersByDate: 'UserManagement/SearchLockedUsersByDate',
    initiateUpdateLimit: "UserManagement/InitiateUpdateLimit",
    searchUserByUsername: 'UserManagement/SearchUserTranslimit',
    searchForActiveOrLockedUsersByAcctNumber: 'UserManagement/SearchLockedAndUnlockedUserByAcc',
    searchUsersActiveAndLockedUsersByUsername: 'UserManagement/SearchusersByUsername',
    fetchProfilesAwaitingApproval: 'UserManagement/GetUnlockProfilesForApproval'
  },

  dashboard: {
   getMobileTransactions: `Application/GetMobileRecords`,
   getTransactionSummary: `Transaction/GetTransactionsRecords`,
   getAirtimeAndBills: `Transaction/GetAirtimeBillsCount`,
   getChannelRecords: `Application/GetChannelRecords`,
   channelTransactions: `Transaction/GetTransactions`,
   fullAirtimeList: 'Transaction/GetAirtimeTransactions',
   billsTransactions: 'Transaction/GetBillsTransactions',
   searchUserByAcctNumber: 'UserManagement/GetUserDetailbyAccountNumber',
   fetchAccountssByDateRange: 'Application/GetChannelRecordsByDateRange',
   fetchTransactionsByDateRange: 'Transaction/GetTransactionsRecordsByDateRange'
 },

 transaction: {
   nipTransactions: 'Transaction/GetNipTransactions',
   mobileUssdRibTransactions: 'Transaction/GetTransactions',
   getTransactionLimitsForAllCustomers: 'Transaction/GetUserTransactionLimits',
   getNipTransactionsByDateRange: 'Transaction/GetNipTransactionsByDateRange'
 }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
