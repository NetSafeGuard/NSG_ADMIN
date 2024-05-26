import {Group} from "@/@types/Group.ts";

export interface Activity {
    title: string;
    startdate: Date;
    enddate: Date;
    groups: Group[]
}