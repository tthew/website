import { Link } from 'gatsby'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import classnames from 'classnames'

import s from './navigation.module.css'

const NavigationItems = ({
  toggle,
  showMenu,
  animatable,
  onTransitionEnd,
}) => (
  <ul
    className={
      classnames(
        s.navigationItems,
        { [s.visible]: showMenu },
        { [s.animatable]: animatable }
      )
    }
    onTransitionEnd={onTransitionEnd}
  >
    <li className={s.navigationItem}>
      <Link
        to='/#about'
        activeClassName={s.navigationItemActive}
        onClick={() => toggle(!showMenu)}
      >
        About
      </Link>
    </li>
    <li className={s.navigationItem}
    >
      <Link
        to='/#experience'
        activeClassName={s.navigationItemActive}
        onClick={() => toggle(!showMenu)}
      >
        Experience
      </Link>
    </li>
    <li className={s.navigationItem}>
      <Link
        to='/words/'
        getProps={({ isPartiallyCurrent }) => isPartiallyCurrent ? { className: s.navigationItemActive } : null    }
        onClick={() => toggle(!showMenu)}
      >
        Words
      </Link>
    </li>
    <li className={s.navigationItem}>
      <Link
        to='/#contact'
        activeClassName={s.navigaionItemActive}
        onClick={() => toggle(!showMenu)}
      >
        Contact
      </Link>
    </li>
  </ul>
)

const Navigation = ({ mobileMenuBreakpoint = 800 }) => {
  const [showMenu, toggle] = useState(false)
  const [animatable, setAnimatable] = useState(false)
  const [renderPortal, toggleCreatePortal] = useState(window.innerWidth < mobileMenuBreakpoint)
  const [portalContainer, setPortalContainer] = useState(document.getElementById('mobile-nav-container'))

  const handleResize = () => {
    if (window.innerWidth < mobileMenuBreakpoint) {
      return toggleCreatePortal(true)
    }
    return toggleCreatePortal(false)
  }

  useEffect(() => {
    setPortalContainer(document.getElementById('mobile-nav-container'))
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleTransitionEnd = () => {
    setAnimatable(false)
  }

  return (
    <div
      className={
        classnames(
          s.navigation,
          { [s.visible]: showMenu }
        )
      }
    >
      <div
        className={s.hamburger}
        onClick={() => {
          setAnimatable(true)
          toggle(!showMenu)
        }}
      >
        <span className={s.hamburgerLine} />
        <span className={s.hamburgerLine} />
        <span className={s.hamburgerLine} />
      </div>
      {renderPortal && portalContainer && (
        createPortal(
          <NavigationItems
            toggle={toggle}
            showMenu={showMenu}
            animatable={animatable}
            onTransitionEnd={handleTransitionEnd}
          />,
          portalContainer
        )
      )}
      {!renderPortal && (
        <NavigationItems
          toggle={toggle}
          showMenu={showMenu}
        />
      )}
    </div>
  )
}

export default Navigation
