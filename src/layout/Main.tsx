import { Footer, Header, useToggle } from "@architecture-it/stylesystem";
import { UserAvatar, SidebarWrapper } from "@architecture-it/azure-b2c";
import { useLocation, useNavigate } from "react-router-dom";
import { faBoxTaped, faHome } from "@fortawesome/pro-solid-svg-icons";

import styles from "./Main.module.scss";

interface IMainProps {
  children: React.ReactNode;
}

export default function Main({ children }: IMainProps) {
  const [open, { handleOpen, handleClose }] = useToggle();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Header onClickButton={handleOpen}>
        <UserAvatar />
      </Header>
      <SidebarWrapper
        open={open}
        unauthenticatedRoutes={[
          {
            item: "home",
            onClick: () => {
              if (pathname !== "/") {
                navigate("/");
              }
              handleClose();
            },
            selected: pathname === "/",
            fontAwesomeProps: {
              icon: faHome,
            },
            className: styles.listItem,
            divider: true,
          },
          {
            item: "caja",
            onClick: () => {
              if (pathname !== "/caja") {
                navigate("/caja");
              }
              handleClose();
            },
            selected: pathname === "/caja",
            fontAwesomeProps: {
              icon: faBoxTaped,
            },
            className: styles.listItem,
            divider: true,
          },
        ]}
        onClose={handleClose}
        onOpen={handleOpen}
      />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
