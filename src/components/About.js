import React from 'react';
import { Breadcrumb, Card, Col, Layout, Row, Typography } from 'antd';
import { HomeOutlined, TeamOutlined, InfoCircleOutlined, StarOutlined, SmileOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const AboutPage = () => {
    return (
        <Content className="policy-shipping-content">
            {/* Breadcrumb */}
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>About Us</Breadcrumb.Item>
            </Breadcrumb>

            {/* Header */}
            <div className="page-header">
                <Title>About Us</Title>
                <Text>Welcome to LeVa Nails – Where Beauty Meets Convenience!</Text>
            </div>


            {/* Giới thiệu về LeVA Nails */}
            <Card className="about-section">
                <Title level={3}>Welcome to LeVa Nails – Where Beauty Meets Convenience!</Title>
                <Paragraph>
                    Hi! I'm <b>Sophia</b>, a passionate nail technician with over 12 years of experience in the nail industry and
                    the proud owner of a successful nail salon for the past 5 years. Throughout my journey, I’ve dedicated myself
                    to the art of nail design, helping clients feel confident and beautiful with every set of nails I create.
                </Paragraph>
                <Paragraph>
                    Now, I’m excited to bring that same level of expertise and creativity to you with my new line of premium
                    press-on nails! Designed for those who love salon-quality nails but want the convenience of applying them
                    anytime, anywhere, our press-on nails combine style, durability, and comfort.
                </Paragraph>
            </Card>

            {/* Đội ngũ của LeVA Nails */}
            <Card className="team-section">
                <Title level={3}>
                    <TeamOutlined style={{ marginRight: 8 }} /> Meet Our Team
                </Title>
                <Paragraph>
                    At <b>LeVa Nail</b>, it’s not just me — I’m backed by a talented team of experienced nail artists who share the same passion
                    for quality and creativity. Together, we handcraft each set of press-on nails with love and precision. Our team specializes
                    in different styles and techniques, allowing us to offer a wide variety of designs, from chic minimalism to bold, intricate nail art.
                </Paragraph>
            </Card>

            {/* Điều làm cho sản phẩm của LeVA Nails đặc biệt */}
            <Card className="about-values">
                <Title level={3}>What Makes Our Custom Press-On Nails Unique?</Title>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <Card className="value-card">
                            <Title level={4}><StarOutlined style={{ marginRight: 8 }} /> Tailored Just for You</Title>
                            <Paragraph>Unlike mass-produced press-ons, our custom sets are made to perfectly match your nail size, shape, and personal style.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card className="value-card">
                            <Title level={4}><StarOutlined style={{ marginRight: 8 }} /> Salon-Quality Materials</Title>
                            <Paragraph>We use high-grade salon materials to create durable, long-lasting, and reusable press-ons.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card className="value-card">
                            <Title level={4}><StarOutlined style={{ marginRight: 8 }} /> Handcrafted by Experts</Title>
                            <Paragraph>Every set is hand-painted by our skilled team, ensuring attention to detail and flawless finishes.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card className="value-card">
                            <Title level={4}><StarOutlined style={{ marginRight: 8 }} /> One-of-a-Kind Designs</Title>
                            <Paragraph>With multiple artists on board, we offer a diverse range of styles — and each set is made uniquely for you.</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card className="value-card">
                            <Title level={4}><StarOutlined style={{ marginRight: 8 }} /> Perfect Fit & Comfort</Title>
                            <Paragraph>Our team takes time to customize each set so it not only looks amazing but feels comfortable and secure.</Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Card>

            {/* Kết luận & lời cảm ơn */}
            <Card className="about-thankyou">
                <Title level={3}><SmileOutlined style={{ marginRight: 8 }} /> Thank You!</Title>
                <Paragraph>
                    Whether you’re getting ready for a big event or just want fabulous nails for every day, our team is here to
                    create custom press-on nails that reflect your style — salon-quality nails in minutes, no appointment needed!
                </Paragraph>
                <Paragraph>
                    Thank you for supporting our passion and being part of this exciting new chapter. We can’t wait to create something
                    beautiful just for you!
                </Paragraph>
            </Card>

            {/* Liên hệ */}
            <Card className="contact-section">
                <Title level={4}>Want to connect with us?</Title>
                <Text>We'd love to hear from you! Reach out to us anytime.</Text>
                <a href="https://www.instagram.com/direct/t/17844528411411571" target="_blank" rel="noopener noreferrer">
                    Contact Us
                </a>
            </Card>
        </Content>
    );
};

export default AboutPage;
