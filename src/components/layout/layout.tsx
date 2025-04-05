import React from 'react';
import Appbar from '../appbar/appbar';

const Layout = ({ children }: {children: any}) => {
  return (
    <div>
      <Appbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
