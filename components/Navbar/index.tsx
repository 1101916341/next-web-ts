import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { navs } from "./config";
import styles from "./index.module.scss";
import { Button } from "antd";
import Login from "components/Login";

const Navbar: NextPage = () => {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 跳转写文章
  const handleGoToEditorPage = () => {};

  // 登录
  const handleLogin = () => {
    setIsOpen(true);
  };

  const handleOnClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.navbar}>
      <section className={styles.logo}>BLOG-G</section>
      <section className={styles.link}>
        {navs.map((nav) => (
          <Link key={nav?.label} href={nav?.value}>
            <span className={pathname === nav?.value ? styles.action : ""}>{nav?.label}</span>
          </Link>
        ))}
      </section>
      <section className={styles.operaction}>
        <Button onClick={handleGoToEditorPage}>写文章</Button>
        <Button type='primary' onClick={handleLogin}>
          登录
        </Button>
      </section>
      <Login isOpen={isOpen} onClose={handleOnClose} />
    </div>
  );
};

export default Navbar;
