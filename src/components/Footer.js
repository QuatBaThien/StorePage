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

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const MainFooter = () => {
    return (
        <Footer className="main-footer">
            <div className="footer-content">
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <div className="footer-logo">
                                <img src="/LeVALogo-slogan-E-PINK-1.png" alt="Luxury Nails Spa Logo" style={{ width: "100%", height: "100%" }} />
                                {/*<span>LeVa Press-on Nails</span>*/}
                            </div>
                            <Paragraph className="footer-description">
                                Your destination for premium nail care services and products.
                            </Paragraph>
                            <Space className="social-links">
                                <a href="https://www.instagram.com/leva_press/"><InstagramOutlined /></a>
                                <a href=" https://www.facebook.com/profile.php?id=61572997735327"><FacebookOutlined /></a>

                            </Space>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4}>Quick Links</Title>
                            <ul className="footer-links">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/products">Products</Link></li>
                            </ul>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4}>Customer Service</Title>
                            <ul className="footer-links">
                                <li><Link to="/faq"><i className="fa-solid fa-message"></i> FAQ</Link></li>
                                <li><Link to="/policy"><i className="fas fa-shipping-fast"></i> Policy</Link>
                                </li>
                                <li><Link to="/guide"><i className="fas fa-book"></i> Guide</Link></li>
                            </ul>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <div className="footer-section">
                            <Title level={4} className="white-text">Contact Info</Title>
                            <ul className="contact-info">
                                <li>
                                    <EnvironmentOutlined className="white-text" />
                                    <Text className="white-text">
                                        5100 Erin Mills Pky Mississauga <br /> L5M 4Z5 Canada
                                    </Text>
                                </li>
                                <li>
                                    <PhoneOutlined className="white-text" />
                                    <Text className="white-text">289 204 2333</Text>
                                </li>
                                <li>
                                    <MailOutlined className="white-text" />
                                    <Text className="white-text">Levanailsart@gmail.com</Text>
                                </li>
                            </ul>
                        </div>
                    </Col>

                </Row>

                <div className="footer-bottom">
                    <Text className="copyright">
                        © {new Date().getFullYear()} LeVa Press-on Nails. All rights reserved.
                    </Text>
                </div>
            </div>
        </Footer>
    );
};

export default MainFooter;