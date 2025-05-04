import React, { useState } from 'react';
import { Button, Drawer, Layout, Menu, Dropdown } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    HomeOutlined,
    MenuOutlined,
    ShoppingOutlined,
    DownOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { SubMenu } = Menu;

const MainHeader = () => {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const languageMenu = (
        <Menu>
            <Menu.Item key="vi" onClick={() => changeLanguage('vi')}>
                🇻🇳 Tiếng Việt
            </Menu.Item>
            <Menu.Item key="zh" onClick={() => changeLanguage('zh')}>
                🇨🇳 中文
            </Menu.Item>
        </Menu>
    );


    const menuItems = [
        { key: '/', icon: <HomeOutlined />, label: t('home') },
        { key: '/policy', icon: <i className="fas fa-shipping-fast" />, label: t('policy') },
        { key: '/about', icon: <i className="fas fa-user-circle" />, label: t('about') },
    ];

    return (
        <Header className="main-header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <span>{t('shop_name')}</span>
                </Link>


                {/* Mobile Menu Button */}
                <Button
                    className="mobile-menu-button"
                    type="primary"
                    icon={<MenuOutlined />}
                    onClick={() => setMobileMenuVisible(true)}
                />

                {/* Desktop Menu */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    className="desktop-menu"
                >
                    <Menu.Item key="/" icon={<HomeOutlined />}>
                        <Link to="/">{t('home')}</Link>
                    </Menu.Item>
                    <Menu.Item key="/products" icon={<ShoppingOutlined />}>
                        <Link to="/products">{t('products')}</Link>
                    </Menu.Item>

                    {menuItems.slice(1).map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>

                {/* Mobile Menu Drawer */}
                <Drawer
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{t('home')} Menu</span>
                            {/* Language Switcher in Mobile */}
                            <Dropdown overlay={languageMenu}>
                                <Button size="small" icon={<DownOutlined />}>
                                    {i18n.language === 'vi' ? '🇻🇳' : '🇨🇳'}
                                </Button>
                            </Dropdown>
                        </div>
                    }
                    placement="right"
                    onClose={() => setMobileMenuVisible(false)}
                    open={mobileMenuVisible}
                    className="mobile-menu-drawer"
                >
                    <Menu mode="inline" selectedKeys={[location.pathname]}>
                        <Menu.Item key="/" icon={<HomeOutlined />}>
                            <Link to="/" onClick={() => setMobileMenuVisible(false)}>{t('home')}</Link>
                        </Menu.Item>

                        <Menu.Item key="/products" icon={<ShoppingOutlined />}>
                            <Link to="/products">{t('products')}</Link>
                        </Menu.Item>

                        {menuItems.slice(1).map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.key} onClick={() => setMobileMenuVisible(false)}>
                                    {item.label}
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Drawer>
                {/* Language Switcher (Desktop) */}
                <div className="desktop-language-switcher" style={{ marginLeft: 'auto', marginRight: 16 }}>
                    <Dropdown overlay={languageMenu}>
                        <Button icon={<DownOutlined />}>
                            {i18n.language === 'vi' ? '🇻🇳 Tiếng Việt' : '🇨🇳 中文'}
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </Header>
    );
};

export default MainHeader;
