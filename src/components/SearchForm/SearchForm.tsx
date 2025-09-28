import { getBrands } from "../../services/carService";
import { useFilterStore } from "../../stores/FilterStore";
import css from "./SearchForm.module.css";
import { useEffect, useState } from "react";
import { priceArray } from "../../constants/prices";
import { useBrandStore } from "../../stores/BrandStore";
import MileageField from "../MileageField/MileageField";

interface SearchFormProps {
  handleSubmit: (formData: FormData) => void;
}

export default function SearchForm({ handleSubmit }: SearchFormProps) {
  const query = useFilterStore((state) => state.query);
  const setQuery = useFilterStore((state) => state.setQuery);

  const [brandSelOpen, setBrandOpen] = useState(false);
  const brandsList = useBrandStore((state) => state.brandsList);
  const setBrandsList = useBrandStore((state) => state.setBrandsList);

  const [priceSelOpen, setPriceOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ? Checks if there's a global state for brandslist already, no need to fetch second time on each page change
    if (brandsList.length > 0) return;
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getBrands();

        setBrandsList(data);
      } catch {
        setError("Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [setBrandsList, brandsList]);

  return (
    <form className={css.form} action={handleSubmit}>
      <ul className={css.queryList}>
        <li className={css.liEl}>
          <p className={css.selectName}>Car brand</p>
          <div className={css.select}>
            <input type="hidden" name="brand" value={query.brand || ""} />
            <button
              className={`${css.brandButton} ${
                brandSelOpen ? css.chevronOpen : ""
              }`}
              type="button"
              onClick={() => setBrandOpen(!brandSelOpen)}
              disabled={loading || !!error}
            >
              <p className={css.buttonText}>
                {loading
                  ? `Loading brands...`
                  : error
                  ? `${error}`
                  : query.brand || "Choose a brand"}
              </p>

              <svg width={16} height={16} className={css.chevron}>
                <use href="/public/icons/sprite.svg#icon-chevron"></use>
              </svg>
            </button>

            {brandSelOpen && (
              <div className={css.dropdown}>
                <ul className={css.dropdownContent}>
                  {brandsList &&
                    brandsList.map((opt) => (
                      <li
                        className={css.dropdownItem}
                        key={opt}
                        onClick={() => {
                          setQuery({ ...query, brand: opt });
                          setBrandOpen(false);
                        }}
                      >
                        {opt}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </li>

        <li className={css.liEl}>
          <p className={css.selectName}>Price/ 1 hour</p>
          <div className={css.select}>
            <input type="hidden" name="price" value={query.rentalPrice || ""} />
            <button
              className={`${css.priceButton} ${
                priceSelOpen ? css.chevronOpen : ""
              }`}
              type="button"
              onClick={() => setPriceOpen(!priceSelOpen)}
            >
              <p className={css.buttonText}>
                {query.rentalPrice || "Choose a price"}
              </p>

              <svg width={16} height={16} className={css.chevron}>
                <use href="/public/icons/sprite.svg#icon-chevron"></use>
              </svg>
            </button>
            {priceSelOpen && (
              <div className={`${css.dropdown} ${css.dropdownPrice}`}>
                <ul
                  className={`${css.dropdownContent} ${css.dropdownContentPrice}`}
                >
                  {priceArray.map((price) => (
                    <li
                      className={css.dropdownItem}
                      key={price}
                      onClick={() => {
                        setQuery({ ...query, rentalPrice: price });
                        setPriceOpen(false);
                      }}
                    >
                      {price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </li>
        <li className={css.liEl}>
          <p className={css.selectName}>Сar mileage / km</p>
          <MileageField />
        </li>
      </ul>
      <button className={css.submitButton} type="submit">
        Search
      </button>
    </form>
  );
}
