/* eslint-disable */

var Colors = {
  // Brand
  brandPrimary: 'rgba(55, 115, 161, 0.5)',
  brandSecondary: '#rgba(34, 143, 83, 0.5)',

  // Basic
  black: '#000000',
  white: '#ffffff',
  red: 'red',
  whiteSmoke: 'rgb(245,245,245)',
  lightGrey: 'rgb(203,210,205)',
  darkGrey: 'rgb(135,150,134)',
  primaryGrey: 'rgb(56,80,62)',
  midGrey: '#CBD2CD',
  transparent: 'rgba(0,0,0,0)',

  // Forms
  formPlaceholder: '#000000',
  formError: '#b30000',
  formLabel: '#000000',
  formInput: '#000000',
  formHelp: '#999999',
  formBorder: '#cccccc',
  formDisabled: '#777777',
  formDisabledBackground: '#eeeeee'
};

var Fonts = {
  iosFont: 'Helvetica Neue',
  androidFont: 'sans-serif'
};

var Icons = {
  home: 'home',
  profile: 'user',
  map: 'map',
  calendar: 'calendar-o'
};

var BorderRadius = {
  small: {
    all: '4px',
    top: '4px 4px 0px 0px',
    bottom: '0px 0px 4px 4px',
  },
  medium: {
    all: '8px',
    top: '8px 8px 0px 0px',
    bottom: '0px 0px 8px 8px',
  },
  none: 'none'
};

var MaxWidth = {
  mobile: '504px'
};

module.exports = {
  Colors,
  Icons,
  Fonts,
  BorderRadius,
  MaxWidth
}
