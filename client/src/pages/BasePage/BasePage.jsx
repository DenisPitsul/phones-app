import React from 'react';
import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';

function BasePage () {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default BasePage;
