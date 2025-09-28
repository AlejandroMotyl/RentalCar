import { Link } from "react-router-dom";
import css from "./Home.module.css";

export default function Home() {
  return (
    <div className={css.heroBanner}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <h2 className={css.subTitle}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <Link className={css.link} to="/catalog">
        View Catalog
      </Link>
    </div>
  );
}
