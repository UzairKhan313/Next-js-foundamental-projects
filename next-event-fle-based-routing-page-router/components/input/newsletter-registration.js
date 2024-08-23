import { useRef } from "react";
import classes from "./newsletter-registration.module.css";
import { useNotificationContext } from "../../store/notificatinContext";

function NewsletterRegistration() {
  const { showNotification } = useNotificationContext();
  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;

    showNotification({
      title: "Signing up....",
      message: "Registering for newsletter.",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong.");
        });
      })
      .then((data) => {
        showNotification({
          title: "Success",
          message: "Successfully Registere for newsletter",
          status: "success",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error!",
          title: err.message || "Faild to registered for newsletters.",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
