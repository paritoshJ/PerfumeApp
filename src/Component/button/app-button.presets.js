import {COLORS_NEW} from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';

/**
 * All text will start off looking like this.
 */
const BASE_VIEW = {
  paddingVertical: Metrics.rfv(10),
  // paddingHorizontal: Metrics.rfv(10),
  borderRadius: Metrics.rfv(6),
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: Metrics.rfv(50),
};

const BASE_TEXT = {
  fontWeight: '500',
  fontSize: 18,
  color: COLORS_NEW.text,
  lineHeight: Metrics.rfv(25),
  letterSpacing: 0.4,
  paddingHorizontal: Metrics.rfv(20),
  textAlign: 'center',
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets = {
  /**
   * A smaller piece of secondard information.
   */
  primary: {
    ...BASE_VIEW,
    backgroundColor: COLORS_NEW.blue,
  },

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingVertical: Metrics.rfv(0),
    paddingHorizontal: Metrics.rfv(0),
    alignItems: 'flex-start',
  },

  /**
   *  a button with only border
   */
  transparent: {
    ...BASE_VIEW,
    backgroundColor: COLORS_NEW.white,
    borderColor: COLORS_NEW.blue,
    borderWidth: Metrics.rfv(1),
  },
  /**
   *  touchable card
   */
  touchable: {},
};

export const textPresets = {
  primary: {
    ...BASE_TEXT,
    color: COLORS_NEW.white,
  },

  link: {
    ...BASE_TEXT,
    fontSize: 12,
    color: COLORS_NEW.text,
    lineHeight: Metrics.rfv(18),
    paddingVertical: Metrics.rfv(0),
    paddingHorizontal: Metrics.rfv(0),
  },

  transparent: {
    ...BASE_TEXT,
    color: COLORS_NEW.blue,
  },

  touchable: {},
};
