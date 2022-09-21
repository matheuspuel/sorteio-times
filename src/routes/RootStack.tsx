import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { theme } from 'src/theme'
import { Id } from 'src/utils/Entity'
import { Group } from 'src/views/Group'
import { Groups } from 'src/views/Groups'
import { Loading } from 'src/views/Loading'
// import { DrawerNavigator, DrawerParamList } from './Drawer'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>

export type RootStackParamList = {
  // Drawer: NavigatorScreenParams<DrawerParamList>
  Loading: undefined
  Groups: undefined
  Group: { id: Id }
}

const Stack = createStackNavigator<RootStackParamList>()
export type RootNavigatorObject = typeof Stack

export const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.lightText,
      }}
      initialRouteName="Loading"
    >
      {/* <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{ title: 'Grupos' }}
      />
      <Stack.Screen
        name="Group"
        component={Group}
        options={{ title: 'Grupo' }}
      />
    </Stack.Navigator>
  )
}
