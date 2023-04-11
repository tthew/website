
import React from 'react'
import { Link } from 'gatsby'

import s from './footer.module.css'

import ContactForm from './contact-form'

const Footer = () => (
  <>
    <ContactForm />
    <footer className={s.footer}>
      <ul className={s.links}>
        <li className={s.link}>
          <Link to='/impressum'>
            Impressum
          </Link>
        </li>
        <li className={s.link}>
          <Link to='/license'>
            License
          </Link>
        </li>
        <li className={s.link}>
          <Link to='/privacy-gdpr'>
          Privacy &amp; GDPR
          </Link>
        </li>
        <li className={s.link}>
          <Link to='/terms'>
            Terms
          </Link>
        </li>
      </ul>
    </footer>
  </>
)

export default Footer
