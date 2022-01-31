
export interface LogInResponse{
    activeDir: {
        message: string,
        success: boolean,
        user: AStaffDetails
    },
    sessionId: string,
    success: boolean,
    user: {
        
        success: boolean,
        message: string,
        staff: LoggedInStaffRole
    }
}

export interface userLoginDetails{
    Username: string,
    Password: string,
    Token: string
}

export interface LockAProfileRequestBody{
    CustomerUsername: string,
    InitiatedBy: string,
    Reason: string,
    SessionId: string,
    DateIssued: string,
    Email: string
}

export interface AStaffDetails{
    
    businessPhones: null | string
    displayName: string
    givenName: string
    id: null | number
    jobTitle: string
    mail: string
    mobilePhone: null | any
    officeLocation: null | any
    preferredLanguage: null | string
    surname: string
    userPrincipalName: string
}

export interface LoggedInStaffRole{
    sessionId?: string,
    createD_ON: string
    email: string
    firtsname: null | string
    id: number
    lastname: string
    role: string
    status: boolean
}