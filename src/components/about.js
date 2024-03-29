import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'

import RandomImage from './random-image'

import s from './about.module.css'

const About = () => {
  return (
    <StaticQuery
      query={imageQueries}
      render={data => (
        <section id='about' className={s.about}>
          <div className={s.aboutContent}>
            <h2 className={s.aboutTitle}>
              I'm Matt. A Senior{" "}
              <span style={{ whiteSpace: "nowrap" }}>Full Stack</span>{" "}
              Developer. I've been building &amp; designing for the web since
              the early <em>Naughties</em>.
            </h2>
            <div className={s.aboutBody}>
              <p>
                I cut my teeth building table based layouts with CGI backends as
                a teenager in the late 90s.
              </p>
              <p>
                Ever since I've been on a journey of continual self-learning,
                re-learning &amp; iteration.
              </p>
              <p>
                Fast forward the best part of two decades and you'll find me
                building &amp; helping teams to build{" "}
                <abbr title="Progressive Web Applications">PWAs</abbr>,{" "}
                <em>web sites</em>, mobile &amp; web apps with modern Javascript
                stacks &amp; best practice with tools like{" "}
                <a href="https://nodejs.org">Node</a>,{" "}
                <a href="https://webpack.com">Webpack</a>,{" "}
                <a href="http://reactjs.org">React</a>,{" "}
                <a href="https://graphql.org/">GraphQL</a>,{" "}
                <a href="https://www.postgresql.org/">PostgresSQL</a>,{" "}
                <a href="https://storybook.js.org/">Storybook</a> &amp;{" "}
                <a href="https://www.gatsbyjs.org/">Gatsby</a>.
              </p>
              <p>
                I've had a wide exposure to an array of technologies and
                methodologies over the years, having worked for Software Houses,
                Creative &amp; Digital Agencies, Startups, &amp; NGOs as well as
                running my own businesses.
              </p>
              <p>
                I have an eye for detail and an appreciation for aesthetics
                &amp; try my best to apply design thinking to all areas of my
                work.
              </p>
              <p>
                <strong>
                  Sounds interesting? I'd love to{" "}
                  <Link to="#contact">hear from you</Link>.
                </strong>
              </p>
            </div>
          </div>
          <div
            aria-hidden
            className={s.aboutContentSecondary}
          >
            <figure
              className={s.aboutContentFigure}
            >
              <div className={s.aboutContentFigureMain}>
                <RandomImage
                  imageSharpData={data}
                  fluid
                />
              </div>
              <div className={s.aboutContentFigureSecondary}>
                <RandomImage
                  imageSharpData={data}
                  fluid
                />
              </div>
              <div className={s.aboutContentFigureSecondary}>
                <RandomImage
                  imageSharpData={data}
                  fluid
                />
              </div>
              <figcaption className={s.aboutContentFigureCaption}><em>fig. 1</em> &nbsp; A collection of glitchy comps.</figcaption>
            </figure>
          </div>
        </section>
      )}
    />
  )
}

const imageQueries = graphql`
  query {
    glitchImage5: file(relativePath: {eq: "sky-glitch-1.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    glitchImage6: file(relativePath: {eq: "sky-glitch-2.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    glitchImage7: file(relativePath: {eq: "sky-glitch-3.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    glitchImage8: file(relativePath: {eq: "sky-glitch-4.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    glitchImage9: file(relativePath: {eq: "sky-glitch-5.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    glitchImage10: file(relativePath: {eq: "sky-glitch-6.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default About
