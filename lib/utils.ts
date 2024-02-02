import { VALUE_TYPE } from "./constants";

export const getValueByType = (value: number, type: VALUE_TYPE): string => {
  switch (type) {
    case VALUE_TYPE.INTEGER:
      return value.toFixed(0);
    case VALUE_TYPE.FLOAT:
      return value.toFixed(1);
    case VALUE_TYPE.MEGABYTES:
      return `${(value / 1024 / 1024).toFixed(2)} MB`;
    case VALUE_TYPE.INTL:
      return Intl.NumberFormat().format(value);
    default:
      return `${value}`;
  }
};
