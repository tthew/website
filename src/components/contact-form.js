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
          <p>You can catch me in all the usual places. Feel free to reach out. You can also send me a message using the contact form or alternatively <a href='mailto:hallo@tthew.berlin'>drop me an email</a>.</p>
          <ul className={s.socialLinks}>
            <li className={s.socialLink}>
              <a
                href='https://github.com/tthew'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img alt='Github' src={githubLogo} alt='' />
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
                <img alt='LinkedIn' src={linkedInLogo} alt='' />
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
                <img alt='Twitter' src={twitterLogo} alt='' />
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
          <label
            htmlFor='contact-form-field__name'
            className={s.contactFormFieldLabel}
          >
            Name
          </label>
          <input
            id='contact-form-field__name'
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
          <label
            htmlFor='contact-form-field__email'
            className={s.contactFormFieldLabel}
          >
            Email
          </label>
          <input
            id='contact-form-field__email'
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
          <label
            htmlFor='contact-form-field__message'
            className={s.contactFormFieldLabel}
          >
            Message
          </label>
          <textarea
            id='contact-form-field__message'
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
