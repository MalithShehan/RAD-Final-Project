import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "@/utils/containt";

const Navigation = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    console.log(pathname); 

    const handleClick = ({index, path}) => {
        setCurrentIndex(index);
        navigate(path);
    }
    return (
        <ul className="pb-2">
            {menuItems.map(({ title, path }, index) => {
                return (
                <li
                    className={`my-2 p-2 rounded-md cursor-pointer hover:bg-primary hover:text-white ${currentIndex === index || pathname === path ? 'bg-primary text-white' : ''}`}
                    onClick={() => handleClick({index, path})}
                >
                    <Link to={path}>{title}</Link>
                </li>
                )
            })}
        </ul>
    );
}

export default Navigation;