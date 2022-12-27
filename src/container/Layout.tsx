import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Modal from '../components/Modal';
import Auth from './Auth';

function Layout() {
  return (
    <div className="app">
      <Header />

      <Hero />

      <Modal>
        <Auth />
      </Modal>
    </div>
  );
}

export default Layout;
