import React, { useEffect } from "react";
import Logo from '../assets/icons/nintendo.svg';
import CartIcon from '../assets/icons/cart.svg?react';
import UserIcon from '../assets/icons/user.svg?react';
import { HomeFilled, ProductFilled, ReadFilled, PhoneFilled, QuestionCircleFilled } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { notify } from "../main";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../axios/auth";
import "./index.css";

export default function Header({ isOpen, setOpen }) {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('auth_token');

  function handleSignOut() {
    clearToken()
    navigate('/login');
    notify('info', `You've been logged out!`);
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  const headerItems = [
    { name: <><HomeFilled /> {t('Home')}</>, path: '/' },
    { name: <><ProductFilled /> {t('Products')}</>, path: '/products' },
    { name: <><PhoneFilled /> {t('Contact')}</>, path: '/contact' },
    { name: <><ReadFilled /> {t('News')}</>, path: '/news' },
    { name: <><QuestionCircleFilled /> {t('About Us')}</>, path: '/about' },
  ];

  const userMenuItems = [
    {
      key: '1',
      label: t('Setting'),
      children: [
        {
          key: '1-1',
          label: <div className="countryName" onClick={() => i18next.changeLanguage('en')}>
            <img className="countryFlag" src="/assets/usa.png" alt="usa" />
            <span>{t('English')}</span>
          </div>,
        },
        {
          key: '1-2',
          label: (
            <div className="countryName" onClick={() => i18next.changeLanguage('vi')}>
              <img className="countryFlag" src="/assets/vietnam.png" alt="vietnam" />
              <span>{t('Vietnamese')}</span>
            </div>
          ),
        },
      ],
    },
    { type: 'divider' },
    { label: <a onClick={handleSignOut}>{t('SignOut')}</a>, key: '2' },
  ];

  return (
    <header>
      <div className="brand">
        <div className="logo-brand">
          <img onClick={() => setOpen(!isOpen)} className="img-logo" src={Logo} alt="logo" />
        </div>
      </div>
      <div className="menu-item">
        <ul>
          {headerItems.map((item, index) => (
            <li key={index} onClick={() => navigate(item.path)}>
              <a className="icon-header">{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="user-menu">
        <a className="icon-header" onClick={() => navigate('/cart')}><CartIcon /> {t('Cart')}</a>
        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
          <a className="icon-header"><UserIcon /> {t('User')}</a>
        </Dropdown>
      </div>
    </header>
  );
}
