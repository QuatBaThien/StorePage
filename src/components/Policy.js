import React from 'react';
import { Layout, Typography, Card, Collapse, Timeline, Row, Col, Divider } from 'antd';
import {
    CarOutlined,
    SafetyCertificateOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    GlobalOutlined,
    SwapOutlined,
    ShoppingOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const PolicyShippingPage = () => {
    const shippingMethods = [
        {
            type: 'Canada Shipping',
            time: '4-6 business days\n',
            cost: '$10 and up',
            // free: 'Free for orders over $50'
        },
        {
            type: 'USA Shipping',
            time: '5-8 business days',
            cost: '$20$',
            // free: 'Free for orders over $100'
        },
        {
            type: 'International Shipping',
            time: '12+ business days',
            cost: 'Calculated at checkout',
            // free: 'Free for orders over $150'
        }
    ];

    return (
        <Content className="policy-shipping-content">
            <div className="page-header">
                <Title>Shipping & Policies</Title>
                <Text>Everything you need to know about our shipping and store policies</Text>
            </div>

            {/* Shipping Information */}
            <Card className="section-card">
                <Title level={2}>
                    <CarOutlined /> Shipping Information
                </Title>
                <Row gutter={[24, 24]}>
                    {shippingMethods.map((method, index) => (
                        <Col xs={24} md={8} key={index}>
                            <Card className="shipping-method-card">
                                <Title level={4}>{method.type}</Title>
                                <Timeline
                                    items={[
                                        {
                                            dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                                            children: <>Delivery Time: <Text strong>{method.time}</Text></>
                                        },
                                        {
                                            dot: <DollarOutlined style={{ fontSize: '16px' }} />,
                                            children: <>Cost: <Text strong>{method.cost}</Text></>
                                        },
                                        // {
                                        //     dot: <ShoppingOutlined style={{ fontSize: '16px' }} />,
                                        //     children: <Text type="success">{method.free}</Text>
                                        // }
                                    ]}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Divider />

                {/* Shipping Policies */}
                <Title level={3}>Shipping Policies</Title>
                <Collapse defaultActiveKey={['1']} className="policy-collapse">
                    <Panel header="Order Processing" key="1">
                        <Paragraph>
                            • Orders are processed in 3-7 days (not including shipping time)
                            <br />
                            •  If items are in stock, we may ship within 1-2 business days

                        </Paragraph>
                    </Panel>
                    <Panel header="International Shipping" key="2">
                        <Paragraph>
                            • Leva Press-on Nails ships worldwide!
                            <br />
                            • If your country isn’t available at checkout, contact us, and we’ll add it.
                        </Paragraph>
                    </Panel>
                </Collapse>
            </Card>

            {/* Store Policies */}
            <Card className="section-card">
                <Title level={2}>
                    <SafetyCertificateOutlined /> Store Policies
                </Title>

                {/* Return Policy */}
                <div className="policy-section">
                    <Title level={3}>
                        <SwapOutlined /> Return Policy
                    </Title>
                    <Collapse defaultActiveKey={['1']} className="policy-collapse">
                        <Panel header="Returns & Exchanges" key="1">
                            <ul className="policy-list">
                                <li>No returns or exchanges – Due to hygiene reasons, all sales are final. Each set is custom-made and cannot be resold.</li>
                                <li>Check your nail size before ordering – We are not responsible for incorrect sizing. If unsure, contact us for help. See our sizing <Link to={'/size-guide'}>guide</Link> and <Link to={'/faq'}>FAQ</Link> for tips.
                                </li>
                                <li>Customs & Taxes – Orders outside Canada may have additional charges. Customers are responsible for any customs fees.
                                </li>
                            </ul>
                        </Panel>
                        {/*<Panel header="Return Process" key="2">*/}
                        {/*    <ol className="process-list">*/}
                        {/*        <li>Contact customer service to initiate return</li>*/}
                        {/*        <li>Receive return authorization number</li>*/}
                        {/*        <li>Package item securely with original packaging</li>*/}
                        {/*        <li>Include return form and authorization number</li>*/}
                        {/*        <li>Ship to provided return address</li>*/}
                        {/*    </ol>*/}
                        {/*</Panel>*/}
                    </Collapse>
                </div>

                {/* Payment Policy */}
                {/*<div className="policy-section">*/}
                {/*    <Title level={3}>*/}
                {/*        <DollarOutlined /> Payment Policy*/}
                {/*    </Title>*/}
                {/*    <Card className="sub-section-card">*/}
                {/*        <Row gutter={[24, 24]}>*/}
                {/*            <Col xs={24} md={12}>*/}
                {/*                <Title level={4}>Accepted Payment Methods</Title>*/}
                {/*                <ul className="payment-list">*/}
                {/*                    <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>*/}
                {/*                    <li>PayPal</li>*/}
                {/*                    <li>Shop Pay</li>*/}
                {/*                    <li>Apple Pay</li>*/}
                {/*                </ul>*/}
                {/*            </Col>*/}
                {/*            <Col xs={24} md={12}>*/}
                {/*                <Title level={4}>Security</Title>*/}
                {/*                <Paragraph>*/}
                {/*                    All payments are securely processed using SSL encryption.*/}
                {/*                    We never store your full credit card information.*/}
                {/*                </Paragraph>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </Card>*/}
                {/*</div>*/}

                {/* Privacy Policy */}
                {/*<div className="policy-section">*/}
                {/*    <Title level={3}>*/}
                {/*        <GlobalOutlined /> Privacy Policy*/}
                {/*    </Title>*/}
                {/*    <Collapse className="policy-collapse">*/}
                {/*        <Panel header="Data Collection & Usage" key="1">*/}
                {/*            <Paragraph>*/}
                {/*                We collect personal information for order processing, shipping,*/}
                {/*                and to improve our services. Your data is never sold to third parties.*/}
                {/*            </Paragraph>*/}
                {/*        </Panel>*/}
                {/*        <Panel header="Cookie Policy" key="2">*/}
                {/*            <Paragraph>*/}
                {/*                We use cookies to enhance your shopping experience and provide*/}
                {/*                personalized service. You can manage cookie preferences in your browser settings.*/}
                {/*            </Paragraph>*/}
                {/*        </Panel>*/}
                {/*    </Collapse>*/}
                {/*</div>*/}

                {/* FAQ */}
                <div className="policy-section">
                    <Title level={3}>
                        <QuestionCircleOutlined /> Frequently Asked Questions
                    </Title>
                    <Collapse className="policy-collapse">
                        <Panel header="How do I track my order?" key="1">
                            <Paragraph>
                                Orders are carefully packed in bubble mailers with cute bags to keep your nails safe during shipping. However, we have no control over delivery times or lost mail. We’ll do our best to help track your package, but we can’t access your country’s mailing system.

                            </Paragraph>
                        </Panel>
                        <Panel header="What if my order arrives missing?" key="2">
                            <Paragraph>
                                Nail glue and cuticle oil are not included in orders outside of Canada due to airmail restrictions. Instead, we’ll provide extra adhesive tabs. You can buy nail glue at your local beauty or drug store.

                            </Paragraph>
                        </Panel>

                    </Collapse>
                </div>
            </Card>
        </Content>
    );
};

export default PolicyShippingPage;