import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../images/logo.png';
import { useState } from 'react';

import { useTransactionContext } from '../contexts/TransactionContext';

const NavbarItem = ({ title, classProps }) => <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;

const Navbar = () => {
  const { currentAccount } = useTransactionContext();
  const navbarLinks = ['Market', 'Exchange', 'Tutorials', 'Wallets'];
  const [toggleMenu, setToggleMenu] = useState(false);
  const iconStyles = {
    fontSize: '28',
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
        {!currentAccount && (
          <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
            <a
              href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
              target='_blank'
              rel='noreferrer'>
              Sign Up
            </a>
          </li>
        )}
      </ul>
      {/* Mobile menu */}
      <div className='flex relative'>
        {toggleMenu ? <AiOutlineClose {...iconStyles} /> : <HiMenuAlt4 {...iconStyles} />}
        {toggleMenu && (
          <ul
            className='z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
            <li className='text-xl w-full my-2'>
              <AiOutlineClose onClick={() => setToggleMenu(!toggleMenu)} />
            </li>
            {navbarLinks.map((item, i) => (
              <NavbarItem key={item + i} title={item} classProps='my-2 text-lg' />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;