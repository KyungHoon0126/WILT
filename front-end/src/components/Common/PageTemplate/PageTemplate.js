import React from 'react';
import NavBar from '../../views/NavBar/NavBar';

const PageTemplate = ({ children }) => {
    return (
        <>
            <NavBar />
            <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
                {children}
            </div>
        </>
    );
}

export default PageTemplate;