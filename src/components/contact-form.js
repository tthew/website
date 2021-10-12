import React from "react";
import githubLogo from "../images/github.svg";
import linkedInLogo from "../images/linkedin.svg";
import twitterLogo from "../images/twitter.svg";
import s from "./contact-form.module.css";
//
const ContactForm = () => {
  return (
    <section id="contact" className={s.contact}>
      <div className={s.contactContent}>
        <h2 className={s.contactContentTitle}>Get in touch</h2>
        <div className={s.contactBody}>
          <p>I'm currently open for new opportunties.</p>
          <p>If you'd like to reach out, I'd love to hear from you.</p>
          <p>
            You can catch me in all the usual places. Feel free to send me a
            message using the contact form or alternatively{" "}
            <a href="mailto:hallo@tthew.berlin">drop me an email</a>.
          </p>
          <ul className={s.socialLinks}>
            <li className={s.socialLink}>
              <a
                href="https://github.com/tthew"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt="Github" src={githubLogo} />
                <span className={s.socialLinkLabel}>Github</span>
              </a>
            </li>
            <li className={s.socialLink}>
              <a
                href="https://www.linkedin.com/in/lucidmoon/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt="LinkedIn" src={linkedInLogo} />
                <span className={s.socialLinkLabel}>LinkedIn</span>
              </a>
            </li>
            <li className={s.socialLink}>
              <a
                href="https://twitter.com/_tthew"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt="Twitter" src={twitterLogo} />
                <span className={s.socialLinkLabel}>Twitter</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <form
        data-netlify={true}
        data-netlify-honeypot="username"
        method="post"
        name="contact"
        className={s.contactForm}
      >
        <input
          name="username"
          className={s.contactFormUsername} // This is a honeypot field
          style={{ position: "absolute", visibility: "hidden" }}
        />
        <div className={s.contactFormField}>
          <label
            htmlFor="contact-form-field__name"
            className={s.contactFormFieldLabel}
          >
            Name
          </label>

          <input
            id="contact-form-field__name"
            placeholder="Name"
            name="name"
            type="text"
            className={s.contactFormInput}
            required
          />
        </div>
        <div className={s.contactFormField}>
          <label
            htmlFor="contact-form-field__email"
            className={s.contactFormFieldLabel}
          >
            Email
          </label>
          <input
            id="contact-form-field__email"
            placeholder="Email"
            name="email"
            type="email"
            className={s.contactFormInput}
            required
          />
        </div>
        <div className={s.contactFormField}>
          <label
            htmlFor="contact-form-field__message"
            className={s.contactFormFieldLabel}
          >
            Message
          </label>
          <textarea
            id="contact-form-field__message"
            name="message"
            placeholder="How can I help?"
            className={s.contactFormInput}
            rows={5}
          />
        </div>

        <input type="hidden" name="form-name" value="contact" />
        <button type="submit" className={s.contactFormButton}>
          Hit me up!
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
