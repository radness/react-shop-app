import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([]);

    const onDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        // save the image we choose inside the node server
        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...response.data.image]);
                    // 부모 경로에 update 해준다.
                    props.refreshFunction([...Images, response.data.image]);
                } else {
                    alert('Failed to save the Image in Server.');
                }
            })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={9999999999}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '4rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

            </div>
        </div>
    )
}

export default FileUpload
