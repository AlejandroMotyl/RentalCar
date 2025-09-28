import { useEffect, useState } from "react";
import css from "./MileageField.module.css";
import { useFilterStore } from "../../stores/FilterStore";

export default function MileageField() {
  const query = useFilterStore((state) => state.query);
  const setQuery = useFilterStore((state) => state.setQuery);

  const [mileage, setMileage] = useState({
    min: query.minMileage ? Number(query.minMileage).toLocaleString() : "",
    max: query.maxMileage ? Number(query.maxMileage).toLocaleString() : "",
  });

  useEffect(() => {
    setMileage({
      min: query.minMileage ? Number(query.minMileage).toLocaleString() : "",
      max: query.maxMileage ? Number(query.maxMileage).toLocaleString() : "",
    });
  }, [query.minMileage, query.maxMileage]);

  // ? Makes sure that user can only input valid mileage and saves it in global state
  const handleMileageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "min" | "max"
  ) => {
    const input = e.target.value.replace(/,/g, "");
    let num = parseInt(input, 10);

    if (isNaN(num)) {
      setMileage((prev) => ({ ...prev, [field]: "" }));
      setQuery({ ...query, [`${field}Mileage`]: "" });
      return;
    }

    if (num > 10000) num = 10000;

    const formatted = num.toLocaleString();
    setMileage((prev) => ({ ...prev, [field]: formatted }));
    setQuery({ ...query, [`${field}Mileage`]: String(num) });
  };

  return (
    <fieldset className={css.mileageFieldset}>
      <label className={css.mileageLabel}>
        From &nbsp;
        <input
          className={css.mileageInput}
          type="text"
          name="minMileage"
          value={mileage.min}
          onChange={(e) => handleMileageChange(e, "min")}
        />
      </label>
      <label className={css.mileageLabel}>
        To &nbsp;
        <input
          className={css.mileageInput}
          onChange={(e) => handleMileageChange(e, "max")}
          value={mileage.max}
          type="text"
          name="maxMileage"
        />
      </label>
    </fieldset>
  );
}
