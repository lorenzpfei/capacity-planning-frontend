import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export type NavigationItem = {
    name: string;
    slug: string;
    icon: IconDefinition;
    childs?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
    {
        name: "Dashboard",
        slug: '',
        icon: faCoffee
    },
    {
        name: "Reporting",
        slug: '',
        icon: faCoffee,
        childs:[
            {
                name: 'Workload',
                slug: 'workload',
                icon: faCoffee
            },
        ]
    },
    {
        name: 'Settings',
        slug: '',
        icon: faCoffee
    }
];
