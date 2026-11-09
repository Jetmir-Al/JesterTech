import { faCartShopping, faChartBar, faHouse, faShop, faTachographDigital, faUserGear } from "@fortawesome/free-solid-svg-icons";



export const NavigationSideBar = [
    [
        {
            "label": "Home",
            "navigate": "/",
            "icon": faHouse
        },
        {
            "label": "Dashboard",
            "navigate": "/dashboard",
            "icon": faTachographDigital
        },
    ],

    [
        {
            "label": "All Products",
            "navigate": "/products",
            "icon": faShop
        },
        {
            "label": "Compare Items",
            "navigate": "/compare",
            "icon": faChartBar
        },
        {
            "label": "Shopping Cart",
            "navigate": "/cart",
            "icon": faCartShopping
        },
    ],
    [
        {
            "label": "Profile",
            "navigate": "/profile",
            "icon": faUserGear
        }
    ]
]