import React from 'react';
import { Menu } from 'antd';
import { CustomAxios } from '../../../../lib/CustomAxios';
import { withRouter } from 'react-router-dom';
// import { useSelector } from "react-redux";
import { AUTH_API_URL } from '../../../Config';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';

function RightMenu(props) {
    // const user = useSelector(state => state.user);
    
    const logoutHandler = () => {
        CustomAxios.get(`${AUTH_API_URL}/logout`).then(response => {
            if (response.status === 200) {
              Cookie.remove('token');
              props.history.push("/login");
              Swal.fire({  
                 title: '로그아웃 성공',  
                 type: 'success',  
                 text: '',  
              });  
            } else {
                Swal.fire({  
                    title: '로그아웃 실패',  
                    type: 'success',  
                    text: '',  
                  });  
            }
        });
    };

    // if (user.loginSuccess && !user.loginSuccess.isAuth) {
       if (!Cookie.get('token')) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">Signin</a>
                </Menu.Item>

                <Menu.Item key="app">
                    <a href="/signup">Signup</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="logout">
                    <div onClick={logoutHandler}>
                      Logout
                    </div>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);