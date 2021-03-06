import HomePage from 'containers/HomePage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import JapScreen from 'containers/JapScreen';
import OrderScreen from 'containers/OrderScreen';
import OrdersList from 'containers/OrdersList';
import NewJapPage from 'containers/NewJapPage';
import MembersList from 'containers/MembersList';
import JoinJapPage from 'components/JoinJapPage';
import AddMembersPage from 'containers/AddMembersPage';
import AddTablePage from 'containers/AddTablePage';
import JoinTable from 'containers/JoinTable';
import LoginPage from 'containers/LoginContainer';

const routes = [
  { path: '/login', name: 'LoginPage', Component: LoginPage },
  { path: '/', name: 'HomePage', Component: HomePage },
  { path: '/dashboard', name: 'DashboardPage', Component: DashboardPage },
  { path: '/profile', name: 'ProfilePage', Component: ProfilePage },
  { path: '/jap/:id', name: 'JapScreen', Component: JapScreen },
  { path: '/order/:id', name: 'OrderScreen', Component: OrderScreen },
  { path: '/orders', name: 'OrdersList', Component: OrdersList },
  { path: '/newjap', name: 'NewJapPage', Component: NewJapPage },
  { path: '/members', name: 'MembersList', Component: MembersList },
  { path: '/addtable', name: 'AddTablePage', Component: AddTablePage },
  { path: '/joinjap', name: 'JoinJapPage', Component: JoinJapPage },
  { path: '/addmembers', name: 'AddMembersPage', Component: AddMembersPage },
  { path: '/jointable', name: 'JoinTable', Component: JoinTable },
];

export default routes;
