import {
    Adjustments,
    FileAnalytics,
    Gauge, Home, Icon,
    PresentationAnalytics
} from 'tabler-icons-react';


export type NavigationItem = {
    label: string;
    icon: Icon;
    initiallyOpened?: boolean;
    link?: string;
    childs?: NavigationChildItem[];
};

export type NavigationChildItem = {
    label: string;
    link: string;
}

export const navigation: NavigationItem[] = [
    {label: 'Dashboard', icon: Home, link: '/'},
    {
        label: 'Workload',
        icon: Gauge,
        link: '/workload'
    },
    {label: 'Analytics', icon: PresentationAnalytics},
    {label: 'Contracts', icon: FileAnalytics},
    {label: 'Settings', icon: Adjustments},
];