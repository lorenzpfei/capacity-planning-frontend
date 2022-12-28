import {IconType} from "react-icons";
import {AiOutlineHome} from "react-icons/ai";
import {TbReportAnalytics} from "react-icons/tb";
import {GiSettingsKnobs} from "react-icons/gi";
import {IoStatsChartSharp} from "react-icons/io5";


export type NavigationItem = {
    name: string;
    slug: string;
    icon: IconType | null;
    childs?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
    {
        name: "Dashboard",
        slug: '',
        icon: AiOutlineHome
    },
    {
        name: "Reporting",
        slug: '',
        icon: TbReportAnalytics,
        childs: [
            {
                name: 'Workload',
                slug: 'workload',
                icon: IoStatsChartSharp
            },
        ]
    },
    {
        name: 'Settings',
        slug: '',
        icon: GiSettingsKnobs
    }
];
