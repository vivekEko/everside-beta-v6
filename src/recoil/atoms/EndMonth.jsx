import { atom } from "recoil";
import { monthnameList } from "../../utils/MonthNames";

const endMonthValue = atom({
  key: "endMonthValue", // unique ID (with respect to other atoms/selectors)
  default: 5, // default value (aka initial value)
});

export default endMonthValue;
