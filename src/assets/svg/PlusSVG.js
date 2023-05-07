import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS_NEW } from "../../Helper/colors.new";
const PlusSVG = (props) => (
  <Svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.5 3.75V16.25M16.75 10L4.25 10"
      stroke={props.color ?? "#2B2826"}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PlusSVG;
