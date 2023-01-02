//mock / replace react-native so:
/*
View: div,
Text: span
hang on - this is being done by RN for web,
*/
//import { StyleSheet, Text, View } from 'react-native';
/*
 basic component. for checking RW component dev process, port to RN process.
 guidelines eg - styling, View, Text
*/
const adiv = (props) => {
  return <div {...props}>{props.children}</div>;
};
const Text = adiv;
const View = adiv;

export default function Basic({ children }) {
  return (
    <View data-test-aview>
      <Text data-test-atext data-test-basic-children>
        {children}
      </Text>
    </View>
  );
}

//style={styles.container}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
