import React, {useState} from 'react';
import {Breadcrumb, Button, Card, Col, Collapse, Input, Layout, Row, Typography} from 'antd';
import {CarOutlined, HomeOutlined, RollbackOutlined, SearchOutlined, ShoppingOutlined,} from '@ant-design/icons';

const {Content} = Layout;
const {Title, Paragraph, Text} = Typography;
const {Panel} = Collapse;

const FAQPage = () => {
    const [searchText, setSearchText] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        {
            key: 'orders',
            icon: <ShoppingOutlined/>,
            title: 'Orders & Products',
            color: '#ff66b2',
            questions: [
                {
                    q: 'What comes in the package?',
                    a: 'Each order includes:\n' +
                        '- Your selected set of 10 press-on nails\n' +
                        '- An application kit with:\n' +
                        '  + Nail glue (not included for international orders)\n' +
                        '  + Two sticky tabs\n' +
                        '  + Nail buffer\n' +
                        '  + Nail file\n' +
                        '  + Cuticle pusher\n' +
                        '  + Alcohol wipes\n' +
                        'For international orders: Due to shipping restrictions, nail glue is not included. Instead, extra adhesive tabs are provided. You can purchase nail glue at your local beauty or drug store.\n'


                },
                {
                    q: 'How do I find the right nail size?',
                    a: 'Measure your nails using a soft measuring tape or a piece of sticky tape. ' +
                        'Refer to our <a href="/guide" target="_blank" rel="noopener noreferrer">sizing guide</a> for details. If none of the standard sizes fit, select "custom" and enter your measurements in the instruction box at checkout.'
                },
                {
                    q: 'What if the nails don’t fit?',
                    a: 'Too big? File the sides down slightly for a better fit.\n' +
                        'Too small? If the nail is too curved, gently press it against a warm glass of water to slightly stretch and flatten it.\n'
                },
                {
                    q: 'How long do press-on nails last?',
                    a: 'Temporary wear (1-2 days): Use sticky tabs for easy application and removal.\n'+
                    'Tip: Heat the adhesive tabs with a hairdryer for 20 seconds before applying the nails to improve hold.\n'+
                        'Extended wear (up to 3 weeks): Apply with nail glue and follow proper nail prep.'

                },
                {
                    q: 'Can I wear press-on nails during daily activities?',
                    a: 'Yes! However, avoid long exposure to water, strong chemicals, or activities that may put stress on the nails. Press-ons are accessories, not tools.'
                },
                {
                    q: 'How do I take care of matte finish nails?',
                    a: 'Matte nails require extra care. Here are some tips:\n' +
                        'Clean regularly with wet or alcohol wipes.\n' +
                        'Wash with soap if needed.\n' +
                        'Use a soft brush (like an old toothbrush) for stubborn stains.\n'
                },
                {
                    q: 'How do I remove press-on nails?',
                    a: 'See our <a href="/guide">removal guide</a> for step-by-step instructions.\n'
                },
                {
                    q: 'Can I reuse my press-on nails?',
                    a: 'With sticky tabs: Yes! They can be reused multiple times.\n' +
                        'With nail glue: Nails can be reused 2-3 times. To remove glue residue, gently file or use an electric drill, then clean with an alcohol wipe.'
                },
                {
                    q: 'What if I need an extra application kit?',
                    a: ' If gifting a set, leave a note at checkout, and we’ll include another.'
                },
                {
                    q: 'Additional Notes\n',
                    a: 'Colors may appear slightly different due to screen settings.\n' +
                        'If you are between sizes, size up for a better fit.\n' +
                        'Each set is 100% handmade, so slight variations may occur.\n'
                }
            ]
        },
        {
            key: 'shipping',
            icon: <CarOutlined/>,
            title: 'Shipping & Delivery',
            color: '#36cfc9',
            questions: [
                {
                    q: 'Do you ship internationally?',
                    a: 'Note: Orders outside of Canada may be subject to customs or taxes, which are the customer\'s responsibility.'
                },
                {
                    q: 'Why is my order taking so long to ship?',
                    a: 'Each set is handmade and created in the order received. Depending on the design, it can take 2-3 hours to make a single set. We work as quickly as possible while ensuring quality.'
                },
                {
                    q: 'How long will my package take to arrive?',
                    a: 'Canada: 4-6 business days\n' +
                        'USA: 5-8 business days\n' +
                        'International: 12+ business days'
                },
                {
                    q: 'What if my package is lost?\n',
                    a: 'Once shipped, we have no control over delivery. If the address provided was correct, contact your local postal service for assistance.'
                }
            ]
        },
        {
            key: 'returns',
            icon: <RollbackOutlined/>,
            title: 'Returns & Refunds',
            color: '#ffa940',
            questions: [
                {
                    q: 'Do you accept exchanges or refunds?',
                    a: 'Due to hygiene reasons, all sales are final. Please double-check your order and nail size before purchasing.'
                }
            ]
        }
    ];

    const filterQuestions = (questions) => {
        if (!searchText) return questions;
        return questions.filter(
            q => q.q.toLowerCase().includes(searchText.toLowerCase()) ||
                q.a.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const getDisplayedCategories = () => {
        if (activeCategory === 'all') return categories;
        return categories.filter(cat => cat.key === activeCategory);
    };

    return (
        <Content className="faq-content">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item >FAQ</Breadcrumb.Item>
            </Breadcrumb>
            <div className="faq-header">
                <Title>Frequently Asked Questions</Title>
                <Text>Find answers to common questions about our products and services</Text>

                <div className="search-section">
                    <Input
                        prefix={<SearchOutlined/>}
                        placeholder="Search for answers..."
                        onChange={(e) => setSearchText(e.target.value)}
                        className="search-input"
                        allowClear
                    />
                </div>
            </div>

            <Card className="category-selector">
                <div className="category-buttons">
                    <Button
                        type={activeCategory === 'all' ? 'primary' : 'default'}
                        onClick={() => setActiveCategory('all')}
                        className="category-btn all"
                    >
                        All Topics
                    </Button>
                    {categories.map(category => (
                        <Button
                            key={category.key}
                            type={activeCategory === category.key ? 'primary' : 'default'}
                            icon={category.icon}
                            onClick={() => setActiveCategory(category.key)}
                            className={`category-btn ${category.key}`}
                            style={{
                                '--category-color': category.color,
                                borderColor: activeCategory === category.key ? category.color : undefined,
                                backgroundColor: activeCategory === category.key ? category.color : undefined
                            }}
                        >
                            {category.title}
                        </Button>
                    ))}
                </div>
            </Card>

            <Row gutter={[24, 24]} className="faq-grid">
                {getDisplayedCategories().map(category => (
                    <Col xs={24} md={activeCategory === 'all' ? 24 : 24} lg={activeCategory === 'all' ? 24 : 24}
                         key={category.key}>
                        <Card
                            className="category-card"
                            title={
                                <div className="category-title">
                                    {category.icon}
                                    <span>{category.title}</span>
                                </div>
                            }
                            style={{
                                '--category-color': category.color,
                                borderTop: `3px solid ${category.color}`
                            }}
                        >
                            <Collapse
                                className="faq-collapse"
                                expandIconPosition="end"
                            >
                                {filterQuestions(category.questions).map((q, index) => (
                                    <Panel header={q.q} key={index} className="faq-panel">
                                        <Paragraph>
                                            {q.a.includes("<") ? (
                                                // Nếu có HTML, render bằng dangerouslySetInnerHTML
                                                <span dangerouslySetInnerHTML={{ __html: q.a }} />
                                            ) : (
                                                // Nếu chỉ có xuống dòng, dùng split("\n")
                                                q.a.split("\n").map((line, i) => (
                                                    <Text key={i} style={{ display: "block" }}>{line}</Text>
                                                ))
                                            )}
                                        </Paragraph>
                                    </Panel>


                                ))}
                            </Collapse>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card className="contact-section">
                <Title level={4}>Still have questions?</Title>
                <Text>Can't find the answer you're looking for? Please chat to our friendly team.</Text>
                <Button href={'https://www.instagram.com/direct/t/17844528411411571'}  type="primary" size="large" className="contact-button">
                    Contact Us
                </Button>
            </Card>
        </Content>
    );
};

export default FAQPage;