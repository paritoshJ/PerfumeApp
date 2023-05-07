import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS_NEW } from "../../Helper/colors.new";
const AddressBookSVG = (props) => (
  <Svg
    width={49}
    height={48}
    viewBox="0 0 49 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M30.5 18H38M30.5 24H38M30.5 30H38M9.5 39H39.5C41.9853 39 44 36.9853 44 34.5V13.5C44 11.0147 41.9853 9 39.5 9H9.5C7.01472 9 5 11.0147 5 13.5V34.5C5 36.9853 7.01472 39 9.5 39ZM21.5 18.75C21.5 20.8211 19.8211 22.5 17.75 22.5C15.6789 22.5 14 20.8211 14 18.75C14 16.6789 15.6789 15 17.75 15C19.8211 15 21.5 16.6789 21.5 18.75ZM24.0877 31.4227C22.1979 32.4295 20.0404 33 17.7497 33C15.459 33 13.3015 32.4295 11.4116 31.4227C12.3597 28.8415 14.8397 27 17.7497 27C20.6597 27 23.1396 28.8415 24.0877 31.4227Z"
      stroke={props.color ?? "#BC8B57"}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AddressBookSVG;
