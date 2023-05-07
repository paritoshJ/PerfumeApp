import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ArrowRightGray = props => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke={props.color ?? '#C8C8C8'}
      strokeWidth={1.25}
      d="M6.25 2.5a25.892 25.892 0 0 0 8.24 7.217L15 10l-.51.283A25.891 25.891 0 0 0 6.25 17.5"
    />
  </Svg>
);
export default ArrowRightGray;
