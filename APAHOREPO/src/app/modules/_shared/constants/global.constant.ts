import { constants } from "os";

export const AUTH_MSG = "You are not authorized to access this application ";
export const SERVICE_ERROR_MSG =
    "Service Error. Please reach out to IT HelpDesk or try again after sometime";
export const ERROR_PAGE_MSG = "You are not authorized to use this application";
export const NOT_VALID_PAGE_MSG = `Requested page doesn't exist , Please go to the home page`;
export const NOT_AUTHORIZED_PAGE_MSG = `User not authorized to view this page`;
export const CurrentData = new Date();

export const DEALSPECIALIST = "DealSpecialist";
export const SUCCESS = "Success";
export const STORAGE_KEY = "hoPlatformCurrentUserKey";
export const CLOG_PREFIX = "hoPlatform:userService - ";
export const APP_TITLE = `Advisor Practices Acquisition`;

export const BP_PROFILE_STATUS = [
    { id: "ACT", value: "Active" },
    { id: "NST", value: "Not Started" },
    { id: "TER", value: "Terminated"}   

];

export const GOAL_STATUS = {
    critical: "",
    "On Track": "green",
    "Needs Attention": "orange",
    "In Progress": "orange",
    "Completed Goals": "darkgrey",
};
export const TASK_STATUS = {
    TotalDue: "",
    PastDue: "red-text",
    DueThisWeek: "blue",
    Next30Days: "deepgrey",
    "Past Due": "redText",
    "Due This Week": "blue",
    "Future Tasks": "deepgrey",
    Completed: "darkgrey",
};
export const STAGES = [
    { name: "Discovery",code:1 },
    { name: "Due Diligence", code: 2 },
    { name: "Closing", code: 3 },
    { name: "Integration",code:4 }
    
];

export const TASKSTATUS = [
    { name: "Not Started", code: "NS" },
    { name: "In Progress", code: "IP" },
    { name: "Complete", code: "CM" },
];

export const DEALSTATUS = [
    { name: "Not Started", code: "NTST" },
    { name: "In Progress", code: "INPR" },
    { name: "Completed", code: "COMP" },
    { name: "On Hold", code: "ONHO" },
    { name: "Terminated", code: "TERM" }
    
];

export const TASKCATEGORY = [
    { name: "Agreement", code: "AG" },
    { name: "Book Transfer", code: "BT" },
    { name: "Client Communications", code: "CC" },
    { name: "Financing", code: "FI" },
    { name: "Licensing", code: "LI" },
    { name: "Valuation", code: "VA" },
];

export const TASKACTION = [
    { name: "Assign", code: "ASG" },
    { name: "Complete", code: "COM" },
    { name: "Follow up", code: "FOL" },
    { name: "Meeting", code: "MTG" },
    { name: "Review", code: "REV" },
    { name: "Send Communication", code: "SEC" },
    { name: "Sign", code: "SIG" },
    { name: "Submit", code: "SUB" },
];

export const TASKOWNER = [
    { name: "Buyer", code: "BUY" },
    { name: "Seller", code: "SEL" },
    { name: "Deal Specialist", code: "DLS" },
];

export const BENEFICIARY = {
    2: "Secondary" ,
    3: "Tertiary" ,
    4: "Quaternary",  
    5: "Quinary" ,
    6: "Senary" ,
    7: "Septenary" ,
    8: "Octonary" 
};

export const ASSURANCECWSTATUS={
    1:"Access Off",
    2:"Access On",
    3:"Access On",
    4:"Access Off"
}

export const NUMBERTOBOOLEAN={    
    true:1,
    false:0,
    0:false,
    1:true
}

export const MONTH = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
};

export const SELLERSTAGE = {
    "Accepting Offers" : "AO",
    "Sale Pending" : "SP",
    "Sold" : "SD",
    "Unknown" : "UK",
    "Withdrawn" : "WD"
}

export const PREMIUMBUERCWSTATUS={
    0:"Access Off",
    1:"Access On",
}

export const BUYERSTATUS = {
    "Active": "ACT",
    "Terminated": "TER",
    "Not Started": "NST"  
}
