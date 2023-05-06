import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS_NEW } from "../../Helper/colors.new";
const EditPencilSVG = (props) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.0514 3.73889L15.4576 2.33265C16.0678 1.72245 17.0572 1.72245 17.6674 2.33265C18.2775 2.94284 18.2775 3.93216 17.6674 4.54235L5.69349 16.5162C5.25292 16.9568 4.70953 17.2806 4.11241 17.4585L1.875 18.125L2.54148 15.8876C2.71936 15.2905 3.04321 14.7471 3.48377 14.3065L14.0514 3.73889ZM14.0514 3.73889L16.25 5.93749"
      stroke={props.color ?? "#BC8B57"}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default EditPencilSVG;
