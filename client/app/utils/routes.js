import HomePage from 'containers/HomePage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import OrderScreen from 'containers/OrderScreen';
import SocketTest from 'containers/SocketTest';
import OrdersList from 'containers/OrdersList';

const routes = [
  { path: '/', name: 'HomePage', Component: HomePage },
  { path: '/dashboard', name: 'DashboardPage', Component: DashboardPage },
  { path: '/profile', name: 'ProfilePage', Component: ProfilePage },
  { path: '/socket', name: 'SocketTest', Component: SocketTest },
  { path: '/order/:id', name: 'OrderScreen', Component: OrderScreen },
  { path: '/orders', name: 'OrdersList', Component: OrdersList },
];

export default routes;
