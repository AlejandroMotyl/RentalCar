import { useState } from "react";
import css from "./BookingForm.module.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale/en-US";

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const date = formData.get("date") as string;
    const comment = formData.get("comment") as string;
    const email = formData.get("email") as string;


    
    if (!name.trim() || !email.trim()) {
      return alert("Please fill all of the required inputs!");
    }
    alert(`Form submitted: ${name} ${email} ${date} ${comment} `);

    setSelectedDate(null);
  };


  // ? Custom locale for DatePicker
  const customLocale = {
    ...enUS,
    localize: {
      ...enUS.localize,
      day: (n: number) => {
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        return days[n];
      },
    },
  };
  registerLocale("en-custom", customLocale);

  // ? Format for date, only shows date (not exact time)
  const formatISODate = (date: Date) => date.toISOString().split("T")[0];

  return (
    <div className={css.bookingFormWrapper}>
      <h3 className={css.formName}>Book your car now</h3>
      <p className={css.formText}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={css.form} action={handleSubmit}>
        <div className={css.inputsWrapper}>
          <input
            type="text"
            name="name"
            className={css.input}
            placeholder="Name*"
            required
          />
          <input
            name="email"
            type="email"
            className={css.input}
            placeholder="Email*"
            required
          />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            calendarClassName={css.calendar}
            className={css.input}
            locale="en-custom"
            placeholderText="Booking date"
            onKeyDown={(e) => e.preventDefault()}
          />
          <input
            type="hidden" // ? Hidden input for DatePicker
            name="date"
            value={selectedDate ? formatISODate(selectedDate) : ""}
          />
          <textarea
            placeholder="Comment"
            name="comment"
            className={css.comment}
          />
        </div>
        <button type="submit" className={css.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
}
