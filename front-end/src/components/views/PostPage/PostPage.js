import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { Helmet } from 'react-helmet';
import './Sections/PostPage.scss';
import { Button } from '@class101/ui';
import { IoArrowBackSharp } from 'react-icons/io5';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownRender from './MarkdownRender';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

function PostPage(props) {        
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    function handleEditorChange(text) {
        setContent(text);
    }

    return (
        <div className="PostPage-Wrapper">
            <Helmet>
                <title>Post</title>
            </Helmet>
            
            <div className="PostPage-Wrapper-Body">
                <textarea 
                    className="PostPage-Title-Textarea"
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={onTitleHandler}
                />
            
                <MdEditor
                    placeholder="당신의 이야기를 적어보세요..."
                    renderHTML={(text) => mdParser.render(text)}
                    value={content}
                    onChange={({ text }) => handleEditorChange(text)}
                />

                <div className="Button-Wrapper">
                    <Button className="Exit-Button">
                        <IoArrowBackSharp />
                        나가기
                    </Button>

                    <Button className="Create-Button">
                        출간하기
                    </Button>
                </div>
            </div>

            <MarkdownRender contents={content}
                            title={title} />
        </div>
    )
}

export default PostPage