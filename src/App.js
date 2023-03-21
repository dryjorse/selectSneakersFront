import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { routes } from './routes/routes';
import './App.css';

function App() {
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
