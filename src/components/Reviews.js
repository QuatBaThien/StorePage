import React, { useState } from 'react';
import { Avatar, Form, Button, List, Input, Rate, Card, Typography, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

const ReviewForm = ({ onSubmit }) => {
    const [form] = Form.useForm();
    const [rating, setRating] = useState(5);

    const handleSubmit = (values) => {
        onSubmit({
            ...values,
            rating,
            author: 'User',
            avatar: <Avatar icon={<UserOutlined />} />,
            date: new Date().toLocaleDateString()
        });
        form.resetFields();
        setRating(5);
    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="rating" label="Rating">
                <Rate value={rating} onChange={setRating} />
            </Form.Item>
            <Form.Item
                name="comment"
                rules={[{ required: true, message: 'Please write your review' }]}
            >
                <TextArea rows={4} placeholder="Write your review here..." />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Review
                </Button>
            </Form.Item>
        </Form>
    );
};

const ReviewItem = ({ review }) => {
    return (
        <div className="review-item">
            <div className="review-header">
                <Avatar icon={<UserOutlined />} />
                <div className="review-info">
                    <Text strong>{review.author}</Text>
                    <Rate disabled defaultValue={review.rating} />
                </div>
                <Text type="secondary" className="review-date">{review.date}</Text>
            </div>
            <div className="review-content">
                <Paragraph>{review.content}</Paragraph>
            </div>
        </div>
    );
};

const Reviews = ({ product }) => {
    const [reviews, setReviews] = useState([
        {
            author: 'Sarah Johnson',
            avatar: <Avatar icon={<UserOutlined />} />,
            content: 'Absolutely love this product! The quality is outstanding and the results are amazing. Best purchase ever!',
            rating: 5,
            date: '2025-02-15'
        },
        {
            author: 'Emily Chen',
            avatar: <Avatar icon={<UserOutlined />} />,
            content: 'Cannot recommend this enough! Exceeded all my expectations. The attention to detail is remarkable.',
            rating: 5,
            date: '2025-02-14'
        },
        {
            author: 'Michael Rodriguez',
            avatar: <Avatar icon={<UserOutlined />} />,
            content: 'Top-notch quality and exceptional performance. Definitely worth the investment!',
            rating: 5,
            date: '2025-02-13'
        },
        {
            author: 'Lisa Kim',
            avatar: <Avatar icon={<UserOutlined />} />,
            content: 'Perfect blend of innovation and reliability. Using this has been a game-changer for me.',
            rating: 4.5,
            date: '2025-02-12'
        },
        {
            author: 'David Thompson',
            avatar: <Avatar icon={<UserOutlined />} />,
            content: 'Phenomenal product with outstanding features. Customer service is also exceptional!',
            rating: 5,
            date: '2025-02-11'
        },
        {
            author: 'Amanda Foster',
            avatar: <Avatar icon={<UserOutlined />} />,
            content: 'Such an amazing experience with this product. The quality is consistent and reliable.',
            rating: 4.5,
            date: '2025-01-25'
        },
        {
            author: 'James Wilson',
            avatar: <Avatar icon={<UserOutlined />} />,
            content: 'Brilliant product that delivers exactly what it promises. Using it daily with great results!',
            rating: 5,
            date: '2025-01-20'
        },
        {
            author: 'Sophie Martinez',
            avatar: <Avatar icon={<UserOutlined />} />,
            content: 'Incredibly satisfied with this purchase. The quality and performance are unmatched.',
            rating: 5,
            date: '2025-01-08'
        }
    ]);

    const handleSubmitReview = (newReview) => {
        setReviews([newReview, ...reviews]);
    };

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <Card style={{
            maxHeight: '500px',
            overflowY: 'auto',
            padding: '0 16px'
        }}>
            <div className="reviews-summary">
                <Title level={4}>Customer Reviews</Title>
                <div className="">
                    <Rate allowHalf  disabled defaultValue={averageRating} />
                    <Text>{averageRating.toFixed(1)} out of 5</Text>
                    <Text className="review-count">({reviews.length} reviews)</Text>
                </div>
                <Divider />
            </div>

            {/*<div className="review-form-section">*/}
            {/*    <Title level={5}>Write a Review</Title>*/}
            {/*    <ReviewForm onSubmit={handleSubmitReview} />*/}
            {/*</div>*/}

            <Divider />

            <List
                className="review-list"
                itemLayout="horizontal"
                dataSource={reviews}
                renderItem={review => (
                    <List.Item>
                        <ReviewItem review={review} />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default Reviews;