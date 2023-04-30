import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS_NEW } from "../../Helper/colors.new";
const CartBagSVG = (props) => (
  <Svg
    width={49}
    height={48}
    viewBox="0 0 49 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5.30078 7.19995L6.83678 12.32M6.83678 12.32L12.9808 32.8H41.1408V17.44C41.1408 14.6123 38.8485 12.32 36.0208 12.32H6.83678ZM36.0208 43.04C34.6069 43.04 33.4608 41.8938 33.4608 40.48C33.4608 39.0661 34.6069 37.92 36.0208 37.92C37.4346 37.92 38.5808 39.0661 38.5808 40.48C38.5808 41.8938 37.4346 43.04 36.0208 43.04ZM15.5408 40.48C15.5408 39.0661 16.6869 37.92 18.1008 37.92C19.5146 37.92 20.6608 39.0661 20.6608 40.48C20.6608 41.8938 19.5146 43.04 18.1008 43.04C16.6869 43.04 15.5408 41.8938 15.5408 40.48Z"
       stroke={props.color ?? COLORS_NEW.activeButton}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CartBagSVG;
