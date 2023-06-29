import {
  HomeTwoTone,
  EditTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  const fixLoc = () => {
    const loc = window.location.pathname;
    switch (loc) {
      case "/":
        return "h";
      case "/gpt":
        return "g";
      case "/quotes":
        return "q";
      // case "/printers":
      //   return "p";
      case "/scanner":
        return "s";
      default:
        return "h";
      }
    };
    const currentLoc = fixLoc();
  const [current, setCurrent] = useState(currentLoc);
  const onClick = (e) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="h" icon={<HomeTwoTone />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="g" icon={<EditTwoTone />}>
          <Link to="/gpt">chatGPT</Link>
        </Menu.Item>
        <Menu.Item key="q" icon={<CheckCircleTwoTone />}>
          <Link to="/quotes">Quotes</Link>
        </Menu.Item>
        {/* <Menu.Item key="p" icon={<CheckCircleTwoTone />}>
          <Link to="/printers">Printers</Link>
        </Menu.Item> */}
        <Menu.Item key="s" icon={<CheckCircleTwoTone />}>
          <Link to="/scanner">Scanner</Link>
        </Menu.Item>
      </Menu>
      <Outlet />
    </div>
  );
};
export default Header;
