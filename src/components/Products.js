import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Breadcrumb, Card, Col, Divider, Empty, Input, Layout, Pagination, Row, Select, Typography} from 'antd';
import {HomeOutlined, SearchOutlined} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import {SheetContext} from "../SheetContext";

const {Header, Content} = Layout;
const {Option} = Select;
const {Search} = Input;
const {Text, Title} = Typography;


const NewArrivals = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const collectionFromUrl = queryParams.get('collection');
    const {data: sheetProducts} = useContext(SheetContext);
    const normalizeCollection = (collection) => {
        return collection
            ? collection
                .split(" ")[0] // Lấy từ đầu tiên
                .toLowerCase() // Chuyển về chữ thường
                .replace(/\s+|&/g, '-') // Thay khoảng trắng & "&" bằng "-"
                .replace(/-+/g, '-') // Xóa dấu "-" dư thừa
                .trim()
            : 'all'; // Giá trị mặc định nếu rỗng
    };


    const allProducts = useMemo(() => {
        // console.log(sheetProducts)
        return sheetProducts.map((service, index) => ({
            id: `sheet-${index}`,
            name: service.Name,
            price: service.Price,
            originalPrice: service.OriginalPrice ? parseFloat(service.OriginalPrice) : undefined,
            rating: service.Rating ? parseFloat(service.Rating) : 0,
            reviews: service.Reviews ? parseInt(service.Reviews) : 0,
            image: service.Image1, // Ảnh chính
            image2: service.Image2, // Ảnh phụ 1
            image3: service.Image3, // Ảnh phụ 2
            image4: service.Image4, // Ảnh phụ 3
            image5: service.Image5, // Ảnh phụ 4
            description: service.Description, // Mô tả sản phẩm
            discount: service.Discount ? parseInt(service.Discount) : 0,
            isNew: true,
            collection: normalizeCollection(service.Collections || 'all'),
            size: service.Size,
            shape: service.Shape,
        }));
    }, [sheetProducts]);
    const collections = [
        {value: 'all', label: 'All Collections'},
        {value: 'new', label: 'New Arrivals'},
        { value: 'spring', label: 'Spring Collection' },
        {value: 'tools', label: "Tools & Accessories"},
        // { value: 'summer', label: 'Summer Collection' },
        // { value: 'autumn', label: 'Autumn Collection' },
        // { value: 'winter', label: 'Winter Collection' },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('price-high');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 16;
    const navigate = useNavigate();
    const [selectedCollection, setSelectedCollection] = useState(collectionFromUrl || 'all');

    useEffect(() => {
        if (collectionFromUrl) {
            setSelectedCollection(collectionFromUrl);
        }
    }, [collectionFromUrl]);
    // Filter and sort products


    const filteredAndSortedProducts = useMemo(() => {
        let result = [...allProducts];
// Apply collection filter
        if (selectedCollection && selectedCollection !== 'all') {
            // if (selectedCollection === 'new-arrivals') {
            //     // Filter for new products
            //     result = result.filter(product => product.isNew);
            // } else {
            // Filter by collection
            result = result.filter(product => {
                const normalizedProductCollection = normalizeCollection(product.collection);
                return normalizedProductCollection === selectedCollection;
            });
            // }
        }
        // Apply search filter
        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'a-z':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'z-a':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                result.sort((a, b) => b.id - a.id);
                break;
        }

        return result;
    }, [searchTerm, sortBy, allProducts, selectedCollection]);

    // Pagination
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredAndSortedProducts.slice(startIndex, startIndex + pageSize);
    }, [currentPage, filteredAndSortedProducts]);

    // Handlers
    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleSort = (value) => {
        setSortBy(value);
        setCurrentPage(1); // Reset to first page when sorting
    };
    const handleCollectionChange = (value) => {
        setSelectedCollection(value);
        setCurrentPage(1); // Reset to first page when changing collection

        // Update URL to reflect the collection filter
        if (value === 'all') {
            navigate('/products');
        } else {
            navigate(`/products?collection=${value}`);
        }
    };
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
    };
    const handleClick = (product) => {
        navigate(`/products/${product.id}`, {
            state: {
                product,
                products: paginatedProducts,
                category: selectedCollection !== 'all'
                    ? collections.find(c => c.value === selectedCollection)?.label
                    : "All Products",
                recommended: allProducts.slice(0, 4)
            }
        });
    };
    const currentCollectionName = useMemo(() => {
        const collection = collections.find(c => c.value === selectedCollection);
        return collection ? collection.label : 'All Collections';
    }, [selectedCollection]);
    return (
        <Layout className="new-arrivals-layout">
            <Content className="new-arrivals-content">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item href="/">
                        <HomeOutlined/>
                        <span>Home</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Products</Breadcrumb.Item>
                    {selectedCollection !== 'all' && (
                        <Breadcrumb.Item>{currentCollectionName}</Breadcrumb.Item>
                    )}
                </Breadcrumb>
                <Divider orientation="center" id="services-section">Products</Divider>
                <div className="filters-section">
                    <Row gutter={[24, 24]} align="middle" justify="space-between">
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Search
                                placeholder="Search products..."
                                prefix={<SearchOutlined/>}
                                className="search-input"
                                allowClear
                                onChange={(e) => handleSearch(e.target.value)}
                                value={searchTerm}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="sort-section">
                                <Text>Collection: </Text>
                                <Select
                                    value={selectedCollection}
                                    onChange={handleCollectionChange}
                                    className="sort-select"
                                    // style={{ width: 180 }}
                                >
                                    {collections.map(collection => (
                                        <Option key={collection.value} value={collection.value}>
                                            {collection.label}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="sort-section">
                                <Text>Sort by: </Text>
                                <Select
                                    value={sortBy}
                                    onChange={handleSort}
                                    className="sort-select"
                                >
                                    <Option value="a-z">Name: A to Z</Option>
                                    <Option value="z-a">Name: Z to A</Option>
                                    <Option value="price-low">Price: Low to High</Option>
                                    <Option value="price-high">Price: High to Low</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="products-grid">
                    {filteredAndSortedProducts.length === 0 ? (
                        <div className="no-results">
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        </div>
                    ) : (
                        <Row gutter={[24, 24]}>
                            {paginatedProducts.map(product => (
                                <Col xs={12} sm={12} md={6} lg={6} key={product.id}>
                                    <Card
                                        hoverable
                                        className="product-card"
                                        onClick={() => handleClick(product)}
                                        cover={
                                            <div className="product-image-container">
                                                <img alt={product.name} src={product.image}/>
                                                {product.discount && (
                                                    <div className="discount-badge">-{product.discount}%</div>
                                                )}
                                                {product.isNew && (
                                                    <div className="new-badge">NEW</div>
                                                )}
                                                <div className="product-actions">
                                                    {/*<Button type="primary" icon={<ShoppingCartOutlined/>}/>*/}
                                                    {/*<Button icon={<HeartOutlined/>}/>*/}
                                                </div>
                                            </div>
                                        }
                                    >
                                        {/*add other collection here*/}
                                        <div className="product-info">
                                            <Title level={5} className="product-name">{product.name}</Title>
                                            {product.collection && (
                                                <Text className="product-collection">
                                                    {product?.collection === 'new' ? 'New Arrivals' :
                                                        product?.collection === 'tools' ? 'Tools & Accessories' :
                                                            product?.collection === 'spring' ? 'Spring Collection' :
                                                                product?.collection}
                                                </Text>
                                            )}

                                            {/*<div className="product-rating">*/}
                                            {/*<Rate*/}
                                            {/*    allowHalf*/}
                                            {/*    defaultValue={product.rating}*/}
                                            {/*    disabled*/}
                                            {/*    style={{fontSize: '14px'}}*/}
                                            {/*/>*/}
                                            {/*<Text type="secondary" className="review-count">*/}
                                            {/*    ({product.reviews})*/}
                                            {/*</Text>*/}
                                            {/*</div>*/}
                                            <div className="product-price">
                                                {product.originalPrice && (
                                                    <Text delete type="secondary" className="original-price">
                                                        ${product.originalPrice}
                                                    </Text>
                                                )}
                                                <Text strong className="current-price">
                                                    ${product.price}
                                                </Text>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
                {filteredAndSortedProducts.length > 0 && (
                    <div className="pagination-section">
                        <div className="pagination-container">
                            <Pagination
                                current={currentPage}
                                total={filteredAndSortedProducts.length}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                                showQuickJumper
                                showTotal={(total) => `Total ${total} items`}
                            />
                        </div>
                    </div>
                )}
            </Content>
        </Layout>
    );
};

export default NewArrivals;