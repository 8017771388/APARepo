declare var configEnvironment: any;

// EASE Link
// export const VCFOHO_LINK = configEnvironment.REST_URL + '/api';

// export const ADD_TOKEN_API = VCFOHO_LINK + '/CodeAndDecode';
// export const GET_TYPE_API = VCFOHO_LINK + '/GetDistinctEntityTypes';
// export const ENTITY_DESC_API = VCFOHO_LINK +'/GetEntityDescTypeDetails';
// export const ENTITT_MAINTAIN= VCFOHO_LINK+'/MaintainEntityDescTypeDetails';
// export const ERROR_DETAIL = VCFOHO_LINK +'/GetErrorDetails';

// Authentication/ Authorization
export const AUTH_URL = configEnvironment.AuthConstants.AuthUrl;
export const CW_IMAGE_URL = configEnvironment.AuthConstants.Cw_Img_Url;
export const USER_ROLE_URL =
    "./assets/json/authentication/" + "role-access.json";
export const CURRENT_ENV = configEnvironment.VCFOHO_Environment;

export const DEALSPECIALIST_USER =
    configEnvironment.AuthConstants.DEALSPECIALIST_USER;

export class AppSettings {
    public static APPLICATION_VERSION = "1.0.0";
    //public static SW_ENVIRONMENT = configEnvironment.sw_Environment;;
    //public static HO_CORE_BASE_URL = configEnvironment.HO_BASE_URL;
    public static Mule_Service_URL = configEnvironment.MULE_SERVICES;
    public static apiKey = {
        client_id: configEnvironment.CLIENT_ID,
        client_secret: configEnvironment.CLIENT_SECRET,
    };

    public static adGroup = {
        dealSpecialist: DEALSPECIALIST_USER,
    };

    //Core-Plan Services

    public static profiles =
        AppSettings.Mule_Service_URL +
        "/vcfo/exp-ho/requests/advisordetails/profiles";
    public static hoUsers =
        AppSettings.Mule_Service_URL +
        "/vcfo/exp-ho/requests/ho-users?noCache=1568887874906";

    public static searchAdvisorBP =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/adv-details/";

    public static searchAdvisor =
        AppSettings.Mule_Service_URL + "/apa/prc/req/adv-details/";

    public static adDetail =
        AppSettings.Mule_Service_URL + "/vcfo/exp-ho/requests/ad-details";
    public static homeOfficeUsers =
        AppSettings.Mule_Service_URL + "/vcfo/exp-ho/requests/ho-users";
    public static enableCWAccess =
        AppSettings.Mule_Service_URL + "/vcfo/exp-ho/requests/asat-flag";
    public static advInfo =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/adv-info/";
    public static dealTypes =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/get-dealtypes";
    public static getStages =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/get-stages/";
    public static getMLTasks =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/master-library/task-list";
    public static saveDeal =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/save-deal";
    public static dealList =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/admin-home/deal-list";
    public static filterValues =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/admin-home/get-column";
    public static saveMLTask =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/master-library/save-task";
    public static deleteNote =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/delete-note";
    public static dealTask =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/master-library/deal-task";
    public static saveDealPlan =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/save-dealplan";
    public static saveDealTask =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/manage-plan/save-task";
    public static allNotes =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/get-allnotes/";
    public static saveNote =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/save-dealtasknote";
    public static getAsPlnAdvisorProfile =
        AppSettings.Mule_Service_URL + "/assurance-plan-api/prc/1.0/adv-profiles";
    public static saveProfile =
        AppSettings.Mule_Service_URL + "/assurance-plan-api/prc/1.0/save-profile";
    public static deleteBeneficiary =
        AppSettings.Mule_Service_URL + "/assurance-plan-api/prc/1.0/delete-beneficiary";
    public static createBoxFolder =
        AppSettings.Mule_Service_URL + "/assurance-plan-api/prc/1.0/create-folder";
    public static getAssociatedReps =
        AppSettings.Mule_Service_URL + "/assurance-plan-api/prc/1.0/reps/";
    public static duplicateDeal =
        AppSettings.Mule_Service_URL + "/assurance-plan-api/prc/1.0/duplicate-deal-check/";
    public static updateNotiifcation =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/update-notification";
    public static getAllNotification =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/get-allnotificationho/";
    public static saveDealTaskOrder =
        AppSettings.Mule_Service_URL + "/apa-api/prc/1.0/save-taskorder";
    public static getPremiumBuyerList=
        AppSettings.Mule_Service_URL + "/buyer-profile-api/prc/1.0/view-allbuyerprofile";
    public static saveBuyerProfile =
        AppSettings.Mule_Service_URL + "/buyer-profile-api/prc/1.0/save-buyerprofile";
    public static saveSellerOpportunity =
        AppSettings.Mule_Service_URL + "/buyer-profile-api/prc/1.0/save-sellerprofile";

    public static getOpprtunityDetails =
        AppSettings.Mule_Service_URL + "/buyer-profile-api/prc/1.0/get-sellerprofile";   
        
    public static getSellerList=
        AppSettings.Mule_Service_URL + "/buyer-profile-api/prc/1.0/view-allsellerprofile";

    public static inlineUpdateBuyerProfile =
        AppSettings.Mule_Service_URL + "/buyer-profile-api/prc/1.0/inlinesave-buyerprofile";
    public static inlineUpdateSellerProfile =
        AppSettings.Mule_Service_URL + "/buyer-profile-api/prc/1.0/inlinesave-sellerprofile";
}
