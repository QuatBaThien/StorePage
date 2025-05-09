import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
    InstagramOutlined,
    FacebookOutlined,
    TwitterOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import {useTranslation} from "react-i18next";

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const MainFooter = () => {
    const { t, i18n } = useTranslation();
    return (
        <Footer className="main-footer">
            <div className="footer-content">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <div className="logo">
                                <img src="/logo_qiqiang.png" alt="tong kho qi qi ang" style={{ width: "100%", height: "100%" }} />
                            </div>
                            <Paragraph className="footer-description">
                                {t('shop_footer')}
                            </Paragraph>
                            <Space className="social-links">
                                <a href="https://zalo.me/0866041318" target="_blank" rel="noopener noreferrer">
                                    <img src="/zalo.svg" alt="Zalo" style={{width: 24, height: 24}}/>
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=100094043952973" target="_blank" rel="noopener noreferrer">
                                    <img src="/Facebook.svg" alt="Zalo" style={{width: 24, height: 24}}/>
                                </a>
                            </Space>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4}>{t('quick_link')}</Title>
                            <ul className="footer-links">
                                <li><Link to="/">{t('home')}</Link></li>
                                <li><Link to="/products">{t('products')}</Link></li>
                            </ul>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4}>{t('more_info')}</Title>
                            <ul className="footer-links">
                                <li><Link to="/policy"><i className="fas fa-shipping-fast"></i> {t('policy')}</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4} className="white-text">{t('contact')}</Title>
                            <ul className="contact-info">
                                <li>
                                    <Text className="white-text">
                                        {t('hanoi')} <br /> {t('hanoi_diachi')} <br /> {t('hanoi_phone')}
                                    </Text>
                                </li>
                                <li>
                                    <Text className="white-text">
                                        {t('hochiminh')} <br /> {t('hcm_diachi')} <br /> {t('hcm_phone')}
                                    </Text>
                                </li>
                                <li>
                                    <Text className="white-text">Email: phuongkhoi135@gmail.com</Text>
                                </li>
                            </ul>
                        </div>
                    </Col>

                </Row>

                <div className="footer-bottom">
                    <Text className="copyright">
                        © {new Date().getFullYear()} QI QIANG VIET NAM. All rights reserved.
                    </Text>
                </div>
            </div>
        </Footer>
    );
};

export default MainFooter;
