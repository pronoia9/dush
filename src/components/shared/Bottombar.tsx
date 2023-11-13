import { Link, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";

const Bottombar = () => {
  const { pathname } = useLocation();
  
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link, index) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-link-${index}`}
            to={link.route}
            className={`flex-center flex-col gap-1 p-2 transition${isActive ? ' bg-primary-500 rounded-[10px]' : ''}`}
          >
            <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white${isActive ? ' invert-white' : ''}`} width={16} height={16} />
            <p className='tiny-medium text-light-2'>{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};
export default Bottombar;
