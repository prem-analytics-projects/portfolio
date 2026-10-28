import { useState } from "react";
import styles from "./contacts.module.css";

// Simple email pattern: something@something.xx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Takes the form values and returns an object of error messages.
// No error for a field = the field is valid.
function validate(values) {
  const errors = {};

  if (!values.phone) {
    errors.phone = "Contact number is required.";
  } else if (values.phone.length < 10) {
    errors.phone = `Mobile number must be exactly 10 digits (you entered ${values.phone.length}).`;
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  // comments is optional, so no check
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState({ phone: "", email: "", comments: "" });
  const [touched, setTouched] = useState({ phone: false, email: false });
  const [attempted, setAttempted] = useState(false); // clicked Submit at least once
  const [sent, setSent] = useState(false);

  // Recalculated on every render, so it is always up to date
  const errors = validate(values);

  // Show an error only after the user left the field or tried to submit
  const showError = (field) => (touched[field] || attempted) && errors[field];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSent(false);

    // Phone: keep digits only and stop at 10 characters
    if (name === "phone") {
      setValues({ ...values, phone: value.replace(/\D/g, "").slice(0, 10) });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading
    setAttempted(true);

    if (Object.keys(errors).length > 0) return; // stop if any error

    // TODO: send the data somewhere (see the note below)
    console.log("Form data:", values);

    setSent(true);
    setValues({ phone: "", email: "", comments: "" });
    setTouched({ phone: false, email: false });
    setAttempted(false);
  };

  return (
    <section className={styles.contact} id={styles.contact}>
      <h2 className={styles.contact__heading}>Contact</h2>
      <p className={styles.contact__sub}>Let us talk</p>

      {/* noValidate turns off the browser's own popups so ours show instead */}
      <form className={styles.contact__form} onSubmit={handleSubmit} noValidate>
        <div className={styles.contact__field}>
          <label htmlFor="phone">Contact number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError("phone") ? "invalid" : ""}
            aria-invalid={!!showError("phone")}
          />
          {showError("phone") && (
            <p className={styles.contact__error} role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className={styles.contact__field}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError("email") ? "invalid" : ""}
            aria-invalid={!!showError("email")}
          />
          {showError("email") && (
            <p className={styles.contact__error} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className={styles.contact__field}>
          <label htmlFor="comments">
            Comments{" "}
            <span className={styles.contact__optional}>(optional)</span>
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={4}
            maxLength={500}
            placeholder="Write your message"
            value={values.comments}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.contact__btn}>
          Submit
        </button>

        {sent && (
          <p className={styles.contact__success} role="status">
            Thank you! Your message was sent.
          </p>
        )}
      </form>
    </section>
  );
}
