import React, { useState, useEffect, useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
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

  const { settings } = useContext(SettingsContext);

    // Handle the image load event
    const handleImageLoad = () => {
      setLoading(false); // Hide loader when image is loaded
    };

    // Handle the image error event
    const handleImageError = () => {
      setLoading(false); // Hide loader if there's an error with loading the image
    };

  // Manage body class for mobile menu visibility
  useEffect(() => {
    if (isMobileMenuVisible) {
      document.body.classList.add('mobile-menu-visible');
    } else {
      document.body.classList.remove('mobile-menu-visible');
    }
    return () => {
      document.body.classList.remove('mobile-menu-visible');
    };
  }, [isMobileMenuVisible]);

  // Sticky menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll < 245) {
        setIsSticky(false);
        document.querySelector('#sticky-header')?.classList.remove('sticky-menu');
      } else {
        setIsSticky(true);
        document.querySelector('#sticky-header')?.classList.add('sticky-menu');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            // link: parentPage.slug || '#',
            link: parentPage.post_type === 'page' ? `/pages/${parentPage.slug}` : `/${parentPage.slug}`,

            subMenu: pages
              .filter((childPage) => childPage.parent_id === parentPage.id)
              .map((subPage) => ({
                label: subPage.title,
                // link: subPage.slug || '#',
                link: subPage.post_type === 'page' ? `/pages/${subPage.slug}` : `/${subPage.slug}`,


                subMenu: pages
                  .filter((thirdPage) => thirdPage.parent_id === subPage.id)
                  .map((thirdPage) => ({
                    label: thirdPage.title,
                    // link: thirdPage.slug || '#',
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

  // if (loading) {
  //   return <div>Loading menu...</div>;
  // }

  if (loading) {
    return <div>
       <div className="loader"></div>
    </div>;
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
              <a href="/">
                  <img
                     src={settings?.data?.[0]?.logo} 
                     alt="Logo" 
                     style={{ width: '55%', display: 'block' }}
                  />
              </a>
            </div>
          </div>
          <div className="tg-header__right-side">
            <div id="sticky-header" className={`tg-header__area tg-header__area-two ${isSticky ? 'sticky-menu' : ''}`}>
              <nav className="tgmenu__nav">
                <div className="logo d-none">
                  <a href="/">
                    <img
                      src={settings?.data?.[0]?.logo} 
                      alt="Logo" 
                       />
                  </a>
                </div>

                <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-lg-flex justify-content-end">
                  <ul className="navigation">
                    {menuItems.map((item, index) => (
                      <li key={index} className={item.subMenu && item.subMenu.length > 0 ? 'menu-item-has-children' : ''}>
                        <a href={item.subMenu && item.subMenu.length > 0 ? '#' : item.link}>
                          {item.label}
                        </a>
                        {item.subMenu && item.subMenu.length > 0 && (
                          <ul className="sub-menu">
                            {item.subMenu.map((subItem, subIndex) => (
                              <li key={subIndex} className={subItem.subMenu && subItem.subMenu.length > 0 ? 'menu-item-has-children' : ''}>
                                <a href={subItem.subMenu && subItem.subMenu.length > 0 ? '#' : subItem.link}>
                                  {subItem.label}
                                </a>
                                {subItem.subMenu && subItem.subMenu.length > 0 && (
                                  <ul className="sub-menu">
                                    {subItem.subMenu.map((thirdItem, thirdIndex) => (
                                      <li key={thirdIndex}>
                                        <a href={thirdItem.link}>{thirdItem.label}</a>
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

      {/* Mobile Menu */}
      <div className={`tgmobile__menu ${isMobileMenuVisible ? 'active' : ''}`}>
        <nav className="tgmobile__menu-box">
          <div className="close-btn" onClick={toggleMobileMenu}>
            <i className="fa fa-times"></i>
          </div>
          <div className="nav-logo">
            <a href="/">
            <img
                      src={settings?.data?.[0]?.logo} 
                      alt="Logo" 
                      style={{ width: '55%', display: 'block' }} />
            </a>
          </div>
          <ul className="navigation">
            {menuItems.map((item, index) => (
              <li key={index} className={item.subMenu && item.subMenu.length > 0 ? 'menu-item-has-children' : ''}>
                <a href={item.subMenu && item.subMenu.length > 0 ? '#' : item.link}>{item.label}</a>
                {item.subMenu && item.subMenu.length > 0 && (
                  <>
                    <div className="dropdown-btn" onClick={() => toggleDropdown(index)} aria-expanded={dropdownStates[index]}>
                      <span className="plus-line"></span>
                    </div>
                    <ul className="sub-menu" style={{ display: dropdownStates[index] ? 'block' : 'none' }}>
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a href={subItem.link}>{subItem.label}</a>
                          {subItem.subMenu && subItem.subMenu.length > 0 && (
                            <ul className="third-level-menu">
                              {subItem.subMenu.map((thirdItem, thirdIndex) => (
                                <li key={thirdIndex}>
                                  <a href={thirdItem.link}>{thirdItem.label}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="tgmobile__menu-bottom">
            <div className="contact-info">
              <ul className="list-wrap">
                <li>
                  <a href="mailto:info@ecoconcern.com.np">info@ecoconcern.com.np</a>
                </li>
                <li>
                  <a href="tel:977-01-5421513">+977-01-5421513</a>
                </li>
              </ul>
            </div>
            <div className="social-links">
              <ul className="list-wrap">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
