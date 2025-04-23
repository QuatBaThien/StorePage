import React from 'react';
import { Breadcrumb, Card, Col, Image, Layout, Row, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

const SizeGuide = () => {
    const leftImages = [
        "/measure.png",
        "https://cdn.shopify.com/s/files/1/0825/4275/6119/files/How_to_find_your_size_480x480.png?v=1714033495",
        "https://cdn.shopify.com/s/files/1/0825/4275/6119/files/new_nail_shape_2_480x480.jpg?v=1734945174"
    ];

    const rightImages = [
        "https://cdn.shopify.com/s/files/1/0825/4275/6119/files/presson_toenails_sizeguide_480x480.jpg?v=1718875000",
        "/nail_shape.jpg"
    ];

    return (
        <Content className="guide-content">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Size Guide</Breadcrumb.Item>
            </Breadcrumb>

            <div className="guide-header">
                <div className="header-content">
                    <Title level={2}>Nail Size Guide</Title>
                    {/*<Text>Complete guide for perfect nails</Text>*/}
                </div>
            </div>

            {/* Sắp xếp ảnh thành 2 cột */}
            <Row gutter={[24, 24]} justify="center">
                {/* Cột bên trái */}
                <Col xs={24} lg={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {leftImages.map((src, index) => (
                        <Card key={index} className="guide-section application-guide" style={{ textAlign: 'center', width: '100%' }}>
                            <Image
                                src={src}
                                alt={`Application step ${index + 1}`}
                                style={{
                                    width: '100%',
                                    maxWidth: '600px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                        </Card>
                    ))}
                </Col>

                {/* Cột bên phải */}
                <Col xs={24} lg={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {rightImages.map((src, index) => (
                        <Card key={index} className="guide-section application-guide" style={{ textAlign: 'center', width: '100%' }}>
                            <Image
                                src={src}
                                alt={`Application step ${index + 4}`}
                                style={{
                                    width: '100%',
                                    maxWidth: '600px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                        </Card>
                    ))}
                </Col>
            </Row>
        </Content>
    );
};

export default SizeGuide;
