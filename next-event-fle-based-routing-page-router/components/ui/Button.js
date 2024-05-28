import Link from "next/link";
import classess from "./button.module.css";

const Button = ({ children, link }) => {
  return (
    <Link href={link}>
      <button className={classess.btn}>{children}</button>
    </Link>
  );
};

export default Button;
