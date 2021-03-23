import React from 'react';
import { Col, Button } from 'antd';

function GridCards(props) {
    return (
        <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <Button type="ghost" styl={{ marginLeft: 8, backgroundColor: 'red' }}>
                    Primary Button
                </Button>

                <a href={`/post/${props.postIdx}`}>
                    <img style={{ width: '100%', height: '320px' }}
                         src={props.image}
                         alt={props.postTitle}/>
                </a>

                <h3>{props.postTitle}</h3>
            </div>
        </Col>
    )
}
export default GridCards