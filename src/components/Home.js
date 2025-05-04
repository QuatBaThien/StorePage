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
import {useTranslation} from "react-i18next";

const {Content, } = Layout;
const {Title, Paragraph} = Typography;
const {Option} = Select;

const Home = () => {
    const { data } = useContext(SheetContext);
    const { t, i18n } = useTranslation();
    // const topProducts = data ? data.slice(0, 4) : [];
    const newArrivalsCarouselRef = useRef(null);
    const springCollectionCarouselRef = useRef(null);
    const bestSeller = data ? data.filter(product => product?.Collections === "QI QIANG") : [];
    const ortherProduct = data ? data.filter(product => product?.Collections === "Orther Product") : [];

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
        '/bannerIMG/background.png',
    ];
    const storeImages = [
        '/bannerIMG/store1.jpg',
        '/bannerIMG/store2.jpg',
        '/bannerIMG/store3.jpg',
        '/bannerIMG/store3.jpg',
    ]
    const announcements = [
        t('announcements_1'),
        t('announcements_2'),
        t('announcements_3'),
        t('announcements_4'),


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
            collectionName="Best Seller"
            onClick={() => navigate("/products?collection=qi")}
        />
    );
    const renderOrtherItem = (product) => (
        <CollectionItem
            key={product.No}
            product={product}
            collectionName="Orther Product"
            onClick={() => navigate("/products?collection=orther")}
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
            <Content className="content">
                <div className="hero-section">
                    <Carousel autoplay arrows={true} className="carousel">
                        {galleryImages.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`LeVa Nail Showcase ${index + 1}`}/>
                                <div className="carousel-content">
                                    <div style={{textAlign: "center"}}>
                                        <Button type="primary" size="large" onClick={() => navigate("/products")}>
                                            {t('shop_now')}
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


                <Divider orientation="center" id="services-section">{t('our_product')}</Divider>

                <div className="collections-section">
                    {/* QI QIANG Collection */}
                    <div className="collection-container">
                        <div className="collection-header">
                            <h2>
                                {t('qi_qiang')}
                            </h2>
                            <a
                                className="view-all-link"
                                onClick={() => navigate("/products")}
                            >
                                {t('view_more')} <i className="fa-solid fa-arrow-right"></i>
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
                                {bestSeller.map(product => renderNewArrivalItem(product))}
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
                    </div>
                    <div className="collection-container">
                        <div className="collection-header">
                            <h2>
                                {t('orther_product')}
                            </h2>
                            <a
                                className="view-all-link"
                                onClick={() => navigate("/products")}
                            >
                                {t('view_more')} <i className="fa-solid fa-arrow-right"></i>
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
                                {ortherProduct.map(product => renderOrtherItem(product))}
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
                    </div>

                </div>
                <Divider orientation="center">{t('contact_booking')}</Divider>

                <div className="contact-section">
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={12}>
                            <Card>
                                <Title level={4}>{t('hanoi')}</Title>
                                <Paragraph>
                                    {t('hanoi_diachi')}<br/>
                                    {t('hanoi_phone')}<br/>
                                </Paragraph>

                                <Title level={4}>{t('hochiminh')}</Title>
                                <Paragraph>
                                    {t('hanoi_diachi')}<br/>
                                    {t('hanoi_phone')}<br/>
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
                                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAM2h6MDI71Cko-lX71erCEPvtRZi58F3s&q=21.060338,105.8784189"
                                    ></iframe>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </Content>


        </Layout>
    );
};

export default Home;
