import css from "./ErrorMessage.module.css";
interface ErrorMessageProps {
  error?: Error | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <p className={css.text}>
      There was an error {error?.message ? `(${error.message})` : ""}, please
      try again...
    </p>
  );
}
