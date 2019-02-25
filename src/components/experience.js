import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'

import s from './experience.module.css'

const Experience = ({
  id,
  role,
  organisation,
  location,
  startDate,
  endDate,
  description
}) => (
  <StaticQuery
    query={imageQuery}
    render={({ bodyGlitch, allContentfulExperience }) => (
      <section
        id='experience'
        className={s.experience}
      >
        <div className={s.primaryContent}>
          <h2 className={s.title}>
            Bringing over 15 years experience buildng Web Applications, web sites and digital products.
          </h2>
          <div className={s.thingsCallout}>
            <h3 className={s.thingsCalloutTitle}>Things I'm good at and like doing:</h3>
            <ul className={s.things}>
              <li className={s.thing}>Building <abbr title="Progressive Web Apps">PWAs</abbr> with <a href='https://reactjs.org'>React</a>, <a href='https://pouchdb.com/'>PouchDB</a> and <a href='http://gatsbyjs.org/'>Gatsby</a></li>
              <li className={s.thing}>Building Design Systems &amp; Component libraries with <a href="https://storybook.js.org/">Storybook</a></li>
              <li className={s.thing}><a href='https://jamstack.org/'>JAM Stacks</a></li>
              <li className={s.thing}>Bootstrapping projects &amp; app boilerplate</li>
              <li className={s.thing}>Universal (isomorphic/SSR) rendering</li>
              <li className={s.thing}>Remote work</li>
              <li className={s.thing}>Responsive web design</li>
              <li className={s.thing}>Scaling code bases</li>
              <li className={s.thing}>Code stewardship</li>
              <li className={s.thing}>Functional Programming</li>
              <li className={s.thing}>Dev Tooling &amp; Experience</li>
              <li className={s.thing}>Codifying and improving coding standards</li>
              <li className={s.thing}>Writing documentation</li>
            </ul>
          </div>
        </div>
        <div className={s.secondaryContent}>
          <Img
            fluid={bodyGlitch.childImageSharp.fluid}
          />
          <br/>
          <p className={s.strongText}>With experience at every layer of the stack &amp; specialisation in the front-end I'm well placed to bring value to any team.</p>
          <p className={s.strongText}>
            I thrive in diverse teams, ambitious contexts &amp; fast-paced environments.
          </p>
          <p className={s.strongText}>I like Javscript, CSS, nice people &amp; building great things with them.</p>

          <p className={s.strongText}>For more in depth information feel free to <Link to='#contact'>reach out &amp; contact me</Link> or head over to <a href='https://stackoverflow.com/story/tthew'>StackOverflow to check out my Developer Story</a>.</p>
        </div>
      </section>
    )}
  />
)

const imageQuery = graphql`
  query {
    bodyGlitch: file(relativePath: {eq: "sea-glitch2.png"}) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Experience
