import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Divider,
    Drawer,
    Image,
    Layout,
    Rate,
    Row,
    Tabs,
    Typography,
    Radio,
    Table
} from 'antd';
import {HomeOutlined, QuestionCircleOutlined, ShareAltOutlined} from '@ant-design/icons';
import Reviews from "./Reviews";
import RelatedProducts from "./RelatedProducts";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product, products } = location.state || {};
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedShape, setSelectedShape] = useState('almond');
    const [selectedSize, setSelectedSize] = useState('medium');
    const [selectedLength, setSelectedLength] = useState('medium');
    useEffect(() => {
        // console.log("Product received in ProductDetail:", product);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Thêm animation mượt khi scroll
        });
    }, [product]);
    if (!product) {
        navigate('/products');
        return null;
    }
    // console.log(product)
    const productImages = [
        product.image2,
        product.image3,
        product.image4,
        product.image5
    ].filter(img => img);
    const shapeOptions = [
        { label: 'Almond', value: 'almond' },
        { label: 'Square', value: 'square' },
        { label: 'Coffin', value: 'coffin' },
        { label: 'Stiletto', value: 'stiletto' },
        { label: 'French Almond', value: 'frenchalmond' }
    ];
    const getShapeOptions = () => {
        // If product.shape exists and is not empty
        if (product?.shape) {
            // Split by comma and trim whitespace
            const shapes = product.shape.split(',').map(shape => shape.trim());

            // Convert each shape string into the required format {value, label}
            return shapes.map(shape => ({
                value: shape.toLowerCase().replace(/\s+/g, '-'), // Normalize value
                label: shape // Use original shape name as label
            }));
        }

        // If product.shape doesn't exist, use the predefined shapeOptions
        return shapeOptions;
    };

    const displayOptions = getShapeOptions();
    const sizeOptions = [
        { label: 'XS', value: 'xs' },
        { label: 'S', value: 's' },
        { label: 'M', value: 'm' },
        { label: 'L', value: 'l' },
        { label: 'XL', value: 'xl' },
        { label: 'Custom', value: 'custom' },
    ];
// Function to get appropriate size options based on product
    const getSizeOptions = () => {
        // If product.size exists and is not empty
        if (product?.size) {
            // Split by comma and trim whitespace
            const sizes = product.size.split('-').map(size => size.trim());

            // Convert each size string into the required format {value, label}
            return sizes.map(size => ({
                value: size.toLowerCase().replace(/\s+/g, '-'), // Normalize value
                label: size // Use original size name as label
            }));
        }

        // If product.size doesn't exist, use the predefined sizeOptions
        return sizeOptions;
    };

