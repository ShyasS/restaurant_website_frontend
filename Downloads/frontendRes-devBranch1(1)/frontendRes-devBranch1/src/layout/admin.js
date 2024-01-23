import React from 'react';
import Sidebar from 'pages/admin/Sidebar';
import MenuList from 'pages/admin/MenuList';
// import Header from './Header';

const Admin = () => {
  return (
    <div className="row">
      <div className="col">
        <Sidebar />
      </div>
      <div className="col">
        <div className="row">
          <MenuList />
        </div>
      </div>
    </div>
  );
};

export default Admin;
