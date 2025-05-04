import React from 'react';
import { Card } from 'antd';

const CollectionItem = ({ product, collectionName, onClick }) => {
    // Format price with decimal places if needed
    const formatPrice = (price) => {
        if (!price) return '$0';
        const numPrice = parseFloat(price);
        return `${numPrice.toFixed(2)}`;
    };

    return (
        <div className="carousel-card-wrapper" key={product.No}>
            <Card
                hoverable
                className="service-card"
                cover={<img alt={product.Name} src={product.Image1}/>}
                onClick={onClick}
            >
                <Card.Meta
                    title={product.Name}
                    description={product.Description ?
                        (product.Description.length > 60 ?
                            `${product.Description.substring(0, 60)}...` :
                            product.Description) :
                        ''}
                />
                <div className="price">{product?.Price} VNĐ</div>
            </Card>
        </div>
    );
};

export default CollectionItem;
