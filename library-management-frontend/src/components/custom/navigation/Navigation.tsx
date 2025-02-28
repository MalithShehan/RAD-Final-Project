import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "@/utils/containt";

const Navigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(
    menuItems.findIndex((item) => item.path === pathname)
  );

  const handleNavigation = (index, path) => {
    setCurrentIndex(index);
    navigate(path);
  };

  return (
    <nav aria-label="Main Navigation">
      <ul className="pb-2">
        {menuItems.map(({ title, path, icon }, index) => (
          <li
            key={index}
            className={`flex items-center my-2 p-2 rounded-md cursor-pointer 
              hover:bg-primary hover:text-white 
              ${currentIndex === index || pathname === path ? "bg-primary text-white" : ""}`}
          >
            <div
              role="button"
              onClick={() => handleNavigation(index, path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleNavigation(index, path);
                }
              }}
              tabIndex={0}
              className="focus:outline-none flex items-center w-full"
            >
              {icon} {/* Render the icon */}
              <span>{title}</span>
              
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
