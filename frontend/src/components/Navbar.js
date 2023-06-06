import React from "react";
import { Link } from 'react-router-dom';
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Chip,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    BuildingStorefrontIcon,
    Bars3Icon,
    XMarkIcon,
    BookOpenIcon,
    RocketLaunchIcon,
    UsersIcon,
    UserIcon,
    ArchiveBoxIcon,
    HomeIcon
} from "@heroicons/react/24/outline";

const colors = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    green: "bg-green-50 text-green-500",
    "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
    purple: "bg-purple-50 text-purple-500",
    teal: "bg-teal-50 text-teal-500",
    cyan: "bg-cyan-50 text-cyan-500",
    pink: "bg-pink-50 text-pink-500",
};

const navListMenuItemsBook = [
    {
        color: "blue",
        icon: ArchiveBoxIcon,
        title: "Inventories",
        description: "Learn about our story and our mission statement.",
        endpoint : "/inventories"
    },
    {
        color: "green",
        icon: BookOpenIcon,
        title: "Books",
        description: "Learn about our story and our mission statement.",
        endpoint : "/books"
    },
    {
        color: "orange",
        icon: UserIcon,
        title: "Authors",
        description: "News and writings, press releases, and resources",
        endpoint : "/authors"
    },
    {
        color: "blue-gray",
        icon: RocketLaunchIcon,
        title: "Publishers",
        description: "All the stuff that we dan from legal made us add.",
        endpoint : "/publishers"
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const renderItems = navListMenuItemsBook.map(
        ({ icon, title, description, color, endpoint }, key) => (
            <Link to={endpoint} key={key}>
                <MenuItem className="flex items-center gap-3 rounded-lg">
                    <div className={`rounded-lg p-5 ${colors[color]}`}>
                        {React.createElement(icon, {
                            strokeWidth: 2,
                            className: "h-6 w-6",
                        })}
                    </div>
                    <div>
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="flex items-center text-sm"
                        >
                            {title}
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            {description}
                        </Typography>
                    </div>
                </MenuItem>
            </Link>
        )
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-normal">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            <ArchiveBoxIcon  className="h-[18px] w-[18px]" />
                            Inventory
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
            <Link to="/home">
                <Typography
                    as="p"
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <ListItem className="flex items-center gap-2 py-2 pr-4">
                        <HomeIcon  className="h-[18px] w-[18px]" />
                        Home
                    </ListItem>
                </Typography>
            </Link>
            <Link to="/staffs">
                <Typography
                    as="p"
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <ListItem className="flex items-center gap-2 py-2 pr-4">
                        <UsersIcon className="h-[18px] w-[18px]" />
                        Staffs
                    </ListItem>
                </Typography>
            </Link>
            <NavListMenu />
            <Link to="/stores">
                <Typography
                    as="p"
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <ListItem className="flex items-center gap-2 py-2 pr-4">
                        <BuildingStorefrontIcon className="h-[18px] w-[18px]" />
                        Stores
                    </ListItem>
                </Typography>

            </Link>
        </List>
    );
}

export default function TopNavbar() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to="/">
                    <Typography
                        as="p"
                        variant="h6"
                        className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                    >
                        Good Reading Bookstore
                    </Typography>
                </Link>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden gap-2 lg:flex">
                    <Button variant="text" size="sm" color="blue-gray">
                        Sign In
                    </Button>
                    <Button variant="gradient" size="sm">
                        Sign Up
                    </Button>
                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className="lg:hidden"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
                <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                    <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
                        Sign In
                    </Button>
                    <Button variant="gradient" size="sm" fullWidth>
                        Sign Up
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}