import {teal400, green500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    // // primary1Color: teal400,
    // primary2Color: teal400,
    // primary3Color: teal400,
    // accent1Color: teal400,
    // accent2Color: teal400,
    // accent3Color: teal400,
    // textColor: teal400,
    // alternateTextColor: teal400,
    // borderColor: teal400,
    // disabledColor: teal400,
    pickerHeaderColor: teal400,
    clockCircleColor: teal400,
  }
});

export default muiTheme;
