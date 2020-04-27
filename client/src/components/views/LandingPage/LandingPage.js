import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';

const { Meta } = Card;

function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continent: [],
        price: []
    })


    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getProducts(variables);

    }, []);

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    })

    // 자주 사용하는 함수를 빼기
    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products]);
                    } else {
                        setProducts(response.data.products);
                    }
                    // setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch product datas');
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: Skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(variables);
        setSkip(skip);
    }

    const showFilterResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(variables);
        setSkip(0);
    }

    const handleFilters = (filters, category) => {
        console.log(filters);
        const newFilters = { ...Filters };

        newFilters[category] = filters;

        if (category === "price") {

        }

        showFilterResults(newFilters);
        setFilters(newFilters);
    }

    return (
        <>
            <div stype={{ width: '75%', margin: '3rem auto' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Let's Travel Anywhere <Icon type="rocket" /></h2>
                </div>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        handleFilters={filters => handleFilters(filters, "continents")}
                    />
                </Col>
                <Col lg={12} xs={24} >
                    <RadioBox
                        handleFilters={filters => handleFilters(filters, "continents")}
                    />
                </Col>
            </Row>

            {/* Search */}

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br></br>

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }

        </>
    )
}

export default LandingPage;
