import React from 'react';
import Cookie from 'js-cookie';
import { Menu } from 'antd';
import { CustomAxios } from '../../../../lib/CustomAxios';
import { withRouter } from 'react-router-dom';
import { AUTH_API_URL } from '../../../Config';
import { successToast, errorToast } from '../../../../lib/Toast';
import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";

function RightMenu(props) {
    // const user = useSelector(state => state.user);
    
    const logoutHandler = () => {
        CustomAxios.get(`${AUTH_API_URL}/logout`).then(response => {
            if (response.status === 200) {
              Cookie.remove('token');
              props.history.push("/login");
              successToast("로그아웃 성공");
            } else {
                errorToast("로그아웃 실패");
            }
        });
    };

    // if (user.loginSuccess && !user.loginSuccess.isAuth) {
       if (!Cookie.get('token')) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <Link to="/login">로그인</Link>
                </Menu.Item>

                <Menu.Item key="app">
                    <Link to="/signup">회원가입</Link>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="post">
                    <Link to="/post">새 글 작성</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                    <div onClick={logoutHandler}>
                      로그아웃
                    </div>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);