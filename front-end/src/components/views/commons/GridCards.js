import React from 'react';
import { Col, Button, Divider } from 'antd';
import './GridCards.css'
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
                <Button type="ghost" styl={{ marginLeft: 8, backgroundColor: 'red' }}>
                    Primary Button
                </Button>
            </div>
        </Col> */

        <div style={{ margin: 10 }}>
            <div style={{ position: 'relative', width: '320px', height: '377', borderRadius: 5, boxShadow: '1px 1px 2px 2px #f8f9fa' }}>
                <div>
                    <a href={`/post/${props.postIdx}`}>
                        <img style={{ width: '100%', height: '167px', borderRadius: '5 5 0 0' }}
                            src={props.image}
                            alt={props.postTitle}/>
                    </a>
                </div>
                
                <div style={{ height: '165px', padding: '16px' }}>
                    <h4 style={{ fontSize: 16, color: '#212529', margin: '0px 0px 4px' }}>
                        {`제목 : ${props.postTitle}`}
                    </h4>

                    <p style={{ fontSize: 14, color: '#495057', margin: '0px 0px 24px' }}>
                        몇가지 요약 문장이 들어감.몇가지 요약 문장이 들어감.몇가지 요약 문장이 들어감.몇가지 요약 문장이 들어감.
                    </p>
                    

                    <span style={{ fontSize: 12, color: '#868E96' }}>
                        {moment(props.postCreatedAt).format("YYYY년 M월 DD일")}
                    </span>

                    {/* <Button type="ghost" styl={{ marginLeft: 8, backgroundColor: 'red' }}>
                        Primary Button
                    </Button> */}
                </div>
                
                <Divider style={{ margin: 0, padding: 0 }}/>

                <div style={{ width: '216px', height: '45px', padding: '10px 16px' }}>
                    <h3 style={{ margin: 0, fontSize: '12px' }}>
                        <b>글쓴이</b> + 좋아요 수
                    </h3>
                </div>
            </div>
        </div>
    )
}
export default GridCards