import React, { useRef, useEffect, useState } from 'react';
import { Card, Typography, Rate, Button, Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const RelatedProducts = ({ currentProduct, products }) => {
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    // Lọc sản phẩm cùng category và loại bỏ sản phẩm hiện tại
    const relatedProducts = products
        .filter(p => p.collection === currentProduct.collection && p.id !== currentProduct.id);

    const handleProductClick = (product) => {
        // Only navigate if we're not dragging
        if (!dragging) {
            navigate(`/products/${product.id}`, { state: { product, products } });
        }
    };

    // const handleAddToCart = (e, product) => {
    //     e.stopPropagation();
    //     console.log('Adding to cart:', product.name);
    // };

    // Determine number of products to show based on viewport width
    const getProductsToShow = () => {
        const width = window.innerWidth;
        if (width >= 1200) return 4;
        if (width >= 992) return 3;
        if (width >= 576) return 2;
        return 1;
    };

    // Add swipe and drag functionality
    useEffect(() => {
        const handleResize = () => {
            if (carouselRef.current) {
                // Force Carousel to update on window resize
                const currentSlide = carouselRef.current.innerSlider?.state?.currentSlide || 0;
                carouselRef.current.goTo(currentSlide);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Track dragging state to prevent navigation when user is dragging
    const handleMouseDown = () => setDragging(false);
    const handleMouseMove = () => setDragging(true);

    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: getProductsToShow(),
        slidesToScroll: 1,
        arrows: false,
        draggable: true,
        swipeToSlide: true,
        touchMove: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
        beforeChange: () => setDragging(false),
        afterChange: () => setDragging(false)
    };

    return (
        <Card className="related-products-section">
            <div className="related-products-header">
                <Title level={4}>Related Products</Title>
                <div className="scroll-controls">
                    <Button
                        type="default"
                        className="custom-arrow-btn prev-btn"
                        onClick={() => carouselRef.current.prev()}
                    >
                       <i className="fa-solid fa-chevron-left"></i>
                    </Button>
                    <Button
                        type="default"
                        className="custom-arrow-btn next-btn"
                        onClick={() => carouselRef.current.next()}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </Button>
                </div>
            </div>

            <div
                className="carousel-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
            >
                <Carousel ref={carouselRef} {...carouselSettings}>
                    {relatedProducts.map(product => (
                        <div key={product.id} className="carousel-item-wrapper">
                            <div className="related-product-wrapper">
                                <Card
                                    hoverable
                                    className="related-product-card"
                                    cover={
                                        <div className="product-image-container">
                                            <img alt={product.name} src={product.image} />
                                        </div>
                                    }
                                    onClick={() => handleProductClick(product)}
                                >
                                    <Title level={5} className="product-title">{product.name}</Title>
                                    <Rate disabled defaultValue={product?.rating === 0 ? 5 : product?.rating} size="small" />
                                    <div className="product-price">
                                        {product.originalPrice && (
                                            <Text delete type="secondary">
                                                ${product.originalPrice}
                                            </Text>
                                        )}
                                        <Text strong>${product.price}</Text>
                                    </div>
                                </Card>
                                {/*<Button*/}
                                {/*    type="primary"*/}
                                {/*    icon={<ShoppingCartOutlined />}*/}
                                {/*    className="add-to-cart-btn"*/}
                                {/*    onClick={(e) => handleAddToCart(e, product)}*/}
                                {/*>*/}
                                {/*    Add to Cart*/}
                                {/*</Button>*/}
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Add product counter dots for mobile view */}
            {/*<div className="product-counter-mobile">*/}
            {/*    {relatedProducts.length > 0 && `1/${relatedProducts.length}`}*/}
            {/*</div>*/}
        </Card>
    );
};

export default RelatedProducts;