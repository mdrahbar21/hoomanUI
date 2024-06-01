import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SiShopware } from 'react-icons/si';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../../data/dummy';
import { useStateContext } from '../contexts/contextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const router = useRouter();

  const formatName = (name:string) => {
    const formattedName = name.replace(/([A-Z])/g, ' $1').trim();
    return formattedName;
  };

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto lg:hover:overflow-auto pb-10 lg:overflow-hidden">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link href="/" passHref>
              <a className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900" onClick={handleCloseSideBar}>
                <SiShopware /> <span>Shop</span>
              </a>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                {/* Icon component commented out for clarity */}
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <Link href={`/${link.address}`} key={link.name} passHref>
                    <a
                      onClick={handleCloseSideBar}
                      className={router.pathname === `/${link.address}` ? activeLink : normalLink}
                      style={{ backgroundColor: router.pathname === `/${link.address}` ? currentColor : '' }}
                    >
                      {link.icon}
                      <span className="capitalize">{formatName(link.name)}</span>
                    </a>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
