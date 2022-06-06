import { atom } from "recoil";

const DateFilterStatus = atom({
  key: "DateFilterStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default DateFilterStatus;