// Get the appropriate options
    const displaySizeOptions = getSizeOptions();
    const lengthOptions = [
        { label: 'Short', value: 'short' },
        { label: 'Medium', value: 'medium' },
        { label: 'Long', value: 'long' },
        { label: 'Extra Long', value: 'extra-long' }
    ];
    return (
        <Content className="product-detail-content">
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
                <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </Breadcrumb>

            {/* Product Main Section */}
            <div className="product-main">
                <Row gutter={[48, 24]}>
                    {/* Product Images */}
                    <Col xs={24} md={12}>
                        <div className="product-images">
                            <Image.PreviewGroup>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    className="main-image"
                                />
                                <div className="thumbnail-images">
                                    {[product.image2, product.image3, product.image4, product.image5]
                                        .filter(Boolean)
                                        .map((img, index) => (
                                            <Image
                                                key={index}
                                                src={img}
                                                alt={img ? `${product.name} - ${index + 1}` : ""}
                                                className="thumbnail"
                                                width={200}
                                                height={150}
                                            />
                                        ))}
                                </div>

                            </Image.PreviewGroup>
                            {product.discount ? (
                                <div className="product-detail-badge discount">
                                    -{product.discount}% OFF
                                </div>
                            ) : null}
                            {product.isNew && (
                                <div className="product-detail-badge new">
                                    NEW
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Product Info */}
                    <Col xs={24} md={12}>
                        <div className="product-info-detail">
                            <Title level={2}>{product.name}</Title>

                            <div className="product-rating-detail">
                                <Rate disabled defaultValue={product.rating} />
                                <Text className="review-count">
                                    ({product.reviews} Reviews)
                                </Text>
                            </div>

                            <div className="product-price-detail">
                                {product.originalPrice && (
                                    <Text delete className="original-price">
                                        ${product.originalPrice}
                                    </Text>
                                )}
                                <Text className="current-price">
                                    ${product.price}
                                </Text>
                            </div>
                            <div className="product-options">
                                <div className="option-section">
                                    <div className="option-header">
                                        <Text strong>Collection:</Text>
                                    </div>
                                    <Radio.Group
                                        value={product?.collection}
                                        className="shape-options"
                                    >
                                        <Radio.Button key={product?.collection} value={product?.collection}>
                                            {product?.collection === 'new' ? 'New Arrivals' :
                                                product?.collection === 'tools' ? 'Tools & Accessories' :
                                                    product?.collection === 'spring' ? 'Spring Collection' :
                                                        product?.collection}
                                        </Radio.Button>
                                    </Radio.Group>

                                </div>
                                {product?.collection.toLowerCase().includes('tools') ? null :
                                    <>
                                <div className="option-section">
                                    <div className="option-header">
                                        <Text strong>Shape:</Text>
                                    </div>
                                    <Radio.Group
                                        value={selectedShape}
                                        onChange={e => setSelectedShape(e.target.value)}
                                        className="shape-options"
                                    >
                                        {displayOptions.map(option => (
                                            <Radio.Button key={option.value} value={option.value}>
                                                {option.label}
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>

                                </div>

                                <div className="option-section">
                                    <div className="option-header">
                                        <Text strong>Size:</Text>
                                        <Button
                                            type="text"
                                            icon={<QuestionCircleOutlined/>}
                                            onClick={() => setIsDrawerOpen(true)}
                                            className="size-guide-button"
                                        >
                                            Size Guide
                                        </Button>
                                    </div>
                                    <Radio.Group
                                        value={selectedSize}
                                        onChange={e => setSelectedSize(e.target.value)}
                                        className="size-options"
                                    >
                                        {displaySizeOptions.map(option => (
                                            <Radio.Button key={option.value} value={option.value}>
                                                {option.label}
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>
                                </div>

                                <div className="option-section">
                                    <div className="option-header">
                                        <Text strong>Length:</Text>
                                    </div>
                                    <Radio.Group
                                        value={selectedLength}
                                        onChange={e => setSelectedLength(e.target.value)}
                                        className="length-options"
                                    >
                                        {lengthOptions.map(option => (
                                            <Radio.Button key={option.value} value={option.value}>
                                                {option.label}
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>
                                </div>
                                    </>
                                }
                                <Drawer
                                    title="Size Guide"
                                    placement="right"
                                    onClose={() => setIsDrawerOpen(false)}
                                    open={isDrawerOpen}
                                    width={600}
                                    className="size-guide-drawer"
                                >
                                    <div className="size-guide-content">
                                        {/* How to measure - First image */}
                                        <div className="guide-section">
                                            <Title level={4}>How to Find Your Size</Title>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/measure.png`}
                                                alt="How to measure guide"
                                                className="guide-image horizontal"
                                            />
                                        </div>

                                        <Divider/>

                                        {/* How to measure - Second image */}
                                        <div className="guide-section">
                                            <img
                                                src="https://cdn.shopify.com/s/files/1/0825/4275/6119/files/How_to_find_your_size_480x480.png?v=1714033495"
                                                alt="Detailed size guide"
                                                className="guide-image horizontal"
                                            />
                                        </div>

                                        <Divider/>

                                        {/* Nail shapes */}
                                        <div className="guide-section">
                                            <Title level={4}>Nail Shapes</Title>
                                            <img
                                                src="https://cdn.shopify.com/s/files/1/0825/4275/6119/files/new_nail_shape_2_480x480.jpg?v=1734945174"
                                                alt="Nail shapes guide"
                                                className="guide-image square"
                                            />
                                        </div>

                                        <Divider/>

                                        {/* Press on toenails */}
                                        <div className="guide-section">
                                            <Title level={4}>Press-On Toenails Guide</Title>
                                            <img
                                                src="https://cdn.shopify.com/s/files/1/0825/4275/6119/files/presson_toenails_sizeguide_480x480.jpg?v=1718875000"
                                                alt="Press-on toenails guide"
                                                className="guide-image horizontal"
                                            />
                                        </div>
                                        {/* Press on toenails */}
                                        <div className="guide-section">
                                            <Title level={4}>Size Guide</Title>
                                            <img
                                                src="/nail_shape.jpg"
                                                alt="Press-on toenails guide"
                                                className="guide-image horizontal"
                                            />
                                        </div>

                                        <div className="size-notes">
                                            <Title level={5}>Important Notes:</Title>
                                            <ul className="notes-list">
                                                <li>Measure the widest part of your nail bed</li>
                                                <li>If between sizes, always size up</li>
                                                <li>Each set includes 10 nails in your chosen size</li>
                                                <li>For custom sizing, please contact us</li>
                                            </ul>
                                        </div>
                                    </div>
                                </Drawer>
                            </div>
                            <Divider/>

                            <Paragraph className="product-description">
                                {product.description}
                                <br/>

                            </Paragraph>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Product Details Tabs */}
            <div className="product-tabs">
                <Tabs defaultActiveKey="1">
                    {product?.collection.toLowerCase().includes('tools') ? null : <>
                        <TabPane tab="Description" key="1">
                            <Card>
                                <Row>
                                    <Col span={12}>
                                        <Paragraph>
                                            <strong>Product Features:</strong>
                                        </Paragraph>
                                        <ul className="features-list">
                                            <li>High-quality formula for long-lasting wear</li>
                                            <li>Easy to apply and remove</li>
                                            <li>Cruelty-free and vegan-friendly</li>
                                            <li>Professional salon quality</li>
                                        </ul>
                                        <Paragraph>
                                            <strong>How to Use:</strong>
                                        </Paragraph>
                                        <ol className="usage-steps">
                                            <li>Clean and prepare your nails</li>
                                            <li>Apply base coat and cure</li>
                                            <li>Apply product in thin layers</li>
                                            <li>Seal with top coat and cure</li>
                                        </ol>
                                    </Col>
                                    <Col span={12}>
                                        <div className="mb-6">
                                            <Paragraph><strong>What's Inside:</strong></Paragraph>
                                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                                <li>💅 10 hand-painted gel nails</li>
                                                <p></p>
                                                <li className="leading-relaxed">
                                                    🛠️ Application Kit:
                                                    <p className="text-gray-600">
                                                        Includes a mini file, mini buffer, cuticle pusher, sticky tabs,
                                                        nail glue, and alcohol wipes.
                                                    </p>
                                                </li>
                                                <li>📦 Ordering Info:</li>
                                                <p>If you order 1-3 sets, you'll receive one application kit.
                                                    <br/>Need an extra kit? Just leave a note at checkout, and I'll
                                                    include another (perfect for gifts!).</p>
                                                <li>📏 Custom Sizing:</li>
                                                <p>Choose "custom" at checkout and leave your nail measurements in the
                                                    instruction box.
                                                </p>
                                                <li>⚠️ Please Note:</li>
                                                <p>Colors may appear slightly different due to screen settings.
                                                    <br/>Check your nail size carefully before ordering. If unsure, go
                                                    one size up for the best fit.
                                                    <br/>Since each set is handmade, slight variations may occur.
                                                    <br/>Let me know if you'd like any changes! 😊</p>
                                            </ul>
                                        </div>
                                        {/*/!* Kit information *!/*/}
                                        {/*<p className="text-gray-700 mb-6 leading-relaxed">*/}
                                        {/*    📦 Ordering Info: If you order between 1-3 sets in a single order, only one application kit will*/}
                                        {/*    be*/}
                                        {/*    included.*/}
                                        {/*    If you would like or need a second application kit (i.e. gifting a set) just add*/}
                                        {/*    a note*/}
                                        {/*    on your order at checkout and I'll include another.*/}
                                        {/*</p>*/}

                                        {/*/!* Custom sizing *!/*/}
                                        {/*<p className="text-gray-700 mb-6">*/}
                                        {/*    For custom sizing, please select "custom" and leave your measurements in the*/}
                                        {/*    instruction*/}
                                        {/*    box at checkout.*/}
                                        {/*</p>*/}

                                        {/*/!* Important notes *!/*/}
                                        {/*<div className="space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-4">*/}
                                        {/*    <p className="flex items-start">*/}
                                        {/*        <span className="text-gray-400 mr-2">*</span>*/}
                                        {/*        Please note that colours may be different from the actual product depending*/}
                                        {/*        on the*/}
                                        {/*        viewing screen.*/}
                                        {/*    </p>*/}
                                        {/*    <p className="flex items-start">*/}
                                        {/*        <span className="text-gray-400 mr-2">*</span>*/}
                                        {/*        Please ensure to double-check your nail size and selection before ordering.*/}
                                        {/*        If you*/}
                                        {/*        are between sizes, it is safer to go up a size.*/}
                                        {/*    </p>*/}
                                        {/*    <p className="flex items-start">*/}
                                        {/*        <span className="text-gray-400 mr-2">*</span>*/}
                                        {/*        There may be slight variations to each set as they are 100% handmade.*/}
                                        {/*    </p>*/}
                                        {/*    <p className="flex items-start font-medium">*/}
                                        {/*        <span className="text-gray-400 mr-2">*</span>*/}
                                        {/*        All sales are final.*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}
                                    </Col>
                                </Row>


                            </Card>
                        </TabPane>
                        <TabPane tab="Reviews" key="2">
                            <Card>
                                <Reviews product={product}/>
                            </Card>
                        </TabPane>
                    </>
                    }
                    <TabPane tab="Shipping" key="3">
                        <Card>
                            <Paragraph>
                                <strong>Shipping Information:</strong>
                            </Paragraph>
                            <ul className="shipping-info">
                                <li>Canada: 4-6 business days

                                </li>
                                <li>USA: 5-8 business days</li>
                                <li>International: 12+ days</li>
                            </ul>
                        </Card>
                    </TabPane>
                </Tabs>

                <div className="related-products">
                    <RelatedProducts currentProduct={product} products={products}/>
                </div>
            </div>
        </Content>
    );
};

export default ProductDetail;