interface Timestamps{
    created_at: string;
    updated_at: string;
}

export interface User extends Timestamps{
    id: number;
    name: string;
    email: string;
    avatar: string;
    workload?: Workload[];
    workloadSum?: Workload;
    task_user_id: number;
    tracking_user_id: number;
}

export interface Task {
    name: string;
    link: string;
}

export interface Workload {
    hoursContract: number;
    hoursTimeoff: number;
    hoursTask: number;
    tasks: Task[];
    date: string;
}

export interface User extends Timestamps{
    id: number;
    name: string;
    email: string;
    avatar: string;
}

export interface Department extends Timestamps{
    id: number;
    name: string;
}