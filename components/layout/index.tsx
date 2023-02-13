import type { NextPage } from 'next';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { ReactElement } from 'react';

interface Props {
  children?: ReactElement;
}

const Layout: NextPage<Props> = (props) => {
  const { children } = props;

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
