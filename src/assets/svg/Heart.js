import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS_NEW } from "../../Helper/colors.new";
const HeartSVG = props => (
  <Svg
    width={49}
    height={48}
    viewBox="0 0 49 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M42.5 16.5C42.5 11.5294 38.3027 7.5 33.125 7.5C29.2538 7.5 25.9306 9.75256 24.5 12.9668C23.0694 9.75256 19.7462 7.5 15.875 7.5C10.6973 7.5 6.5 11.5294 6.5 16.5C6.5 30.9411 24.5 40.5 24.5 40.5C24.5 40.5 42.5 30.9411 42.5 16.5Z"
      stroke={props.color ?? COLORS_NEW.activeButton}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default HeartSVG;
