import React, { useState } from 'react';
import { Button, Drawer, Layout, Menu, Dropdown } from 'antd';
import { Link, useLocation } from 'react-router-dom';
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

    // Collections for the dropdown
    const collections = [
        { key: 'new', label: 'New Arrivals' },
        { key: 'spring', label: 'Spring Collection' },
        { key: 'tools', label: "Tools & Accessories" },
        // { key: 'summer', label: 'Summer Collection' },
        // { key: 'autumn', label: 'Autumn Collection' },
        // { key: 'winter', label: 'Winter Collection' },
    ];

    // Other menu items
    const menuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: 'Home',
        },
        {
            key: '/care-guide',
            icon: <i className="fas fa-heart"></i>,
            label: 'Care guide',
        },
        {
            key: '/size-guide',
            icon: <i className="fas fa-ruler"></i>,
            label: 'Size guide',
        },
        {
            key: '/policy',
            icon: <i className="fas fa-shipping-fast"></i>,
            label: 'Policy',
        },
        {
            key: '/faq',
            icon: <i className="fa-solid fa-message"></i>,
            label: 'FAQ',
        },
        {
            key: '/about',
            icon: <i className="fas fa-user-circle"></i>,
            label: 'About Us',
        },
    ];


    return (

        <Header className="main-header">
            <div className="header-content">
                <Link to="/" className="logo">
                    <img src="/levalogotrans.png" alt="LeVa Press-on Nails Logo" style={{
                        width: "auto",
                        maxWidth: "200px",
                        objectFit: "contain"
                    }}  />
                    <span>LeVa Press-on Nails</span>
                </Link>

                {/* Mobile menu button */}
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
                    {/* Home Menu Item */}
                    <Menu.Item key="/" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>

                    {/* Products Dropdown */}
                    <SubMenu
                        key="/products"
                        icon={<ShoppingOutlined />}
                        title="Products"
                        className={location.pathname.startsWith('/products') ? 'ant-menu-item-selected' : ''}
                    >
                        <Menu.Item key="/products">
                            <Link to="/products">All Products</Link>
                        </Menu.Item>
                        <Menu.Divider />
                        {collections.map(collection => (
                            <Menu.Item key={`/products/${collection.key}`}>
                                <Link to={`/products?collection=${collection.key}`}>
                                    {collection.label}
                                </Link>
                            </Menu.Item>
                        ))}
                    </SubMenu>

                    {/* Other Menu Items */}
                    {menuItems.slice(1).map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>

                {/* Mobile Menu Drawer */}
                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={() => setMobileMenuVisible(false)}
                    open={mobileMenuVisible}
                    className="mobile-menu-drawer"
                >
                    <Menu mode="inline" selectedKeys={[location.pathname]}>
                        {/* Home Item */}
                        <Menu.Item key="/" icon={<HomeOutlined />}>
                            <Link to="/" onClick={() => setMobileMenuVisible(false)}>
                                Home
                            </Link>
                        </Menu.Item>

                        {/* Products Dropdown in Mobile */}
                        <SubMenu key="/products" icon={<ShoppingOutlined />} title="Products">
                            <Menu.Item key="/products">
                                <Link to="/products" onClick={() => setMobileMenuVisible(false)}>
                                    All Products
                                </Link>
                            </Menu.Item>
                            <Menu.Divider />
                            {collections.map(collection => (
                                <Menu.Item key={`/products/${collection.key}`}>
                                    <Link
                                        to={`/products?collection=${collection.key}`}
                                        onClick={() => setMobileMenuVisible(false)}
                                    >
                                        {collection.label}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>

                        {/* Other Menu Items */}
                        {menuItems.slice(1).map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={item.key} onClick={() => setMobileMenuVisible(false)}>
                                    {item.label}
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Drawer>
            </div>
        </Header>
    );
};

export default MainHeader;