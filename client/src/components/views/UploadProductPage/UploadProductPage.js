import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: "Asia" },
    { key: 2, value: "Africa" },
    { key: 3, value: "Australia" },
    { key: 4, value: "Antarctica" },
    { key: 5, value: "Europe" },
    { key: 6, value: "North America" },
    { key: 7, value: "South America" },
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue, setContinentValue] = useState(1);

    const [Images, setImages] = useState([]);

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value);
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value);
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value);
    }

    const onContinentsSelectChange = (event) => {
        setContinentValue(event.currentTarget.value);
    }

    const updateImages = (newImages) => {
        console.log(newImages);
        setImages(newImages);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            image: Images,
            continents: ContinentValue,
        }

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Upload!');
                    props.history.push('/');
                } else {
                    alert('Failed to upload Product.');
                }
            })
    }

    if (!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
        alert('Fill the fields fitst!');
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Travel Product</Title>
            </div>

            <Form onSubmit={onSubmit}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                >
                </Input>
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                >
                </TextArea>
                <br />
                <br />
                <label>$Price</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <select
                    onChange={onContinentsSelectChange}
                    value={ContinentValue}
                >
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>
                {/* DropZone End */}
            </Form>
        </div>
    )
}

export default UploadProductPage
