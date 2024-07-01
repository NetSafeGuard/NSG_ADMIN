import type { Student } from "./Group";

export interface Activity {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    groups: string[];
    createdAt?: Date;
    redirectUrl: string;
    activityDomains: ActivityDomain[];
    logs: ActivityLog[];
    creator?: Creator;
    code?: string;
    id?: number;
}

export interface Creator {
    username: string;
    email: string;
}

export interface ActivityDomain {
    domain: Domain;
}

enum Priority {
	ALTA = 'ALTA',
	MEDIA = 'MEDIA',
	BAIXA = 'BAIXA',
}

export interface ActivityLog {
		createdAt: Date;
		user: Student;
		action: string;
		info: string;
		priority: Priority;
	}

export interface Domain {
    name: string;
    id: number;
}