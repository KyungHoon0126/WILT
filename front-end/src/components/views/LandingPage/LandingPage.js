import React, { useEffect, useState, useCallback } from 'react';
import { POST_API_URL } from '../../Config';
import GridCards from '../Commons/GridCards';
import { Row } from 'antd';
import useLoading from '../../../Hooks/useLoading';
import Spinner from '../../Common/Spinner';

function LandingPage() { 
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);

    const { isLoading, setIsLoading } = useLoading();

    const fetchPosts = useCallback(async (page) => {
        setIsLoading(true);

        const endpoint = `${POST_API_URL}?page=${page}&limit=15`;
        await fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setPosts([...posts, ...response.data.posts]);
            })
            .catch((e) => console.log(e));

        setIsLoading(false);
    }, [posts, setIsLoading]);

    const handleScroll = useCallback(() => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const { scrollTop } = document.documentElement;

        if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
            fetchPosts(page + 1);
            setPage((prevPage) => prevPage + 1);
        }
    }, [fetchPosts, page]);

    useEffect(() => {
        fetchPosts(1);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
        }
    }, [fetchPosts, handleScroll])

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {
                isLoading && <Spinner />
            }
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