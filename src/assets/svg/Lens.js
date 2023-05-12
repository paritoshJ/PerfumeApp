import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Lens = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <Path
      stroke="#2B2826"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m16.5 16.5-4.33-4.33m0 0A6.25 6.25 0 1 0 3.33 3.33a6.25 6.25 0 0 0 8.838 8.838Z"
    />
  </Svg>
);
export default Lens;
