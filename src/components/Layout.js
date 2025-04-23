// AppLayout.jsx
import React, {useEffect, useState} from 'react';
import {FloatButton, Layout} from 'antd';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Products from "./Products";
import ProductDetail from "./Details";
import CareGuide from "./CareGuide";
import PolicyShippingPage from "./Policy";
import FAQPage from "./FAQ";
import AboutPage from "./About";
import {ArrowUpOutlined, MessageOutlined} from '@ant-design/icons';
import CustomChatBox from "./Messenger";
import GuidePage2 from "./SizeGuide";
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [pathname]);

    return null;
}
const AppLayout = () => {
    const [visible, setVisible] = useState(false);
    // Scroll to top
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    // Show the button when the user scrolls down 200px
    const checkScrollTop = () => {
        if (!visible && window.pageYOffset > 200) {
            setVisible(true);
        } else if (visible && window.pageYOffset <= 200) {
            setVisible(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [checkScrollTop, visible]);
    return (
        <Router>
            <Layout className="app-layout">
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/care-guide" element={<CareGuide />} />
                    <Route path="/size-guide" element={<GuidePage2 />} />
                    <Route path="/policy" element={<PolicyShippingPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
                <Footer/>
                <FloatButton.Group style={{ right: 0, bottom: 24 }}>
                    {/* Nút Messenger */}
                    {/*<FloatButton*/}
                    {/*    icon={<MessageOutlined />}*/}
                    {/*    type="primary"*/}
                    {/*    onClick={() => window.open('https://m.me/61572997735327', '_blank')}*/}
                    {/*/>*/}
                    <CustomChatBox/>
                    {/* Nút Scroll to Top, chỉ hiển thị khi `visible` là true */}
                    {visible && (
                        <FloatButton
                            icon={<ArrowUpOutlined />}
                            onClick={scrollToTop}
                            type="primary"
                            className="float-button"
                        />
                    )}
                </FloatButton.Group>
            </Layout>
        </Router>
    );
};

export default AppLayout;