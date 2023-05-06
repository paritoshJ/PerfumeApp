import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS_NEW } from "../../Helper/colors.new";
const CheckedRadioSVG = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
      fill={props.color ?? "#BC8B57"}
    />
    <Path
      d="M5.5 10.25L8.75 13.25L14.5 6.75"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CheckedRadioSVG;
