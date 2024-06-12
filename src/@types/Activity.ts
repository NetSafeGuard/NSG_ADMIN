export interface Activity {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    groups: string[];
    createdAt?: Date;
    redirectUrl: string;
    activityDomains: ActivityDomain[];
    creator?: Creator
    id?: number;
}

export interface Creator {
    username: string;
    email: string;
}

export interface ActivityDomain {
    domain: Domain;
}

export interface Domain {
    name: string;
}