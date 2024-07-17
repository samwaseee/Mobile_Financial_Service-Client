import { NavLink, Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import AuthContext from './context/Authcontext';

function App() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Navbar />
          <Outlet />
          <Footer />
        </div>
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <h1 className='mx-auto text-3xl my-4'>Pocket Cash</h1>
            {auth.user ? (
              <>
                <li> <button onClick={logout}>Logout</button> </li>
              </>
            ) : (
              <>
                <li> <NavLink to='/user'>User</NavLink> </li>
                <li> <NavLink to='/agent'>Agent</NavLink> </li>
                <li> <NavLink to='/admin'>Admin</NavLink> </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
