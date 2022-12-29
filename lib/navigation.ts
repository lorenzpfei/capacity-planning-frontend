import {IconType} from "react-icons";
import {AiOutlineHome} from "react-icons/ai";
import {TbReportAnalytics} from "react-icons/tb";
import {GiSettingsKnobs} from "react-icons/gi";


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
                icon: null
            },
            {
                name: 'test',
                slug: '',
                icon: null
            },
        ]
    },
    {
        name: 'Settings',
        slug: '',
        icon: GiSettingsKnobs
    }
];
