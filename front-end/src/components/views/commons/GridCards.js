import React from 'react';
import { Col, Button, Divider } from 'antd';
import './GridCards.scss'
import moment from 'moment'

function GridCards(props) {
    return (
        /* <Col lg={5} md={8} xs={24}> 
            <div style={{ position: 'relative' }}>
                <a href={`/post/${props.postIdx}`}>
                    <img style={{ width: '100%', height: '250px' }}
                         src={props.image}
                         alt={props.postTitle}/>
                </a>

                <h3>{props.postTitle}</h3>
                <Divider />
                <Button type="ghost" style={{ marginLeft: 8, backgroundColor: 'red' }}>
                    Primary Button
                </Button>
            </div>
        </Col> */

        <div style={{ margin: 10 }}>
            <a href={`/post/${props.postIdx}`}>
                <div className="GridCards-Wrapper">
                    <div>
                        <img id="GridCards-Wrapper-Image"
                             src={props.image}
                             alt={props.postTitle}/>
                    </div>
                    
                    <div className="GridCards-Wrapper-Content">
                        <h4>{`제목 : ${props.postTitle}`}</h4>

                        <p>{props.postContent}</p>
                        
                        <span>
                            {moment(props.postCreatedAt).format("YYYY년 M월 DD일")}
                        </span>

                        {/* <Button type="ghost" style={{ marginLeft: 8, backgroundColor: 'red' }}>
                            Primary Button
                        </Button> */}
                    </div>
                    
                    <Divider style={{ margin: 0, padding: 0 }}/>

                    <div className="GridCards-Wrapper-Footer">
                        <h3>
                            <b>글쓴이</b> + 좋아요 수
                        </h3>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default GridCards