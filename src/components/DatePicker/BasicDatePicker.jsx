import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export default function ResponsiveDateTimePickers({ date, onSubmit }) {
  const [dateTime, setDateTime] = useState(dayjs(date));

  useEffect(() => {
    setDateTime(dayjs(date));
  }, [date]);

  const handleChange = (newDate) => {
    setDateTime(newDate);
    onSubmit(newDate.toDate());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileDateTimePicker"]}>
        <MobileDateTimePicker value={dateTime} onChange={handleChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}
