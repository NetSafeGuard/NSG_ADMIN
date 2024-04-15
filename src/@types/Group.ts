export interface Group {
    name: string;
    createdAt: number;
    students: Student[]
}

export interface Student {
    studentid: string,
    name: string,
    email: string,
    routerip: string,
    code: string,
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
