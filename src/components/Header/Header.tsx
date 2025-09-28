import { Link } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <Link className={css.navLogo} to="/">
          <svg width="104" height="16">
            <use href="/public/Logo.svg"></use>
          </svg>
        </Link>
        <ul className={css.navList}>
          <li className={css.navListEl}>
            <Link className={css.navLink} to="/">
              Home
            </Link>
          </li>

          <li className={css.navListEl}>
            <Link className={css.navLink} to="/catalog">
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
