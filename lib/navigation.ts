import {
    IconAdjustments,
    IconFileAnalytics,
    IconGauge, IconHome,
    IconPresentationAnalytics, TablerIcon
} from "@tabler/icons";


export type NavigationItem = {
    label: string;
    icon: TablerIcon | null;
    initiallyOpened?: boolean;
    link?: string;
    childs?: NavigationChildItem[];
};

export type NavigationChildItem = {
    label: string;
    link: string;
}

export const navigation: NavigationItem[] = [
    { label: 'Dashboard', icon: IconHome, link: '/' },
    {
        label: 'Capacities',
        icon: IconGauge,
        childs: [
            { label: 'Overview', link: '/workload/overview' }
        ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', icon: IconFileAnalytics },
    { label: 'Settings', icon: IconAdjustments },
];