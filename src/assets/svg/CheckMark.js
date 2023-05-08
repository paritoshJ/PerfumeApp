import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS_NEW} from '../../Helper/colors.new';
const CheckMark = props => (
  <Svg width={8} height={7} fill="none" {...props}>
    <Path
      stroke={props.color ?? '#FFF'}
      strokeWidth={1.5}
      d="M1 2.6 3.25 5 7 1"
    />
  </Svg>
);
export default CheckMark;
