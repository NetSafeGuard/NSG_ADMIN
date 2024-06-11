export interface Activity {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    groups: string[];
    createdAt?: Date;
    redirectUrl: string;
    domains: JSON;
    creator?: Creator
    id?: number;
}

export interface Creator {
    username: string;
    email: string;
}