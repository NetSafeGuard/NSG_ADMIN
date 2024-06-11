export interface Activity {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    groups: string[];
    createdAt?: Date;
    redirectUrl: string;
    domains: Domain[];
    creator?: Creator
    id?: number;
}

export interface Creator {
    username: string;
    email: string;
}

export interface Domain {
    name: string;
}