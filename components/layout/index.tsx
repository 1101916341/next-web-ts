import type { NextPage } from 'next';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
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
