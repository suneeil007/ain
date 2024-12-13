import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({});

  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => !prev);
  };

  const toggleDropdown = (menuIndex) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [menuIndex]: !prevState[menuIndex],
    }));
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

  const menuItems = [
    { label: 'Home', link: '#' },
    {
      label: 'About Us',
      link: '#',
      subMenu: [
        { label: 'Introduction', link: '#' },
        { label: 'Our Team', link: '#' },
        { label: 'Organization Structure', link: '#' },
        { label: 'Clients/Partners', link: '#' },
      ],
    },
    { label: 'Services', link: '#' },
    { label: 'Our Products', link: '#' },
    { label: 'Our Projects', link: '#' },
    { label: 'News & Events', link: '#' },
    {
      label: 'Gallery',
      link: '#',
      subMenu: [
        { label: 'Photos', link: '#' },
        { label: 'Videos', link: '#' },
      ],
    },
    { label: 'Contact', link: '#' },
  ];

  return (
    <header className="tg-header__style-two">
      <div className="container">
        <div className="tg-header__inner-wrap">
          <div className="tg-header__logo-wrap">
            <div className="logo">
              <a href="#">
                <img
                  src="https://ain.org.np/public/images/logo.png"
                  alt="AIN Logo"
                  style={{ width: '100%', display: 'block' }}
                />
              </a>
            </div>
          </div>
          <div className="tg-header__right-side">
            <div id="sticky-header" className="tg-header__area tg-header__area-two">
              <nav className="tgmenu__nav">
                <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-lg-flex justify-content-end">
                  <ul className="navigation">
                    {menuItems.map((item, index) => (
                      <li
                        key={index}
                        className={item.subMenu ? 'menu-item-has-children' : ''}
                      >
                        <a href={item.link}>{item.label}</a>
                        {item.subMenu && (
                          <>
                            <ul className="sub-menu">
                              {item.subMenu.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <a href={subItem.link}>{subItem.label}</a>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="logo d-none">
                <a href="#">
                  <img 
                    src="https://ain.org.np/public/images/logo.png" 
                    alt="Logo" 
                  />
                </a>
              </div>
                <div
                  className="mobile-nav-toggler mobile-nav-toggler-two"
                  onClick={toggleMobileMenu}
                >
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
            <a href="#">
              <img
                src="https://ain.org.np/public/images/logo.png"
                alt="Logo"
              />
            </a>
          </div>
          <ul className="navigation">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={item.subMenu ? 'menu-item-has-children' : ''}
              >
                <a href={item.link}>{item.label}</a>
                {item.subMenu && (
                  <>
                    <div
                      className="dropdown-btn"
                      onClick={() => toggleDropdown(index)}
                      aria-expanded={dropdownStates[index]}
                    >
                      <span className="plus-line"></span>
                    </div>
                    <ul
                      className="sub-menu"
                      style={{ display: dropdownStates[index] ? 'block' : 'none' }}
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a href={subItem.link}>{subItem.label}</a>
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
        <div
          className={`tgmobile__menu-backdrop ${isMobileMenuVisible ? 'visible' : ''}`}
          onClick={toggleMobileMenu}
        ></div>
      </div>
    </header>
  );
};

export default Header;
