// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import SongList from './components/SongList';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navbar/>    
      <SongList />  
      <Footer/>
    </Provider>
  );
};

export default App;
