import React from 'react'
import { Link } from 'gatsby'

import s from './contact-form.module.css'

import githubLogo from '../images/github.svg'
import twitterLogo from '../images/twitter.svg'
import linkedInLogo from '../images/linkedin.svg'

const ContactForm = () => {
  return (
    <section id='contact' className={s.contact}>
      <div className={s.contactContent}>
        <h2 className={s.contactContentTitle}>Get in touch</h2>
        <div className={s.contactBody}>
          <p>I'm currently <Link to='/words/open-for-new-opportunties-beginning-march-2019'>open for new opportunities beginning March 2019</Link>.</p>
          <p>If you think I'd be a good match for a project or if you'd like to reach out for any other reason, I'd love to hear from you.</p>
          <p>You can catch me in all the usual places or feel free to <a href='mailto:hallo@tthew.berlin'>drop me an email</a> or send me a message using the contact form:</p>
          <ul className={s.socialLinks}>
            <li className={s.socialLink}>
              <a
                href='https://github.com/tthew'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img alt='Github' src={githubLogo} />
                <span className={s.socialLinkLabel}>
                  Github
                </span>
              </a>
            </li>
            <li className={s.socialLink}>
              <a
                href='https://www.linkedin.com/in/lucidmoon/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img alt='LinkedIn' src={linkedInLogo} />
                <span className={s.socialLinkLabel}>
                  LinkedIn
                </span>
              </a>
            </li>
            <li className={s.socialLink}>
              <a
                href='https://twitter.com/_tthew'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img alt='Twitter' src={twitterLogo} />
                <span className={s.socialLinkLabel}>
                  Twitter
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <form
        data-netlify={true}
        data-netlify-honeypot='bot-field'
        method='post'
        name='contact'
        className={s.contactForm}
      >
        <div
          className={s.contactFormField}
        >
          <input
            placeholder='Name'
            name='name'
            type='text'
            className={s.contactFormInput}
            required
          />
        </div>
        <div
          className={s.contactFormField}
        >
          <input
            placeholder='Email'
            name='email'
            type='email'
            className={s.contactFormInput}
            required
          />
        </div>
        <div
          className={s.contactFormField}
        >
          <textarea
            name='message'
            placeholder='How can I help?'
            className={s.contactFormInput}
            rows={5}
          />
        </div>

        <input type='hidden' name='form-name' value='contact' />
        <div data-netlify-recaptcha='true'></div>
        <button
          type='submit'
          className={s.contactFormButton}
        >
          Hit me up!
        </button>
      </form>
    </section>
  )
}

export default ContactForm
