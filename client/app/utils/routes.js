import HomePage from 'containers/HomePage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import JapScreen from 'containers/JapScreen';
import OrderScreen from 'containers/OrderScreen';
// import SocketTest from 'containers/SocketTest';
import OrdersList from 'containers/OrdersList';
import NewJapPage from 'containers/NewJapPage';
import MembersList from 'containers/MembersList';

const routes = [
  { path: '/', name: 'HomePage', Component: HomePage },
  { path: '/dashboard', name: 'DashboardPage', Component: DashboardPage },
  { path: '/profile', name: 'ProfilePage', Component: ProfilePage },
  // { path: '/socket', name: 'SocketTest', Component: SocketTest },
  { path: '/jap/:id', name: 'JapScreen', Component: JapScreen },
  { path: '/order/:id', name: 'OrderScreen', Component: OrderScreen },
  { path: '/orders', name: 'OrdersList', Component: OrdersList },
  { path: '/newjap', name: 'NewJapPage', Component: NewJapPage },
  { path: '/members', name: 'MembersList', Component: MembersList },
];

export default routes;
