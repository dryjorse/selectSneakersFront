import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/layout/Layout';
import { routes } from './routes/routes';
import './App.css';
import { refresh } from './store/slices/userSlice';
import LoadinPage from './pages/loadingPage/LoadinPage';

function App() {
  const dispatch = useDispatch()
  const userStatus = useSelector(store => store.user.status)

  useEffect(() => {
    if(localStorage.getItem('token')) dispatch(refresh())
  }, [dispatch])

  if(userStatus === 'loading') return <LoadinPage option={2} />

  return (
    <div className="App">
      <Layout >
        <Routes >
          {routes.map(route => 
            <Route 
              key={route.id} 
              path={route.path}
              element={route.elem}
            />
          )}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
