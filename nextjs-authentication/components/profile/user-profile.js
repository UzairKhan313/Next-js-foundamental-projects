// import { useSession } from "next-auth/react";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  // const { status } = useSession();

  // if (status === "loading") {
  //   return <h3 className={classes.profile}>loading....</h3>;
  // }

  // if (status === "unauthenticated" && !session) {
  //   window.location.href = "/auth";
  //   return null;
  // }
  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      // Error
      console.error("Error:", data.message || "Something went wrong.");
      return;
    }
    console.log(data);
  };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
