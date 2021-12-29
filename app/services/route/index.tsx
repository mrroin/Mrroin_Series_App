import React from "react";
import Home from "../../components/views/Home";
import Init from "../../components/views/Init";
import Login from "../../components/views/Login";
import ProductDetail from "../../components/views/ProductDetail";
import Products from "../../components/views/Products";
import Offers from "../../components/views/Offers";
import Categories from "../../components/views/Categories";
import BarUser from "../../components/views/BarUser";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import translate from "../language";

export const navigationRef: any = React.createRef();
// import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();
export default class App extends React.Component {
  // componentDidMount() {
  //   setTimeout(() => SplashScreen.hide(), 2000);
  // }
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeRT"
            component={Init}
            options={{
              title: translate("welcome"),
            }}
          />
          <Stack.Screen
            name="ProductsRT"
            component={Products}
            options={{
              title: translate("products"),
              headerRight: () => <BarUser />,
            }}
          />
          <Stack.Screen
            name="OffersRT"
            component={Offers}
            options={{
              title: translate("offers"),
              headerRight: () => <BarUser />,
            }}
          />
          <Stack.Screen
            name="CategoriesRT"
            component={Categories}
            options={{
              title: translate("categories"),
              headerRight: () => <BarUser />,
            }}
          />
          <Stack.Screen
            name="HomeRT"
            component={Home}
            options={({ route }: any) => ({
              headerShown: false,
              headerRight: () => <BarUser />,
            })}
          />
          <Stack.Screen
            name="LoginRT"
            component={Login}
            options={{
              title: translate("login"),
            }}
          />
          <Stack.Screen
            name="DetailRT"
            component={ProductDetail}
            options={({ route }: any) => ({
              title: translate(route.params.name),
              headerRight: () => <BarUser />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export const goPage = (name: any, params: any) => {
  navigationRef.current?.navigate(name, params);
};
export const backPage = () => console.log("back");
