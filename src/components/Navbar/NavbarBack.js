import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import axios from 'axios';

const Header = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});
  const [isSticky, setIsSticky] = useState(false);
  const [menuItems, setMenuItems] = useState([]); // Dynamic menu state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => !prev);
  };

  const toggleDropdown = (menuIndex) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [menuIndex]: !prevState[menuIndex],
    }));
  };

  // Fetch and process menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://intellisoftnepal.com.np/ain/public/api/pages');
        const pages = response.data;

        // Filter for header menu items (parent_id === 0)
        const headerMenu = pages
          .filter((page) => page.parent_id === 0)
          .map((parentPage) => ({
            label: parentPage.title,
            link: parentPage.post_type === 'page' ? `/pages/${parentPage.slug}` : `/${parentPage.slug}`,
            subMenu: pages
              .filter((childPage) => childPage.parent_id === parentPage.id)
              .map((subPage) => ({
                label: subPage.title,
                link: subPage.post_type === 'page' ? `/pages/${subPage.slug}` : `/${subPage.slug}`,
                subMenu: pages
                  .filter((thirdPage) => thirdPage.parent_id === subPage.id)
                  .map((thirdPage) => ({
                    label: thirdPage.title,
                    link: thirdPage.post_type === 'page' ? `/pages/${thirdPage.slug}` : `/${thirdPage.slug}`,
                  })),
              })),
          }));

        setMenuItems(headerMenu);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu items');
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <header className="tg-header__style-two">
      <div className="container">
        <div className="tg-header__inner-wrap">
          <div className="tg-header__logo-wrap">
            <div className="logo">
              <Link to="/">
                <img
                  src="https://ain.org.np/public/images/logo.png"
                  alt="AIN Logo"
                  style={{ width: '55%', display: 'block' }}
                />
              </Link>
            </div>
          </div>
          <div className="tg-header__right-side">
            <div id="sticky-header" className={`tg-header__area tg-header__area-two ${isSticky ? 'sticky-menu' : ''}`}>
              <nav className="tgmenu__nav">
                <div className="logo d-none">
                  <Link to="/">
                    <img src="https://ain.org.np/public/images/logo.png" alt="Logo" />
                  </Link>
                </div>

                <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-lg-flex justify-content-end">
                  <ul className="navigation">
                    {menuItems.map((item, index) => (
                      <li key={index} className={item.subMenu && item.subMenu.length > 0 ? 'menu-item-has-children' : ''}>
                        <Link to={item.subMenu && item.subMenu.length > 0 ? '#' : item.link}>
                          {item.label}
                        </Link>
                        {item.subMenu && item.subMenu.length > 0 && (
                          <ul className="sub-menu">
                            {item.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex} className={subItem.subMenu && subItem.subMenu.length > 0 ? 'menu-item-has-children' : ''}>
                                <Link to={subItem.subMenu && subItem.subMenu.length > 0 ? '#' : subItem.link}>
                                  {subItem.label}
                                </Link>
                                {subItem.subMenu && subItem.subMenu.length > 0 && (
                                  <ul className="sub-menu">
                                    {subItem.subMenu.map((thirdItem, thirdIndex) => (
                                      <li key={thirdIndex}>
                                        <Link to={thirdItem.link}>{thirdItem.label}</Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mobile-nav-toggler mobile-nav-toggler-two" onClick={toggleMobileMenu}>
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
