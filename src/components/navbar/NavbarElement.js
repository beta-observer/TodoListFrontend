import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrightThemeContext } from '../../utils/contexts'


export default ({link, icon, content, sideMenu}) => {
  return(
    <BrightThemeContext.Consumer>
      {theme =>
        <li 
          id={
            sideMenu
              ? 'SideMenuNavbarOption' 
              : 'navbarOption'
          }
          className={
            sideMenu
              ? theme
                ? 'BrightSideMenuNavbarOption'
                : 'DarkSideMenuNavbarOption'
              : ''
          }
        >
          <Link 
            to={link} 
            id="link"
            className={link === window.location.pathname? 'ActiveNavbarOption' : ''}
          >
            <div>
              <FontAwesomeIcon icon={icon} 
                id={
                  sideMenu
                    ? 'SideMenuNavbarOptionIcon'
                    : 'navbarOptionIcon'
                } 
                className={
                  link !== window.location.pathname
                    ? theme
                      ? 'BrightNavbarIcon'
                      : 'DarkNavbarIcon'
                    : ''
              }/>
              <p
                id={
                  sideMenu
                    ? 'SideMenuNavbarOptionText'
                    : 'navbarOptionText'
                }
                className={
                  link !== window.location.pathname
                    ? theme
                      ? 'BrightNavbarOptionText'
                      : 'DarkNavbarOptionText'
                    : ''
               }
              >
                {content}
              </p>
            </div>
          </Link>
        </li>
      }
    </BrightThemeContext.Consumer>
  )
}