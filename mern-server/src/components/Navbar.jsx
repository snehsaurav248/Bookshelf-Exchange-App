// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBlog, FaBars,FaTimes } from "react-icons/fa";

// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isSticky, setSticky] = useState(false);

//     // Toggle menu
//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     }

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 100) {
//                 setSticky(true);
//             } else {
//                 setSticky(false);
//             }
//         }

//         window.addEventListener("scroll", handleScroll);

//         // Cleanup function to remove event listener
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         }
//     }, []);

//     // Navigation items
//     const navItems = [
//         { link: "Home", path: "/" },
//         { link: "About", path: "/about" },
//         { link: "Shop", path: "/shop" },
//         { link: "Sell Your Book", path: "/admin/dashboard" },
//         { link: "Blog", path: "/blog" },
//     ];

//     return (
//         <header>
//             <nav>
//                 <div>
//                     {/* Logo */}
//                     <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog className='inline-block' />Books</Link>

//                     {/* New Item for large device */}
//                     <ul className='md:flex space-x-12 hidden'>
//                         {navItems.map(({ link, path }) => (
//                             <li key={path}>
//                                 <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>
//                             </li>
//                         ))}
//                     </ul>
//                     {/* Button for large devices */}
//                     <div className='space-x-12 hidden lg:flex items-center'>
//                         <button onClick={toggleMenu}><FaBars className='w-5 hover:text-blue-700' /></button>
//                     </div>
//                     {/*menu btn for the mobile devices */}
//                     <div className='md:hidden'>
//                         <button>
//                             {

//                                 isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
//                             }
//                         </button>

//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// }
// export default Navbar;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBlog, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setSticky] = useState(false);

    // Toggle menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    // Navigation items
    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" },
        { link: "Sell Your Book", path: "/admin/dashboard" },
        { link: "Blog", path: "/blog" },
    ];

    return (
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300' >
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300":"" }`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/* Logo */}
                    <Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog className='inline-block' />Books</Link>

                    {/* Nav Item for large device */}
                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({ link, path }) => (
                                <li key={path}>
                                    <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>
                                </li>
                            ))
                        }
                    </ul>
                    {/* Button for large devices */}
                    <div className='space-x-12 hidden lg:flex items-center'>
                        <button onClick={toggleMenu}><FaBars className='w-5 hover:text-blue-700' /></button>
                    </div>
                    {/* Menu btn for mobile devices */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {isMenuOpen ? <FaTimes className='h-5 w-5 text-black' /> : <FaBars className='h-5 w-5 text-black' />}
                        </button>
                    </div>
                </div>
                {/*navitems for small devices*/}
                <div className={`space-y-4 pz-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0":"hidden"}`}>

                    {
                        navItems.map(({ link, path }) => (
                            <li key={path}>
                                <Link to={path} className='block text-base text-white uppercase cursor-pointer'>{link}</Link>
                            </li>
                        ))
                    }
                </div>
            </nav>
        </header>
    );
}

export default Navbar;

