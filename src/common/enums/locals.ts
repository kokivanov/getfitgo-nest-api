export enum RequestErrorDescriptions{
    NoAuthority = "You have no authority to access this resource.",
    ExpiredToken = "Perhaps your token access token is expired or corrupted.",
    BanendError = "You've been restricted from using this resource."

}

export enum RequestReturnsDescription {
    LoginReturn = "You were successfully loged in. Returns object of currently loged in user alongside with tokens.",
    VersionReturn = "Returns current version of API as string.",
    RegisterReturn = "Your profile was successfully created. Returns onbject of created user alongside with tokens.",
    RefreshReturn = "Your access token was successfully refreshed. Returns new pair of tokens.",
    AuthGatewaysResponse = "Returns actual gateways to login or register as array.",

    GetMeResponse = "Returns user object that represents currently logged in user.",
}

export enum RequestSuccessDescription {
    LogOutResponse = "You were successfully loged out.",
}