import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';

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

function UploadProductPage() {

    const [TitleValue, setTitleValue] = useState("");
    const [DescriptionValue, setDescriptionValue] = useState("");
    const [PriceValue, setPriceValue] = useState(0);
    const [ContinentValue, setContinentValue] = useState(1);

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

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title>Upload Travel Product</Title>
            </div>

            <Form onSubmit>
                {/* DropZone */}
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
                    onClick
                >
                    Submit
                </Button>
                {/* DropZone End */}
            </Form>
        </div>
    )
}

export default UploadProductPage
