import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Sections/MarkdownRender.scss';

const MarkdownRender = ({ title, contents }) => {
    return (
        <div className="MarkdownRender-Wrapper">
            <div className="MarkdownRender-Wrapper-Title">
                {title}
            </div>

            <ReactMarkdown className="MarkdownRender" 
                           escapeHtml={false}>
                {contents}
            </ReactMarkdown>

        </div>
    )
}

export default MarkdownRender
