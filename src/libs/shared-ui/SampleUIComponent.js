/*
 basic component. for checking RW component dev process, port to RN process.
 guidelines eg - styling, View, Text
*/
//import { View, Text, Title } from './sharedStyles';
import { View, Text } from 'react-native-web';
export default function SampleUIComponent({ children }) {
  return (
    <View data-test-aview>
      <Text data-test-atext data-test-basic-children bg="red">
        {children}
      </Text>
    </View>
  );
}
