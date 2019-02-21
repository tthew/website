import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Navigation from './navigation'

import s from './header.module.css'

const Header = ({ siteTitle }) => {
  const [shakeEffectState, triggerShakeEffect] = useState(true)

  const { x } = useSpring({
    from: {
      x: 0
    },
    x: shakeEffectState ? 1 : 0,
    config: {
      duration: 300
    }
  })

  return (
    <header className={s.header}>
      <span
        className={s.headerTitle}
        style={{ margin: 0 }}
        onClick={() => triggerShakeEffect(!shakeEffectState)}
      >
        <animated.div
          style={{
            transform: x
              .interpolate({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
              })
              .interpolate(x => `scale(${x})`)
          }}>
            <Link to='/'>@tthew</Link>
        </animated.div>
      </span>
      <div className={s.navigation}>
        <Navigation />
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
