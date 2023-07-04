import { Footer, Header, useToggle } from "@architecture-it/stylesystem";
import { UserAvatar, SidebarWrapper } from "@architecture-it/azure-b2c";
import { useLocation, useNavigate } from "react-router-dom";
import { faBoxTaped, faHome } from "@fortawesome/pro-solid-svg-icons";
import About from "components/About";

import x from "./../assets/img/cubes-svgrepo-com.svg";
import cubes from "./../assets/img/cubes-svgrepo-com.svg";
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
      <Header
        disableMenuButton={true}
        logo={{ alt: "cubes", src: cubes }}
        onClickButton={handleOpen}
      >
        <About />
        {/* <UserAvatar /> */}
      </Header>
      {/* <SidebarWrapper open={open} onClose={handleClose} onOpen={handleOpen} /> */}
      <main className={styles.main}>{children}</main>
      <Footer
        institutional
        links={[
          {
            text: "wlacoste@outlook.com",
          },
          {
            text: "walterlacoste.dev",
          },
        ]}
        logoImgProps={{
          alt: "Norlog logo",
          src: x,
          width: "50px",
        }}
        name="Norlog"
      />{" "}
    </div>
  );
}
