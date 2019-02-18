import { graphql, StaticQuery } from 'gatsby'
import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import RandomImage from './random-image'

import s from './hero.module.css'

const Hero = () => {
  const [shakeEffectState, triggerShakeEffect] = useState(true)
  const [playRandomImage, togglePlayRandomImage] = useState(true)

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
    <StaticQuery
      query={imageQueries}
      render={(data) => {
        return (
          <div className={s.heroWrapper}>
            <section className={s.hero}>
              <div className={s.heroPicWrapper}>
                <RandomImage
                  imageSharpData={data}
                  maxDuration={3000}
                  fluid
                  fadeIn={false}
                  play={playRandomImage}
                />
              </div>
              <h1
                onClick={() => triggerShakeEffect(!shakeEffectState)}
                className={s.heroTitle}
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
                    <span className={s.heroTitleBreak}>Front-end&nbsp;</span>
                    <span className={s.heroTitleBreak}>Web Developer&nbsp;</span>
                    <span className={s.heroTitleBreak}>Berlin</span>
                </animated.div>
              </h1>
              <button
                className={s.heroControl}
                onClick={() => togglePlayRandomImage(!playRandomImage)}
              >{playRandomImage ? 'Glitch: On' : 'Glitch: Off'}</button>
            </section>
          </div>
        )
      }}
    />
  )
}

const imageQueries = graphql`
  query {
    faceGlitch: file(relativePath: {eq: "face-glitch.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid

        }
      }
    }
    faceGlitch1: file(relativePath: {eq: "face-glitch-1.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch2: file(relativePath: {eq: "face-glitch-2.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch3: file(relativePath: {eq: "face-glitch-3.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch4: file(relativePath: {eq: "face-glitch-4.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch5: file(relativePath: {eq: "face-glitch-5.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch6: file(relativePath: {eq: "face-glitch-6.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch7: file(relativePath: {eq: "face-glitch-7.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch8: file(relativePath: {eq: "face-glitch-8.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch9: file(relativePath: {eq: "face-glitch-9.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch10: file(relativePath: {eq: "face-glitch-10.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch11: file(relativePath: {eq: "face-glitch-11.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch12: file(relativePath: {eq: "face-glitch-12.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch13: file(relativePath: {eq: "face-glitch-13.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    faceGlitch14: file(relativePath: {eq: "face-glitch-14.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Hero
