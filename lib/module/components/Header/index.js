import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
import Selectors from './Selectors';
const Header = ({
  buttonPrevIcon,
  buttonNextIcon,
  theme
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.headerContainer, theme === null || theme === void 0 ? void 0 : theme.headerContainerStyle],
    accessibilityRole: "header"
  }, (theme === null || theme === void 0 ? void 0 : theme.headerButtonsPosition) === 'left' ? /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(PrevButton, {
    icon: buttonPrevIcon,
    theme: theme
  }), /*#__PURE__*/React.createElement(NextButton, {
    icon: buttonNextIcon
  })), /*#__PURE__*/React.createElement(Selectors, null)) : (theme === null || theme === void 0 ? void 0 : theme.headerButtonsPosition) === 'right' ? /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Selectors, null), /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(PrevButton, {
    icon: buttonPrevIcon,
    theme: theme
  }), /*#__PURE__*/React.createElement(NextButton, {
    icon: buttonNextIcon
  }))) : /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(PrevButton, {
    icon: buttonPrevIcon,
    theme: theme
  }), /*#__PURE__*/React.createElement(Selectors, null), /*#__PURE__*/React.createElement(NextButton, {
    icon: buttonNextIcon
  })));
};
const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 5
  },
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row'
  }
});
export default /*#__PURE__*/memo(Header);
//# sourceMappingURL=index.js.map