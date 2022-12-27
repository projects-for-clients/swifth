import Header from '../components/Header';
import { GrFormClose } from 'react-icons/gr';

import { useState } from 'react';
import Auth from '../container/Auth';
import Hero from '../components/Hero';

import { AppContext } from '../Context/AppContext';
import Layout from '../container/Layout';

const App = () => {
  return (
    <AppContext.Provider
      value={{
        path: 'signup',
      }}
    >
      <Layout />
    </AppContext.Provider>
  );
};

export default App;
