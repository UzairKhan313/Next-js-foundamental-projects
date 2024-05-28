import Link from "next/link";
import classess from "./button.module.css";

const Button = ({ children, link, onClick }) => {
  if (link) {
    return (
      <Link href={link}>
        <button className={classess.btn}>{children}</button>
      </Link>
    );
  }

  return (
    <button className={classess.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
