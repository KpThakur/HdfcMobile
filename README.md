# hdfcsq

How to run app 

Get clone 
--git clone
--git checkout Development 
--cd hdfc_react_app
--npm i
-- After node module instlled successfully go to below link file
   node_modules/react-native/index.js

remove below code 

// Deprecated Prop Types
 get ColorPropType(): $FlowFixMe {
    console.error(
      'ColorPropType will be removed from React Native, along with all ' +
        'other PropTypes. We recommend that you migrate away from PropTypes ' +
        'and switch to a type system like TypeScript. If you need to ' +
        'continue using ColorPropType, migrate to the ' +
        "'deprecated-react-native-prop-types' package.",
    );
    return require('deprecated-react-native-prop-types').ColorPropType;
  },
  get EdgeInsetsPropType(): $FlowFixMe {
    console.error(
      'EdgeInsetsPropType will be removed from React Native, along with all ' +
        'other PropTypes. We recommend that you migrate away from PropTypes ' +
        'and switch to a type system like TypeScript. If you need to ' +
        'continue using EdgeInsetsPropType, migrate to the ' +
        "'deprecated-react-native-prop-types' package.",
    );
    return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
  },
  get PointPropType(): $FlowFixMe {
    console.error(
      'PointPropType will be removed from React Native, along with all ' +
        'other PropTypes. We recommend that you migrate away from PropTypes ' +
        'and switch to a type system like TypeScript. If you need to ' +
        'continue using PointPropType, migrate to the ' +
        "'deprecated-react-native-prop-types' package.",
    );
    return require('deprecated-react-native-prop-types').PointPropType;
  },
  get ViewPropTypes(): $FlowFixMe {
    console.error(
      'ViewPropTypes will be removed from React Native, along with all ' +
        'other PropTypes. We recommend that you migrate away from PropTypes ' +
        'and switch to a type system like TypeScript. If you need to ' +
        'continue using ViewPropTypes, migrate to the ' +
        "'deprecated-react-native-prop-types' package.",
    );
    return require('deprecated-react-native-prop-types').ViewPropTypes;
  },


 and paste below code 
-------------------------------------------------------------
 // Deprecated Prop Types
  get ColorPropType(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').ColorPropType;
  },

  get EdgeInsetsPropType(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
  },

  get PointPropType(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').PointPropType;
  },

  get ViewPropTypes(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').ViewPropTypes;
  },
 -------------------------------------------------------------------- 

  for run start metro server
  ---npm start 


  for android --- yarn android
  for Ios ---yarn ios