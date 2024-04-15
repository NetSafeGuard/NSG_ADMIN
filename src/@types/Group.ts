export interface Group {
    name: string;
    createdAt: number;
    students: Student[]
}

export interface CreateGroup {
    name: string;
}

export interface Student {
    name: string,
    email: string,
    routerip: string,
    studentid: string,
    code?: string,
}

export type CreateData = {
    studentid: string,
    name: string,
    email: string,
    routerip: string,
};

export type EditData = {
    key: string,
    value: string,
};
