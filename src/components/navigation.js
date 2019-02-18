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
        className={s.hamburger}
        onClick={() => toggle(!showMenu)}
      >
        <span className={s.hamburgerLine} />
        <span className={s.hamburgerLine} />
        <span className={s.hamburgerLine} />
      </div>
      <ul
        className={s.navigationItems}
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
    </div>
  )
}

export default Navigation
