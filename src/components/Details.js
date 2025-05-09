import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Divider,
    Image,
    Layout,
    Rate,
    Row,
    Tabs,
    Typography,
} from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import RelatedProducts from "./RelatedProducts";
import { useTranslation } from 'react-i18next';
import { SheetContext } from "../SheetContext";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { data: sheetProducts } = useContext(SheetContext);

    const { product, products } = location.state || {};

    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        // Nếu không có product nhưng sheetProducts đã load => redirect về /products
        if (!product && sheetProducts.length > 0 && !redirected) {
            const id = location.pathname.split("/").pop();
            localStorage.setItem("previewProductId", id);
            navigate('/products');
            setRedirected(true);
        }
    }, [product, sheetProducts, location.pathname, navigate, redirected]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [product]);

    if (!product && sheetProducts.length === 0) {
        return <div>Loading...</div>; // chờ dữ liệu context
    }
    if (!product) {
        return null; // đã redirect
    }

    return (
        <Content className="product-detail-content">
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
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
                                    {[product.image2, product.image3, product.image4]
                                        .filter(Boolean)
                                        .map((img, index) => (
                                            <Image
                                                key={index}
                                                src={img}
                                                alt={`${product.name} - ${index + 1}`}
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
                        </div>
                    </Col>

                    {/* Product Info */}
                    <Col xs={24} md={12}>
                        <div className="product-info-detail">
                            <Title level={2}>{product.name}</Title>

                            <div className="product-rating-detail">
                                <Rate
                                    disabled
                                    defaultValue={product.rating === 0 ? 5 : product.rating}
                                    size="small"
                                />
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
                            <Divider />

                            <Paragraph className="product-description">
                                {product.description}
                            </Paragraph>

                            <div className="order-buttons">
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    href="tel:0866041318"
                                    style={{ marginRight: '12px' }}
                                >
                                    {t('order_product')}
                                </Button>

                                <Button
                                    type="default"
                                    shape="round"
                                    size="large"
                                    href="https://zalo.me/0866041318"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t('order_zalo')}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Product Details Tabs */}
            <div className="product-tabs">
                <Tabs defaultActiveKey="1">
                    {product.collection?.toLowerCase().includes('tools') ? null : (
                        <TabPane tab={t('product_info')} key="1">
                            <Card>
                                <Row>
                                    <Col span={12}>
                                        <Paragraph><strong>{t('common_info')}</strong></Paragraph>
                                        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                            {product.product_Info?.split("+").map((item, index) => {
                                                const parts = item.split(":");
                                                const label = parts[0]?.trim();
                                                const value = parts.slice(1).join(":").trim();
                                                return (
                                                    <li key={index} style={{ marginBottom: "6px" }}>
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
                                        <ul style={{ paddingLeft: "20px" }}>
                                            {(() => {
                                                const usagePart = product.how_to_use?.split("Lưu ý:")[0] || "";
                                                if (usagePart.includes("Bước")) {
                                                    return usagePart
                                                        .split("Bước")
                                                        .slice(1)
                                                        .map((step, index) => (
                                                            <li key={index} style={{ marginBottom: "6px" }}>
                                                                <span>Bước {step.trim()}</span>
                                                            </li>
                                                        ));
                                                } else {
                                                    return usagePart
                                                        .split("-")
                                                        .slice(1)
                                                        .map((step, index) => (
                                                            <li key={index} style={{ marginBottom: "6px" }}>
                                                                {step.trim()}
                                                            </li>
                                                        ));
                                                }
                                            })()}
                                        </ul>

                                        {product.how_to_use?.includes("Lưu ý") && (
                                            <>
                                                <Paragraph><strong>{t('warning')}</strong></Paragraph>
                                                <ul style={{ paddingLeft: "20px" }}>
                                                    {product.how_to_use
                                                        .split("Lưu ý:")[1]
                                                        ?.split("-")
                                                        .slice(1)
                                                        .map((note, index) => (
                                                            <li key={index} style={{ marginBottom: "4px" }}>
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
                    )}
                </Tabs>

                <div className="related-products">
                    <RelatedProducts currentProduct={product} products={products} />
                </div>
            </div>
        </Content>
    );
};

export default ProductDetail;
