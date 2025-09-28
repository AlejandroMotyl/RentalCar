import SearchForm from "../../SearchForm/SearchForm";
import css from "./Catalog.module.css";
import { getCars } from "../../../services/carService";
import { useEffect, useState } from "react";
import CarList from "../../CarList/CarList";
import { useCarStore } from "../../../stores/CarStore";
import type GetCarsQuery from "../../../types/CarsQuery";
import Loader from "../../Loader/Loader";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import NoCarsMessage from "../../NoNotesMessage/NoCarsMessage";

export default function Catalog() {
  const cars = useCarStore((state) => state.cars);
  const setCars = useCarStore((state) => state.setCars);

  const fetchedPages = useCarStore((state) => state.fetchedPages);
  const setFetchedPages = useCarStore((state) => state.setFetchedPages);

  const totalPages = useCarStore((state) => state.totalPages);
  const setTotalPages = useCarStore((state) => state.setTotalPages);

  const [fetchState, setFetchState] = useState({
    query: {} as GetCarsQuery,
    nextPage: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const { query, nextPage } = fetchState;
    // ? Wont send fetch if nextpage is bigger than total amount of pages
    if (totalPages > 0 && nextPage > totalPages) return;
    if (fetchedPages.includes(nextPage)) return;

    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCars({ ...query, page: nextPage.toString() });

        setCars((prev) => [...prev, ...data.cars]);
        setTotalPages(data.totalPages);
        setFetchedPages((prev) => [...prev, nextPage]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [fetchState, totalPages, setCars, setFetchedPages, setTotalPages]);  


  // ? Helper function for mileage numbers, turns them into proper format for sending fetch. 
  const normalizeNumber = (value: FormDataEntryValue | null) =>
    value ? String(value).replace(/,/g, "") : "";

  const handleSubmit = (formData: FormData) => {
    const newQuery = {
      brand: formData.get("brand") as string,
      rentalPrice: formData.get("price") as string,
      minMileage: normalizeNumber(formData.get("minMileage")),
      maxMileage: normalizeNumber(formData.get("maxMileage")),
    };

    setCars([]);
    setFetchedPages([]);
    setFetchState({
      query: newQuery,
      nextPage: 1,
    });
  };

  return (
    <div className={css.container}>
      <SearchForm handleSubmit={handleSubmit} />

      {loading && cars.length === 0 ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : cars.length === 0 ? (
        <NoCarsMessage />
      ) : (
        <>
          <CarList cars={cars} />
          <button
            className={`${css.loadButton} ${
              totalPages <= 1 || Math.max(...fetchedPages) === totalPages
                ? css.hideLoad
                : ""
            }`}
            onClick={() => {
              if (loading) return;
              setFetchState((prev) => ({
                ...prev,
                nextPage:
                  fetchedPages.length > 0 ? Math.max(...fetchedPages) + 1 : 1,
              }));
            }}
          >
            {`${loading ? "Loading..." : "Load more"}`}
          </button>
        </>
      )}
    </div>
  );
}
