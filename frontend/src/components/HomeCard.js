import React from "react";
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button
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
} from "@heroicons/react/24/outline";
const icons = {
    BookOpenIcon: <BookOpenIcon />,
    RocketLaunchIcon: <RocketLaunchIcon />,
    UsersIcon: <UsersIcon />,
    BuildingStorefrontIcon: <BuildingStorefrontIcon />,
    ArchiveBoxIcon: <ArchiveBoxIcon />,
    UserIcon: <UserIcon />,
}
export default function HomeCard({ url, title, icon }) {
    return (
        <Card className="mt-2 w-60 text-center drop-shadow-lg m-2">
            <CardBody className="">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                </Typography>
                <Typography className="flex justify-center">
                    <div className="rounded-ls p-5 bg-blue-50 text-blue-500 h-20 w-20">
                        {icons[icon]}
                    </div>
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Link to={url}>
                    <Button>Read More</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}