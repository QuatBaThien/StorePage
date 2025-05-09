import React, {useContext} from 'react';
import { Breadcrumb, Card, Col, Layout, Row, Typography } from 'antd';
import { HomeOutlined, TeamOutlined, InfoCircleOutlined, StarOutlined, SmileOutlined } from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {SheetContext} from "../SheetContext";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const AboutPage = () => {
    const { data } = useContext(SheetContext)
    const { t, i18n } = useTranslation();
    const viText = (
        <>
            <Paragraph>
                <strong>Công ty TNHH Thương Mại JIAFU</strong> tự hào là <strong>tổng đại lý chính thức và độc quyền</strong> phân phối các sản phẩm của thương hiệu <strong>Qi Qiang</strong> tại Việt Nam.
            </Paragraph>
            <Paragraph>
                📌 Sứ mệnh của chúng tôi là mang đến cho khách hàng trong nước những <strong>giải pháp hóa chất công nghiệp tiên tiến, hiệu quả và an toàn</strong>.
            </Paragraph>
            <Paragraph>
                ✅ JIAFU cam kết cung cấp <strong>sản phẩm chính hãng, chất lượng vượt trội, đạt tiêu chuẩn quốc tế</strong>.
            </Paragraph>
            <Paragraph>
                🌟 Qi Qiang là thương hiệu hàng đầu tại Trung Quốc trong lĩnh vực <strong>hóa chất phục vụ sản xuất khuôn mẫu, công nghiệp nhẹ và nặng</strong>, với dây chuyền sản xuất hiện đại, ứng dụng công nghệ từ Đức và Mỹ, đạt các chứng nhận ISO9001 và ISO14001.
            </Paragraph>
            <Paragraph>
                🇻🇳 Tại Việt Nam, JIAFU không chỉ là nhà phân phối, mà còn là <strong>đối tác đáng tin cậy</strong>, đồng hành cùng doanh nghiệp tối ưu quy trình sản xuất và nâng cao hiệu quả vận hành.
            </Paragraph>
            <Paragraph>
                🔧 Hệ sinh thái sản phẩm đa dạng bao gồm:<br />
                🧼 Chất vệ sinh khuôn,<br />
                🛡️ Dầu chống gỉ,<br />
                🛠️ Dầu bôi trơn,<br />
                📌 Keo xịt định vị,<br />
                🧪 Dung môi tẩy rửa công nghiệp, v.v.
            </Paragraph>
            <Paragraph>
                🎯 <strong>Chúng tôi cam kết:</strong><br />
                ✅ Sản phẩm chính hãng 100%<br />
                💰 Giá cả cạnh tranh – Ưu đãi hấp dẫn cho đại lý và khách sỉ<br />
                🚚 Giao hàng toàn quốc – Hỗ trợ kỹ thuật tận tâm<br />
                🏬 Hàng luôn có sẵn tại kho Hà Nội và TP.HCM
            </Paragraph>
            <Paragraph>
                📞 <strong>Liên hệ với JIAFU để được tư vấn và đặt hàng:</strong><br />
                📍 Hà Nội: 0866.041.318 – 0399.174.611<br />
                📍 TP.HCM: 0398.951.213 – 0368.806.983
            </Paragraph>
        </>
    );

    const zhText = (
        <>
            <Paragraph>
                <strong>JIAFU 商贸有限责任公司</strong> 自豪地成为 <strong>Qi Qiang 品牌</strong> 在越南的 <strong>官方唯一总代理</strong>。
            </Paragraph>
            <Paragraph>
                📌 我们的使命是为国内客户提供 <strong>先进、高效且安全的工业化学解决方案</strong>。
            </Paragraph>
            <Paragraph>
                ✅ JIAFU 承诺只提供 <strong>正品保障、品质卓越、符合国际标准</strong> 的产品。
            </Paragraph>
            <Paragraph>
                🌟 Qi Qiang 是中国在 <strong>模具制造、轻工业与重工业化工领域</strong> 的领先品牌，拥有现代化的生产线，应用德国与美国技术，并获得 ISO9001 与 ISO14001 认证。
            </Paragraph>
            <Paragraph>
                🇻🇳 在越南，JIAFU 不仅是分销商，更是 <strong>值得信赖的合作伙伴</strong>，与企业一同优化生产流程，提升运营效率。
            </Paragraph>
            <Paragraph>
                🔧 我们的产品生态系统多样，涵盖：<br />
                🧼 模具清洗剂，<br />
                🛡️ 防锈油，<br />
                🛠️ 润滑油，<br />
                📌 定位喷胶，<br />
                🧪 工业清洗溶剂 等等。
            </Paragraph>
            <Paragraph>
                🎯 <strong>我们承诺：</strong><br />
                ✅ 100% 正品保障<br />
                💰 价格具有竞争力 – 为代理与批发客户提供优惠政策<br />
                🚚 全国配送 – 提供贴心技术支持<br />
                🏬 河内与胡志明市常备现货库存
            </Paragraph>
            <Paragraph>
                📞 <strong>请联系 JIAFU 获取咨询与下单服务：</strong><br />
                📍 河内：0866.041.318 – 0399.174.611<br />
                📍 胡志明市：0398.951.213 – 0368.806.983
            </Paragraph>
        </>
    );
    return (
            <Content className="policy-shipping-content">
                {/* Breadcrumb */}
                {/*<Breadcrumb className="breadcrumb">*/}
                {/*    <Breadcrumb.Item href="/">*/}
                {/*        <HomeOutlined />*/}
                {/*        <span>Home</span>*/}
                {/*    </Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>About Us</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}

                {/* Header */}
                {data?.[0] && data?.[1] && (
                    <>
                <div className="page-header">
                    <Title>{t('about')}</Title>
                    <Text>{i18n.language === 'zh' ? data[1].Welcome_hearder : data[0].Welcome_hearder}</Text>
                </div>


                {/* Giới thiệu về LeVA Nails */}
                <Card className="about-section">
                    <Title level={3}>{i18n.language === 'zh' ? data[1].Welcome_hearder : data[0].Welcome_hearder}</Title>
                    {i18n.language === 'zh' ? zhText : viText}
                </Card>
                    </>
                    )}
            </Content>
    );
};

export default AboutPage;
