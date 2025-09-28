import css from "./CarList.module.css";
import type Car from "../../types/Car";
import { Link } from "react-router-dom";
import formatAddress from "../../services/addressService";
import { useFavoritesStore } from "../../stores/FavoritesStore";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  return (
    <ul className={css.carsList}>
      {cars &&
        cars.map((car) => (
          <li key={car.id} className={css.carsItem}>
            <div className={css.imgWrapper}>
              <img
                width={276}
                height={268}
                alt={car.description}
                src={car.img}
                className={css.carImg}
                loading="lazy"
              />
              <button
                type="button"
                className={css.favoriteButton}
                onClick={() => {
                  if (favorites.includes(car.id)) {
                    removeFavorite(car.id);
                  } else {
                    addFavorite(car.id);
                  }
                }}
              >
                <svg
                  width={16}
                  height={16}
                  className={`${css.favoriteIcon} ${
                    favorites.includes(car.id) ? css.isFavorite : ""
                  }`}
                >
                  <use href="/icons/sprite.svg#icon-Heart"></use>
                </svg>
              </button>
            </div>
            <div className={css.carNameWrapper}>
              <h2 className={css.carName}>
                {car.brand} <span className={css.carNameSpan}>{car.model}</span>
                , {car.year}
              </h2>
              <p className={css.carPrice}>${car.rentalPrice}</p>
            </div>
            <p className={css.carAddress}>
              {formatAddress(car.address)} | {car.rentalCompany} |
            </p>
            <p className={css.carDetails}>
              {car.type} |{" "}
              {Number(car.mileage).toLocaleString().replace(/,/g, " ")} km
            </p>
            <Link className={css.readMore} to={`/catalog/${car.id}`}>
              Read more
            </Link>
          </li>
        ))}
    </ul>
  );
}
