import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

export interface IMainPageMenuProps {
  route: string;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
}

export const MainPageMenu: FC<IMainPageMenuProps> = (props) => (
  <Menu
    style={{
      textAlign: 'center',
    }}
    selectedKeys={[props.route]}
    mode="horizontal">
    <Menu.Item key="/">
      <Link
        onClick={() => {
          props.setRoute('/');
        }}
        to="/">
        Surfers
      </Link>
    </Menu.Item>
    <Menu.Item key="/how">
      <Link
        onClick={() => {
          props.setRoute('/how');
        }}
        to="/how">
        How to Play
      </Link>
    </Menu.Item>
    <Menu.Item key="/money">
      <Link
        onClick={() => {
          props.setRoute('/money');
        }}
        to="/money">
        Money
      </Link>
    </Menu.Item>
    <Menu.Item key="/mainnetdai">
      <Link
        onClick={() => {
          props.setRoute('/mainnetdai');
        }}
        to="/mainnetdai">
        Mainnet DAI
      </Link>
    </Menu.Item>
  </Menu>
);
