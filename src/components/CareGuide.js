import React from 'react';
import {Alert, Breadcrumb, Card, Col, Image, Layout, Row, Steps, Table, Typography} from 'antd';
import {HomeOutlined, InfoCircleOutlined, SafetyOutlined, WarningOutlined} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const CareGuide = () => {


    return (

        <Content className="guide-content">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Care Guide</Breadcrumb.Item>
            </Breadcrumb>
            <div className="guide-header">
                <div className="header-content">
                    <Title level={2}>Nail Care Guide</Title>
                    {/*<Text>Complete guide for perfect nails</Text>*/}
                </div>
            </div>

            {/* Safety Alert */}
            <Alert
                message="Important Safety Notice"
                description="Please read all instructions carefully before applying or removing nails. If you experience any adverse reactions, discontinue use immediately and seek medical attention if necessary."
                type="warning"
                showIcon
                icon={<SafetyOutlined />}
                className="safety-alert"
            />

            {/* Sizing Guide */}
            {/*<Card className="guide-section sizing-guide">*/}
            {/*    <Row gutter={[24, 24]} align="middle">*/}
            {/*        <Col xs={24} md={12}>*/}
            {/*            <Title level={3}>Sizing Guide</Title>*/}
            {/*            <Paragraph>*/}
            {/*                Finding the right size is crucial for a comfortable and long-lasting fit.*/}
            {/*                Measure your nails at their widest point for the best results.*/}
            {/*            </Paragraph>*/}
            {/*            <Table*/}
            {/*                columns={sizeColumns}*/}
            {/*                dataSource={sizeData}*/}
            {/*                pagination={false}*/}
            {/*                className="size-table"*/}
            {/*            />*/}
            {/*        </Col>*/}
            {/*        <Col xs={24} md={12}>*/}
            {/*            <div className="sizing-images">*/}
            {/*                <Image*/}
            {/*                    src="https://cdn.shopify.com/s/files/1/0825/4275/6119/files/How_to_find_your_size_480x480.png?v=1714033495"*/}
            {/*                    alt="Nail sizing guide"*/}
            {/*                    className="guide-image"*/}
            {/*                />*/}
            {/*                <div className="image-caption">*/}
            {/*                    How to measure your nail width correctly*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Card>*/}

            {/* Application Guide */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Card
                        className="guide-section application-guide"
                        style={{ textAlign: 'center', padding: 'none'}}
                    >
                        {/*<Title level={3}>Application Guide</Title>*/}
                        <div >
                            <Image
                                src={`/guide_glue.png`}
                                alt="Application step"
                                style={{
                                    width: '100%',
                                    // maxWidth: '300px',
                                    height: 'auto',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                    </Card>
                </Col>


                <Col xs={24} lg={12}>
                    <Card
                        className="guide-section application-guide"
                        style={{ textAlign: 'center'}}
                    >
                        {/*<Title level={3}>Application Guide</Title>*/}
                        <div >
                            <Image
                                src={`/guide_tab.png`}
                                alt="Application step"
                                style={{
                                    width: '100%',
                                    // maxWidth: '300px',
                                    height: 'auto',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[24, 24]} style={{ display: 'flex', justifyContent: 'center' }}>
                <Col xs={24} lg={12}>
                    <Card className="guide-section application-guide" style={{ textAlign: 'center' }}>
                        <div>
                            <Image
                                src={`/guide_remove.png`}
                                alt="Application step"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>


            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Card
                        className="guide-section application-guide"
                        style={{ textAlign: 'center' }}
                    >
                        {/*<Title level={3}>Application Guide</Title>*/}
                        <div >
                            <Image
                                src={`/guide_remove2.png`}
                                alt="Application step"
                                style={{
                                    width: '100%',
                                    // maxWidth: '300px',
                                    height: 'auto',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                    </Card>
                </Col>


                <Col xs={24} lg={12}>
                    <Card
                        className="guide-section application-guide"
                        style={{ textAlign: 'center' }}
                    >
                        {/*<Title level={3}>Application Guide</Title>*/}
                        <div >
                            <Image
                                src={`/aftercare.png`}
                                alt="Application step"
                                style={{
                                    width: '100%',
                                    // maxWidth: '300px',
                                    height: 'auto',
                                    borderRadius: '8px'
                                }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>


        </Content>
    );
};

export default CareGuide;