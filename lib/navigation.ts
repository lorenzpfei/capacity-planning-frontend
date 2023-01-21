import {
    IconAdjustments,
    IconCalendarStats,
    IconFileAnalytics,
    IconGauge, IconHome, IconLock,
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
        label: 'Workload',
        icon: IconGauge,
        childs: [
            { label: 'Overview', link: '/workload/overview' }
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        childs: [
            { label: 'Upcoming releases', link: '/' },
            { label: 'Previous releases', link: '/' },
            { label: 'Releases schedule', link: '/' },
        ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', icon: IconFileAnalytics },
    { label: 'Settings', icon: IconAdjustments },
    {
        label: 'Security',
        icon: IconLock,
        childs: [
            { label: 'Enable 2FA', link: '/' },
            { label: 'Change password', link: '/' },
            { label: 'Recovery codes', link: '/' },
        ],
    },
];