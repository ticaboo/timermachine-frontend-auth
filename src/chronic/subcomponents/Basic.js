/*
 basic component. for checking RW component dev process, port to RN process.
 guidelines eg - styling, View, Text
*/
import { View, Text, Title } from './sharedStyles';

export default function BasicPorted({ children }) {
  return (
    <View data-test-aview>
      <Title bg="red">Tits</Title>
      <Text data-test-atext data-test-basic-children bg="red">
        {children}
      </Text>
    </View>
  );
}
