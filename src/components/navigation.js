import { Link } from 'gatsby'
import React, { useState } from 'react'
import classnames from 'classnames'

import s from './navigation.module.css'

const Navigation = () => {
  const [showMenu, toggle] = useState(false)

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
        aria-hidden
        className={s.hamburger}
        onClick={() => toggle(!showMenu)}
      >
        <span className={s.hamburgerLine} />
        <span className={s.hamburgerLine} />
        <span className={s.hamburgerLine} />
      </div>
      <p
        className={s.skipToContent}
      >
        <a
          href='#main'
        >
          Skip to main content
        </a>
      </p>

      <nav
        role="navigation"
        aria-label="Main navigation"
      >
        <ul
          className={s.navigationItems}
        >
          <li className={s.navigationItem}>
            <a
              href='/#about'
              onClick={() => toggle(!showMenu)}
            >
              About
            </a>
          </li>
          <li className={s.navigationItem}>
            <a
              href='/#experience'
              onClick={() => toggle(!showMenu)}
            >
              Experience
            </a>
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
            <a
              href='/#contact'
              onClick={() => toggle(!showMenu)}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
