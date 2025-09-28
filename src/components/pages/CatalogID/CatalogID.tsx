import css from "./CatalogID.module.css";
import { getCarById } from "../../../services/carService";
import { useParams } from "react-router-dom";
import formatAddress from "../../../services/addressService";
import BookingForm from "../../BookingForm/BookingForm";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import type Car from "../../../types/Car";

export default function CatalogID() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      setLoading(true);
      setError(null);

      try {
        const car = await getCarById(id);
        setCar(car);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        car && (
          <div className={css.container}>
            <div className={css.formWrapper}>
              <img
                className={css.image}
                src={car.img}
                alt={car.description}
                width={640}
                height={512}
                loading="lazy"
              />
              <BookingForm />
            </div>
            <div className={css.detailsWrapper}>
              <div className={css.nameWrapper}>
                <h2 className={css.name}>
                  {car.brand} {car.model}, {car.year}
                  <span className={css.nameId}> id: {car.id}</span>
                </h2>
                <p className={css.address}>
                  <svg width={16} height={16}>
                    <use href="/icons/sprite.svg#icon-Location"></use>
                  </svg>
                  {formatAddress(car.address)}
                  <span className={css.mileage}>
                    Mileage:
                    {Number(car.mileage).toLocaleString().replace(/,/g, " ")} km
                  </span>
                </p>
                <p className={css.rentalPrice}>${car.rentalPrice}</p>
                <p className={css.description}> {car.description}</p>
              </div>
              <div className={css.lists}>
                <div>
                  <h3 className={css.listTitle}>Rental Conditions:</h3>
                  <ul className={css.list}>
                    {car.rentalConditions.map((condition) => (
                      <li key={condition} className={css.listItem}>
                        <svg width={16} height={16} className={css.checkIcon}>
                          <use href="/icons/sprite.svg#icon-check-circle"></use>
                        </svg>
                        <p>{condition}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className={css.listTitle}>Car Specifications:</h3>
                  <ul className={css.list}>
                    <li className={css.listItem}>
                      <svg width={16} height={16}>
                        <use href="/icons/sprite.svg#icon-calendar"></use>
                      </svg>
                      <p>Year: {car.year}</p>
                    </li>
                    <li className={css.listItem}>
                      <svg width={16} height={16}>
                        <use href="/icons/sprite.svg#icon-car"></use>
                      </svg>
                      <p>Type: {car.type}</p>
                    </li>
                    <li className={css.listItem}>
                      <svg width={16} height={16}>
                        <use href="/icons/sprite.svg#icon-fuel-pump"></use>
                      </svg>
                      <p>Fuel Consumption: {car.fuelConsumption} </p>
                    </li>

                    <li className={css.listItem}>
                      <svg width={16} height={16}>
                        <use href="/icons/sprite.svg#icon-gear"></use>
                      </svg>
                      <p> Engine Size: {car.engineSize}</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className={css.listTitle}>
                    Accessories and functionalities:
                  </h3>
                  <ul className={css.list}>
                    {car.accessories.map((accessory) => (
                      <li key={accessory} className={css.listItem}>
                        <svg width={16} height={16}>
                          <use href="/icons/sprite.svg#icon-check-circle"></use>
                        </svg>
                        <p>{accessory}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
