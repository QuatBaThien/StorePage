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
import {useTranslation} from "react-i18next";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
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
                    <HomeOutlined/>
                    <span>{t('home')}</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{t('products')}</Breadcrumb.Item>
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
                                <Rate disabled defaultValue={product?.rating === 0 ? 5 : product?.rating} size="small" />
                                {/*<Text className="review-count">*/}
                                {/*    ({product.reviews} Reviews)*/}
                                {/*</Text>*/}
                            </div>

                            <div className="product-price-detail">
                                {product.originalPrice && (
                                    <Text delete className="original-price">
                                        {product.originalPrice} VNĐ
                                    </Text>
                                )}
                                <Text className="current-price">
                                    {product.price} VNĐ
                                </Text>
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
                        <TabPane tab={t('product_info')} key="1">
                            <Card>
                                <Row>
                                    <Col span={12}>
                                        <Paragraph><strong>{t('common_info')}</strong></Paragraph>
                                        <ul style={{listStyleType: "none", paddingLeft: 0}}>
                                            {product.product_Info?.split("+").map((item, index) => {
                                                const parts = item.split(":");
                                                const label = parts[0]?.trim();
                                                const value = parts.slice(1).join(":").trim();
                                                return (
                                                    <li key={index} style={{marginBottom: "6px"}}>
                                                        {value
                                                            ? <><strong>{label}:</strong> {value}</>
                                                            : <>{label}</>}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Col>
                                    <Col span={12}>
                                        <Paragraph><strong>{t('how_to_use')}</strong></Paragraph>
                                        <ul style={{paddingLeft: "20px"}}>
                                            {(() => {
                                                const usagePart = product.how_to_use?.split("Lưu ý:")[0] || "";
                                                if (usagePart.includes("Bước")) {
                                                    return usagePart
                                                        .split("Bước")
                                                        .slice(1)
                                                        .map((step, index) => (
                                                            <li key={index} style={{marginBottom: "6px"}}>
                                                                <span>Bước {step.trim()}</span>
                                                            </li>
                                                        ));
                                                } else {
                                                    return usagePart
                                                        .split("-")
                                                        .slice(1)
                                                        .map((step, index) => (
                                                            <li key={index} style={{marginBottom: "6px"}}>
                                                                {step.trim()}
                                                            </li>
                                                        ));
                                                }
                                            })()}
                                        </ul>

                                        {product.how_to_use.includes("Lưu ý") && (
                                            <>
                                                <Paragraph><strong>{t('warning')}</strong></Paragraph>
                                                <ul style={{paddingLeft: "20px"}}>
                                                    {product.how_to_use
                                                        .split("Lưu ý:")[1]
                                                        ?.split("-")
                                                        .slice(1) // bỏ phần trước dấu "-" đầu tiên
                                                        .map((note, index) => (
                                                            <li key={index} style={{marginBottom: "4px"}}>
                                                            {note.trim()}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </>
                                        )}

                                    </Col>
                                </Row>


                            </Card>
                        </TabPane>
                    </>
                    }
                </Tabs>

                <div className="related-products">
                    <RelatedProducts currentProduct={product} products={products}/>
                </div>
            </div>
        </Content>
    );
};

export default ProductDetail;
