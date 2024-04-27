import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import SplashPage from './pages/SplashPage';
import AuthPage from './pages/AuthPage';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
import { SearchAddress } from './pages/SearchAddress';
import { ItemPage } from './pages/ItemPage';
import { AnnouncementPage } from './pages/AnnouncementPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { CartPage } from './pages/CartPage';
import { OrderPage } from './pages/OrderPage';
import { OrderPageByCart } from './pages/OrderPageByCart';
import { EditDeliveryInfoPage } from './pages/EditDeliveryInfoPage';
import { AdminHomePage } from './pages/admin/AdminHomePage';
import { AdminUserDetailsPage } from './pages/admin/AdminUserDetailsPage';
import { AdminOrderDetailsPage } from './pages/admin/AdminOrderDetailsPage';
import { CreateNoticePage } from './pages/CreateNoticePage';
import { AnnouncementDetailPage } from './pages/AnnouncementDetailPage';
import { AdminItemPage } from './pages/admin/AdminItemPage';
import { AdminItemDeletePage } from './pages/admin/AdminItemDeletePage';

const Stack = createStackNavigator();


export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='SplashPage' component={SplashPage} options={{ headerShown: false}}/>
        <Stack.Screen name='AuthPage' component={AuthPage} options={{ headerShown: false}}/>
        <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminHomePage' component={AdminHomePage} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminUserDetailsPage' component={AdminUserDetailsPage} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminItemDeletePage' component={AdminItemDeletePage} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminOrderDetailsPage' component={AdminOrderDetailsPage} options={{ headerShown: false }}/>
        <Stack.Screen name='AdminItemPage' component={AdminItemPage} options={{ headerShown: false }}/>
        <Stack.Screen name='ItemPage' component={ItemPage} options={{ headerShown: false }}/>
        <Stack.Screen name='CartPage' component={CartPage} options={{ headerShown: false }}/>
        <Stack.Screen name='ItemDetailPage' component={ItemDetailPage} options={{ headerShown: false }}/>
        <Stack.Screen name='OrderDetailsPage' component={OrderDetailsPage} options={{ headerShown: false }}/>
        <Stack.Screen name='OrderPage' component={OrderPage} options={{ headerShown: false }}/>
        <Stack.Screen name='OrderPageByCart' component={OrderPageByCart} options={{ headerShown: false }}/>
        <Stack.Screen name='EditDeliveryInfoPage' component={EditDeliveryInfoPage} options={{ headerShown: false }}/>
        <Stack.Screen name='AnnouncementPage' component={AnnouncementPage} options={{ headerShown: false }}/>
        <Stack.Screen name='AnnouncementDetailPage' component={AnnouncementDetailPage} options={{ headerShown: false }}/>
        <Stack.Screen name='CreateNoticePage' component={CreateNoticePage} options={{ headerShown: false }}/>
        <Stack.Screen name='SignUpPage' component={SignUpPage} options={{ headerShown: false}}/>
        <Stack.Screen name='SearchAddress' component={SearchAddress}/>
      </Stack.Navigator>
    </NavigationContainer>
    
    
  );
}
