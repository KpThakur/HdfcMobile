import { Alert, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

//Font name
export const FONT_FAMILY_BOLD = 'Poppins-Bold';
export const FONT_FAMILY_REGULAR = 'Poppins-Regular';
export const FONT_FAMILY_THIN = 'Poppins-Thin';
export const FONT_FAMILY_SEMI_BOLD = 'Poppins-SemiBold';

//Color
export const DARK_BLUE_COLOR = '#004c8f';
export const PRIMARY_BLUE_COLOR = '#1b7dec';
export const STATUS_BAR_COLOR = '#1b7dec';
export const MAIN_BG_GREY_COLOR = '#f5f5f5';
export const WHITE_BG_COLOR = '#ffffff';
export const GREEN_COLOR = '#11ad2b';
export const RED_COLOR = '#e91818';
export const GREY_TEXT_COLOR = '#ececec';
export const PRIMARY_TEXT_COLOR = '#ffffff';
export const PRIMARY_BTN_COLOR = '#1b7dec';
export const BORDER_COLOR = '#d1e5fb';

//Images
export const BRAND_ICON = require('../assets/images/auditor.png');
export const HEROIC_ICON = require('../assets/images/Audit.png');
export const EYE_CLOSE = require('../assets/images/Group_7.png');
export const EYE = require('../assets/images/eye.png');
export const UNCHECKED = require('../assets/images/unchecked.png');
export const CHECKED = require('../assets/images/check-button.png');
export const CAMERA = require('../assets/images/camera.png');
export const INSTRUCTION = require('../assets/images/Instruction.png');
export const HEADPHONE = require('../assets/images/headphones.png');
export const WIFI = require('../assets/images/wifi-line.png');
export const GROUP_17 = require('../assets/images/Group_107.png');
export const STAR = require('../assets/images/star.png');
export const UNSTAR = require('../assets/images/star-1.png');
export const ARROW = require('../assets/images/arrow-down.png');
export const CHECKED_ICON = require('../assets/images/Group117.png');
export const INFO_ICON = require('../assets/images/info-circle-solid.png');
export const CALENDAR = require('../assets/images/calendar-date.png');
export const CLOCK = require('../assets/images/clock.png');
export const CANCEL_ICON = require('../assets/images/add-alt.png');
export const HOME_ICON = require('../assets/images/home-line1.png');
export const HOME_ICON_ACTIVE = require('../assets/images/home-line.png');
export const PROFILE_ICON = require('../assets/images/user-avatar1.png');
export const PROFILE_ICON_ACTIVE = require('../assets/images/user-avatar.png');
export const CROSS = require('../assets/images/add-alt.png');
export const ADD_ICON = require('../assets/images/plus-alt1.png');
export const ADD_ICON_ACTIVE = require('../assets/images/plus-alt.png');
export const DASHBOARD = require('../assets/images/dashboard.png');
export const LOGOUT_ICON = require('../assets/images/logout.png');
export const DASHBOARD_HEROIC = require('../assets/images/Group118.png');
export const UNCHECKED_ICON = require('../assets/images/Ellipse435.png');
export const DOWNARROW = require('../assets/images/arrow-ios-downward-outline.png');
export const CHECKED_FILLED = require('../assets/images/check.png');
export const GALLERY = require('../assets/images/image-gallery.png');
export const MICON = require('../assets/images/voice-recording.png');
export const MICOFF = require('../assets/images/mute.png');
export const LEFT_ARROW = require('../assets/images/left-2.png');
export const UPDATE_ICON = require('../assets/images/refresh-page-option.png');
export const FLIP_ICON = require('../assets/images/flip.png');
export const VIDEO = require('../assets/images/start.png');
export const STOP_VIDEO = require('../assets/images/stopIcon.png');
export const FLASH_ON = require('../assets/images/flashOn.png');
export const FLASH_OFF = require('../assets/images/flashOff.png');

// FontSize
export const TINY_FONT_SIZE = 10;
export const SMALL_FONT_SIZE = 15;
export const MEDIUM_FONT_SIZE = 17;
export const COMMON_MEDIUM_FONT_SIZE = 18;
export const LARGE_FONT_SIZE = 20;
export const SEMI_FONT_SIZE = 22;
export const EXTRA_LARGE_FONT_SIZE = 24;
export const MEGA_LARGE_FONT_SIZE = 26;

//Base url
// export const BASEURL = 'https://easycalls.in:3000';
export const BASEURL = 'https://dev.easycalls.in:3036';
//export const BASEURL = 'http://192.168.43.177:3001';
// export const BASEURL = 'http://192.168.1.21:3001'
//Google API key
export const MAP_KEY = 'AIzaSyCbDx7Lk4eTMzptrQKXZvOPYgEMggrq8o4';

export const requestGeolocationPermission = async () => {
  try {
    const authorizationLevel = 'whenInUse'; // or "always"
    const status = await Geolocation.requestAuthorization(authorizationLevel);
    if (status !== 'granted') {
      Alert.alert(
        "Location Permission",
        "Please enable it in the Settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      );
    } else {
      console.log('Location permission granted');
    }
    console.log('Permission status:', status);
  } catch (error) {
    console.error(error);
  }
};