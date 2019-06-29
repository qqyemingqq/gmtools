import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import CPAList from "@/pages/CPAList.vue";
import CpaStat from "@/pages/CpaStat.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import CpaPriceInput from "@/pages/CpaPriceInput.vue";
import AllCpaBase from "@/pages/AllCpaBase.vue";

const routes = [
    {
        path: "/",
        component: DashboardLayout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard
            },
            {
                path: "user",
                name: "User Profile",
                component: UserProfile
            },
            {
                path: "allcpa",
                name: "所有CPA",
                component: AllCpaBase
            },
            {
                path: "table",
                name: "CPA信息",
                component: CPAList
            },
            {
                path: "stat",
                name: "CPA记录",
                component: CpaStat
            },
            {
                path: "cdata",
                name: "CPA数据",
                component: CpaPriceInput
            },
            {
                path: "typography",
                name: "Typography",
                component: Typography
            },
            {
                path: "icons",
                name: "Icons",
                component: Icons
            },
            {
                path: "maps",
                name: "Maps",
                meta: {
                    hideFooter: true
                },
                component: Maps
            },
            {
                path: "notifications",
                name: "Notifications",
                component: Notifications
            },
            {
                path: "upgrade",
                name: "Upgrade to PRO",
                component: UpgradeToPRO
            }
        ]
    }
];

export default routes;
