import css from "./NoCarsMessage.module.css";
export default function NoCarsMessage() {
  return (
    <p className={css.text}>No results here, please try different search...</p>
  );
}
