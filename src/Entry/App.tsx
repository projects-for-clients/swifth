
import {Navigate, Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';


const App = () => {


  return (

  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='*' element={<Navigate to='/' replace/>}/>
  </Routes>
  );
};

export default App;
