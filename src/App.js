import './App.css';
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import AdminRoute from './components/Routes/AdminRoute';
import { EDIT_ACTION, SIGN_UP_ACTION } from './util/settings/Config';

// import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
// import Home from './pages/Home/Home';
// import Detail from './pages/Detail/Detail';
// import Seats from './pages/Seats/Seats';
// import SignIn from './pages/SignIn/SignIn';
// import SignUp from './pages/SignUp/SignUp';
// import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
// import AdminFilmManagement from './pages/admin/Films/AdminFilmManagement';
// import AddNewFilm from './pages/admin/Films/AddNewFilm/AddNewFilm';
// import EditFilm from './pages/admin/Films/EditFilm/EditFilm';
// import AdminShowtime from './pages/admin/Showtime/AdminShowtime'
// import AdminUserManagement from './pages/admin/Users/AdminUserManagement';
// import Profile from './pages/Profile/Profile';

const HomeTemplate = lazy(() => import('./templates/HomeTemplate/HomeTemplate'));
const Home = lazy(() => import('./pages/Home/Home'));
const Detail = lazy(() => import('./pages/Detail/Detail'));
const Seats = lazy(() => import('./pages/Seats/Seats'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const AdminTemplate = lazy(() => import('./templates/AdminTemplate/AdminTemplate'));
const AdminFilmManagement = lazy(() => import('./pages/admin/Films/AdminFilmManagement'));
const AddNewFilm = lazy(() => import('./pages/admin/Films/AddNewFilm/AddNewFilm'));
const EditFilm = lazy(() => import('./pages/admin/Films/EditFilm/EditFilm'));
const AdminShowtime = lazy(() => import('./pages/admin/Showtime/AdminShowtime'));
const AdminUserManagement = lazy(() => import('./pages/admin/Users/AdminUserManagement'));
const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeTemplate />} >
            <Route index element={<Home />} />
            <Route path='detail/:id' element={<Detail />} />
            <Route path='seats/:id' element={
              <ProtectedRoute>
                <Seats />
              </ProtectedRoute>}
            />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp purpose={SIGN_UP_ACTION} />} />
            <Route path='profile/:account' element={<Profile />} />
            <Route path='profile/:account/edit' element={<SignUp purpose={EDIT_ACTION} />} />
          </Route>
        </Routes>
        <Routes>
          <Route path='/admin' element={
            <AdminRoute>
              <AdminTemplate />
            </AdminRoute>
          } >
            <Route path='' element={<AdminUserManagement />} />
            <Route path='users' element={<AdminUserManagement />} />
            <Route path='films' element={<AdminFilmManagement />} />
            <Route path='films/addnewfilm' element={<AddNewFilm />} />
            <Route path='films/editfilm/:id' element={<EditFilm />} />
            <Route path='films/showtime/:id' element={<AdminShowtime />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
