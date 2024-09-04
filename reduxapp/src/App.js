// npm i react-router-dom for react-router-dom for library 
// npm install react-redux 

import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Provider } from 'react-redux'
import { myStore } from './redux/config';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function App() {
  const routerPaths = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/About", element: <About /> },
    { path: "/Contact", element: <Contact /> } ,
    {path:"/web",element:<Web/}
  ]);

  return (
    <Provider store={myStore}>
      <div className="App">
        {/* <RouterProvider router={routerConfig} /> */}
        <RouterProvider router={routerPaths} />
      </div>
    </Provider>
  );
  
}

export default App;