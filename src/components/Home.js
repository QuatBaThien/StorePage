import React, {useContext, useEffect, useRef, useState} from 'react';

import {
    Button,
    Card,
    Carousel,
    Col,
    DatePicker,
    Divider,
    FloatButton,
    Form,
    Input,
    Layout, message,
    Row,
    Select,
    TimePicker,
    Typography
} from 'antd';
import {ArrowUpOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {SheetContext} from "../SheetContext";
import CollectionItem from "./ProductCollection/CollectionItem";

const {Content, } = Layout;
const {Title, Paragraph} = Typography;
const {Option} = Select;

const Home = () => {
    const { data } = useContext(SheetContext);
    // const topProducts = data ? data.slice(0, 4) : [];
    const newArrivalsCarouselRef = useRef(null);
    const springCollectionCarouselRef = useRef(null);
    const newArrivals = data ? data.filter(product => product?.Collections === "New Arrivals") : [];
    const springCollection = data ? data.filter(product => product?.Collections === "Spring Collection") : [];

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupForm] = Form.useForm();
    const [showSubscribeBar, setShowSubscribeBar] = useState(true);
    const onFinish = async (values) => {
        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbyQzmADplBqAUTJxBbG9FQCBdR2h0x7zoMgYBMqc3X55eQ8MA4-zpwj2JXVNhq4vbZa/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
                mode: "no-cors"
            });

            // Do `no-cors`, không nhận response, giả sử gửi thành công
            message.success("Thank you for subscribing!");

            // Reset form và đóng popup
            form.resetFields();
            popupForm.resetFields();
            setShowPopup(false);

            // Lưu trạng thái popup vào localStorage
            localStorage.setItem('popupShown', 'true');
        } catch (error) {
            message.error("Submission failed. Please try again.");
        }
    };

    const handleSubscribeBarClick = () => {
        setShowPopup(true);
    };


    const galleryImages = [
        '/bannerIMG/banner1.png',
        '/bannerIMG/banner2.png',
        '/bannerIMG/banner3.png'

    ];
    const storeImages = [
        '/bannerIMG/store1.jpg',
        '/bannerIMG/store2.jpg',
        '/bannerIMG/store3.jpg',
        '/bannerIMG/store3.jpg',
    ]
    const announcements = [
        "LeVa Press-On Nails",
        "Skip the salon",
        "Save time and shine with our premium press-ons!"


    ];
    const imageRef = useRef(null);
    const [videoHeight, setVideoHeight] = useState(0);

    useEffect(() => {
        if (imageRef.current) {
            setVideoHeight(imageRef.current.clientHeight);
        }
    }, [storeImages]);
    // Show popup when component mounts
    useEffect(() => {
        // Check if the popup has been shown before
        const hasShownPopup = localStorage.getItem('popupShown');

        if (!hasShownPopup) {
            // Delay popup by 1 second for better UX
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);
    // Handle popup form submission
    // const handlePopupSubmit = (values) => {
    //     try {
    //         // Save that popup has been shown
    //         localStorage.setItem('popupShown', 'true');
    //
    //         // You can handle form submission here, e.g. sending to your API
    //         // For now, just close the popup and show success message
    //         setShowPopup(false);
    //         message.success('Thank you for signing up! You will receive 15% off on your first order.').then(r => setShowPopup(false));
    //     } catch (error) {
    //         message.error('Submission failed. Please try again.').then(r => setShowPopup(true));
    //     }
    // };

    // Close popup without submission
    const closePopup = () => {
        localStorage.setItem('popupShown', 'true');
        setShowPopup(false);
    };
    // Define carousel settings
    const carouselSettings = {
        dots: false,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ]
    };

    const renderNewArrivalItem = (product) => (
        <CollectionItem
            key={product.No}
            product={product}
            collectionName="New Arrival"
            // onClick={() => navigate("/products")}
        />
    );

    const renderSpringItem = (product) => (
        <CollectionItem
            key={product.No}
            product={product}
            collectionName="Spring"
            // onClick={() => navigate("/products")}
        />
    );
    return (

        <Layout className="layout">
            {/*<Header className="header">*/}
            {/*    <div className="logo">*/}
            {/*        <img src="/api/placeholder/40/40" alt="Luxury Nail Spa Logo" />*/}
            {/*        <span>Luxury Nail Spa</span>*/}
            {/*    </div>*/}
            {/*    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>*/}
            {/*        <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>*/}
            {/*        <Menu.Item key="2" icon={<InfoCircleOutlined />} ><Link to="/products">Products</Link></Menu.Item>*/}
            {/*        <Menu.Item key="3" icon={<InfoCircleOutlined />}>About</Menu.Item>*/}
            {/*        <Menu.Item key="4" icon={<ShoppingOutlined />}*/}
            {/*                   onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}>Services</Menu.Item>*/}
            {/*        <Menu.Item key="5" icon={<ScheduleOutlined />}>Appointments</Menu.Item>*/}
            {/*        <Menu.Item key="6" icon={<PhoneOutlined />}>Contact</Menu.Item>*/}
            {/*    </Menu>*/}
            {/*</Header>*/}
            {showSubscribeBar && (
                <div className="subscribe-bar" onClick={handleSubscribeBarClick}>
                    <div className="subscribe-bar-content">
                        <span>Subscribe to get 15% off</span>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <div className="popup-content">
                            <button className="popup-close" onClick={closePopup}>×</button>
                            <div className="popup-header">
                                <h2>WANT EXTRA 15% OFF? </h2>
                                <p>Subscribe to enjoy exclusive discounts on your first order! <span>💅</span></p>
                            </div>
                            <Form
                                form={popupForm}
                                onFinish={onFinish}
                                layout="vertical"
                                className="popup-form"

                            >
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter your name' }]}
                                >
                                    <Input placeholder="Your name" size="large" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input placeholder="Email" size="large" />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Please enter your phone number' }
                                    ]}
                                >
                                    <Input placeholder="Phone number" size="large" />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        size="large"
                                        className="popup-button"
                                    >
                                        SIGN UP
                                    </Button>
                                </Form.Item>
                                {/*<div className="popup-footer">*/}
                                {/*    <p>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a>.</p>*/}
                                {/*    <div className="popup-benefits">*/}
                                {/*        <div className="benefit-item">*/}
                                {/*            <span className="benefit-icon">✨</span>*/}
                                {/*            <span>Exclusive offers</span>*/}
                                {/*        </div>*/}
                                {/*        <div className="benefit-item">*/}
                                {/*            <span className="benefit-icon">🎁</span>*/}
                                {/*            <span>Birthday surprises</span>*/}
                                {/*        </div>*/}
                                {/*        <div className="benefit-item">*/}
                                {/*            <span className="benefit-icon">🔔</span>*/}
                                {/*            <span>New arrivals alerts</span>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </Form>
                        </div>
                    </div>
                </div>
            )}
            <Content className="content">
                <div className="hero-section">
                    <Carousel autoplay arrows={true} className="carousel">
                        {galleryImages.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`LeVa Nail Showcase ${index + 1}`}/>
                                <div className="carousel-content">
                                    <div style={{textAlign: "center"}}>
                                        <Button type="primary" size="large" onClick={() => navigate("/products")}>
                                            Shop Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="announcement-container">
                    <div className="announcement-track">
                        {/* Duplicate the items to create seamless loop */}
                        {[...announcements, ...announcements].map((text, index) => (
                            <span key={index} className="announcement-item">
            {text}
                                <span className="separator">★</span>
          </span>
                        ))}
                    </div>
                </div>

                <div className="welcome-section">
                    <Row gutter={[24, 24]} justify="center">
                        <Col xs={24} md={16}>
                            <Title level={2}>Welcome to LeVa Press-on Nails</Title>
                            <Paragraph>
                                Welcome to Leva — your one-stop destination for flawless, effortless beauty! Our premium press-on nails bring salon-quality style right to your
                                fingertips — no appointments, no hassle.
                                <br/> Whether you love timeless elegance or bold designs, Leva has the perfect set for every vibe.

                            </Paragraph>
                            <Paragraph>
                                Ready for instant glam? Just press, and you’re polished!
                            </Paragraph>
                        </Col>
                    </Row>
                </div>
                <Divider orientation="center" id="services-section">Our Shop</Divider>
                <div className="shop-section">
                    <Row gutter={[24, 24]} justify="center">
                        {storeImages.map((service, index) => (
                            <Col xs={12} sm={12} lg={6} key={index}>
                                <div className="image-container">
                                    {index === 3 ? (
                                        <iframe
                                            width="100%"
                                            height={videoHeight}
                                            src="https://www.youtube.com/embed/jroPE6B-Y3U"
                                            title="YouTube video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <img
                                            ref={index === 0 ? imageRef : null}
                                            src={service}
                                            alt={`Service ${index}`}
                                            className="full-image"
                                        />
                                    )}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>


                <Divider orientation="center" id="services-section">Our Products</Divider>

                {/*<div className="services-section">*/}
                {/*    <Row gutter={[24, 24]}>*/}
                {/*        {topProducts.map((service, index) => (*/}
                {/*            <Col xs={24} sm={12} lg={6} key={index}>*/}
                {/*                <Card*/}
                {/*                    hoverable*/}
                {/*                    cover={<img alt={service.Name} src={service.Image1}/>}*/}
                {/*                    className="service-card"*/}
                {/*                    onClick={() => navigate("/products")}*/}
                {/*                >*/}
                {/*                    <Card.Meta*/}
                {/*                        title={service.Name}*/}
                {/*                        description={service.Description}*/}
                {/*                    />*/}
                {/*                    <div className="price">${service.Price}</div>*/}

                {/*                </Card>*/}
                {/*            </Col>*/}
                {/*        ))}*/}
                {/*    </Row>*/}
                {/*    <div style={{textAlign: "center", marginTop: "20px"}}>*/}
                {/*        <Button type="primary" size="large" onClick={() => navigate("/products")}>*/}
                {/*            View All*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/*<Divider orientation="center">Subcribe us for more sale</Divider>*/}

                {/*<div className="appointment-section">*/}
                {/*    <Row gutter={[24, 24]} justify="center">*/}
                {/*        <Col xs={24} md={16} lg={12}>*/}
                {/*            <Card>*/}
                {/*                <Form*/}
                {/*                    form={form}*/}
                {/*                    layout="vertical"*/}
                {/*                    onFinish={onFinish}*/}
                {/*                >*/}
                {/*                    <Form.Item name="name" label="Full Name" rules={[{required: true}]}>*/}
                {/*                        <Input placeholder="Enter your full name"/>*/}
                {/*                    </Form.Item>*/}
                {/*                    <Form.Item name="email" label="Email" rules={[{required: true, type: 'email'}]}>*/}
                {/*                        <Input placeholder="Enter your email"/>*/}
                {/*                    </Form.Item>*/}
                {/*                    <Form.Item name="phone" label="Phone Number" rules={[{required: true}]}>*/}
                {/*                        <Input placeholder="Enter your phone number"/>*/}
                {/*                    </Form.Item>*/}

                {/*                    <Form.Item>*/}
                {/*                        <Button type="primary" htmlType="submit" block>Send</Button>*/}
                {/*                    </Form.Item>*/}
                {/*                </Form>*/}
                {/*            </Card>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}
                <div className="collections-section">
                    {/* New Arrivals Collection */}
                    <div className="collection-container">
                        <div className="collection-header">
                            <h2>
                                New Arrivals
                            </h2>
                            <a
                                className="view-all-link"
                                onClick={() => navigate("/products?collection=new")}
                            >
                                View All <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>

                        <div className="carousel-wrapper">
                            <Carousel
                                {...carouselSettings}
                                className="product-carousel"
                                swipeToSlide={true}
                                draggable={true}
                                ref={newArrivalsCarouselRef}
                            >
                                {newArrivals.map(product => renderNewArrivalItem(product))}
                            </Carousel>

                            {/* Custom navigation buttons */}
                            <button
                                className="custom-arrow custom-arrow-prev"
                                onClick={() => newArrivalsCarouselRef.current.prev()}
                                aria-label="Previous slide"
                            >
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                            <button
                                className="custom-arrow custom-arrow-next"
                                onClick={() => newArrivalsCarouselRef.current.next()}
                                aria-label="Next slide"
                            >
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </div>

                        {/*<div style={{textAlign: "center"}}>*/}
                        {/*    <Button type="primary" size="large" onClick={() => navigate("/products?collection=new")}>*/}
                        {/*        View All New Arrivals*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>

                    {/* Spring Collection */}
                    <div className="collection-container">
                        <div className="collection-header">
                            <h2>
                                Spring Collection
                            </h2>
                            <a
                                className="view-all-link"
                                onClick={() => navigate("/products?collection=spring")}
                            >
                                View All <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>

                        <div className="carousel-wrapper">
                            <Carousel
                                {...carouselSettings}
                                className="product-carousel"
                                swipeToSlide={true}
                                draggable={true}
                                ref={springCollectionCarouselRef}
                            >
                                {springCollection.map(product => renderSpringItem(product))}
                            </Carousel>

                            {/* Custom navigation buttons */}
                            <button
                                className="custom-arrow custom-arrow-prev"
                                onClick={() => springCollectionCarouselRef.current.prev()}
                                aria-label="Previous slide"
                            >
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                            <button
                                className="custom-arrow custom-arrow-next"
                                onClick={() => springCollectionCarouselRef.current.next()}
                                aria-label="Next slide"
                            >
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </div>

                        {/*<div style={{textAlign: "center"}}>*/}
                        {/*    <Button type="primary" size="large" onClick={() => navigate("/products?collection=spring")}>*/}
                        {/*        View Spring Collection*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <Divider orientation="center">Visit Us</Divider>

                <div className="contact-section">
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <Card>
                                <Title level={4}>Our Location</Title>
                                <Paragraph>
                                    5100 Erin Mills Pky<br/>
                                    Mississauga<br/>
                                    ON L5M 4Z5 Canada
                                </Paragraph>

                                <Title level={4}>Contact</Title>
                                <Paragraph>
                                    Phone: 289 204 2333<br/>
                                    Email: Levanailsart@gmail.com<br/>
                                    Facebook: <a href="https://www.facebook.com/profile.php?id=61572997735327"
                                                 target="_blank" rel="noopener noreferrer">LeVa Press-on Nails</a><br/>
                                    Instagram: <a href="https://www.instagram.com/leva_press" target="_blank"
                                                  rel="noopener noreferrer">LeVa Press-on Nails</a><br/>
                                </Paragraph>

                            </Card>
                        </Col>
                        <Col xs={24} md={12}>
                            <Card>
                                <div className="map-container">
                                    <iframe
                                        title="Google Map"
                                        width="100%"
                                        height="300"
                                        style={{border: 0, borderRadius: "10px"}}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAM2h6MDI71Cko-lX71erCEPvtRZi58F3s&q=5100 Erin Mills Pkwy, Mississauga, ON L5M 4Z5, Canadal"
                                    ></iframe>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </Content>

            {/*<Footer className="footer">*/}
            {/*    <div className="footer-content">*/}
            {/*        <div className="footer-logo">*/}
            {/*            <img src="/api/placeholder/40/40" alt="Luxury Nail Spa Logo" />*/}
            {/*            <span>Luxury Nail Spa</span>*/}
            {/*        </div>*/}
            {/*        <div className="social-links">*/}
            {/*            <a href="#"><InstagramOutlined /></a>*/}
            {/*            <a href="#"><FacebookOutlined /></a>*/}
            {/*            <a href="#"><TwitterOutlined /></a>*/}
            {/*        </div>*/}
            {/*        <div className="copyright">*/}
            {/*            © {new Date().getFullYear()} Luxury Nail Spa. All rights reserved.*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Footer>*/}
            {/* Floating Button using Ant Design's FloatButton */}

        </Layout>
    );
};

export default Home;