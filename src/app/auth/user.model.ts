export class User {
    UserName: string;
    Password: string;
    FirstName: string;
    AreaId: number;
    Dob: string;
    UserId: number;
    LastName: string;
    MobilePhone: string;
    EmailId: string;
    Gender: string;
    EmailNotification: boolean;
    SmsNotification: boolean;
    UserProfilePicture: string;
    DeviceType: string;
    UserType: string;
    CountryId:number;
    CountryName: string;
    CityId:number;
    CityName: string;
    AreaName: string;
    KCIRegistered: number;
    KCIDetails: string;
    ReferralCode:number;



    constructor(
    UserName: string,
    Password: string,
    FirstName: string,
    AreaId: number,
    Dob: string,
    UserId: number,
    LastName: string,
    MobilePhone: string,
    EmailId: string,
    Gender: string,
    EmailNotification: boolean,
    SmsNotification: boolean,
    UserProfilePicture: string,
    DeviceType: string,
    UserType: string,
    CountryId:number,
    CountryName: string,
    CityId:number,
    CityName: string,
    AreaName: string,
    KCIRegistered: number,
    KCIDetails: string,
    ReferralCode:number
    ) {
        this.UserName = UserName;
        this.Password = Password;
        this.FirstName = FirstName;
        this.AreaId = AreaId;
        this.Dob = Dob;
        this.UserId = UserId;
        this.LastName = LastName;
        this.MobilePhone = MobilePhone;
        this.EmailId = EmailId;
        this.Gender = Gender;
        this.EmailNotification = EmailNotification;
        this.SmsNotification = SmsNotification;
        this.UserProfilePicture = UserProfilePicture;
        this.DeviceType = DeviceType;
        this.UserType = UserType;
        this.CountryId=CountryId;
        this.CountryName = CountryName;
        this.CityId=CityId
        this.CityName = CityName;
        this.AreaName = AreaName;
        this.KCIRegistered = KCIRegistered;
        this.KCIDetails = KCIDetails;
        this.ReferralCode=ReferralCode;
    }
}
