import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Divider } from 'antd';
import './Sections/GridCards.scss';
import moment from 'moment';

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
            <Link to={`/post/${props.postIdx}`}>
                <div className="GridCards-Wrapper">
                    <div>
                        <img id="GridCards-Wrapper-Image"
                             src={props.image}
                             alt={props.postTitle}/>
                    </div>
                    
                    <div className="GridCards-Wrapper-Content">
                        <h4>{`제목 : ${props.postTitle}`}</h4>

                        <div className="GridCards-Wrapper-Content-Content">{props.postContent}</div>
                        
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
                            <text>by</text> <b>{props.postWriter}</b>
                            <svg width="12" height="11" viewBox="0 0 24 24">
                                <path fill="currentColor" 
                                      d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z" />
                            </svg>
                            {' ' + props.postLike}
                        </h3>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default GridCards