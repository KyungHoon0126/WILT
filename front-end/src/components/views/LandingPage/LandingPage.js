import React, { useEffect, useState, useCallback } from 'react';
import { POST_API_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const endpoint = `${POST_API_URL}`;
        fetchPosts(endpoint);
    }, [])

    const fetchPosts = (endpoint) =>{
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setPosts([...posts, ...response.data.posts]);
        });
    };

    /**
     * 
     * 
     * 
     */
    /* const InfiniteScroll = () => {
        const [page, setPage] = useState(1);
        const [posts, setPosts] = useState(getPostList(1));

        const handleScroll = useCallback(() => {
            const { innerHeight } = window;
            const { scrollHeight } = document.body;
            const { scrollTop } = document.documentElement;

            if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
                setPosts(posts.concat(getPostList(page + 1)));
                setPage((prevPage) => prevPage + 1);
            }
        }, [page, posts]);

        useEffect(() => {
            window.addEventListener('scroll', handleScroll, true);

            return () => {
                window.removeEventListener('scroll', handleScroll, true);
            }
        }, [handleScroll])
    }; */
    /**
     * 
     * 
     * 
     * 
     */     

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <div style={{ width: '90%', margin: '1rem auto' }}>
                <Row gutter={[28, 28]}>
                    {posts && posts.map((post, index) => 
                        <React.Fragment key={index}>
                            <GridCards image={post.thumbnail}
                                       postIdx={post.postIdx}   
                                       postTitle={post.title}
                                       postContent={post.content}
                                       postCreatedAt={post.createdAt}
                            />
                        </React.Fragment>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default LandingPage