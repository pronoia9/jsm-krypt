import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../images/logo.png';
import { useState } from 'react';

const NavbarItem = ({ title, classProps }) => <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;

const Navbar = () => {
  const navbarLinks = ['Market', 'Exchange', 'Tutorials', 'Wallets'];
  const [toggleMenu, setToggleMenu] = useState(false);
  const iconStyles = {
    fontSize: 28,
    className: 'text-white md:hidden cursor-pointer',
    onClick: () => setToggleMenu(!toggleMenu),
  };

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img src={logo} className='w-32 cursor-pointer' alt='logo' />
      </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {navbarLinks.map((item, i) => (
          <NavbarItem key={item + i} title={item} classProps='' />
        ))}
        <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>Login</li>
      </ul>
      {/* Mobile menu */}
      <div className='flex relative'>
        {toggleMenu ? <AiOutlineClose {...iconStyles} /> : <HiMenuAlt4 {...iconStyles} />}
      </div>
    </nav>
  );
};

export default Navbar;