import { menuItems } from '../../menuItems';
import MenuItems from './MenuItems';
import "./Dropdown.css"
import { useState } from 'react';
const Navlinks = ({showMenu}) => {
 
 
  return (
    <>
     <ul className={`menus ${showMenu ? 'mobile-menu-open' : ''}`}>
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return (
            <MenuItems 
              items={menu}
              key={index}
              depthLevel={depthLevel} 
            />
          );
        })}
      </ul>
    </>
  );
};

export default Navlinks;