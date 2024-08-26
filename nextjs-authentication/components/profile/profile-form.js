import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm({ onChangePassword }) {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const newPassword = newPasswordInputRef.current.value;
    const oldPassword = oldPasswordInputRef.current.value;
    onChangePassword({ newPassword, oldPassword });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
          required
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          ref={oldPasswordInputRef}
          required
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
