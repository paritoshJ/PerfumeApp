import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS_NEW } from "../../Helper/colors.new";
const ArrowRightSVG = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.7866 3.75V3.75C12.4338 6.22089 14.5949 8.30723 17.1222 9.86658L17.3384 10M17.3384 10L2.66158 10M17.3384 10L17.1222 10.1334C14.5949 11.6928 12.4338 13.7791 10.7866 16.25V16.25"
      stroke={props.color ?? "#C0BBB7"}
      strokeWidth={1.25}
    />
  </Svg>
);
export default ArrowRightSVG;
