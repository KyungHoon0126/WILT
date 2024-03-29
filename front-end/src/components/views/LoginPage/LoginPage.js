import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';
import './Sections/LoginPage.scss'
import { Button, Input } from '@class101/ui';
import { errorToast } from '../../../lib/Toast';
import { Helmet } from 'react-helmet'
import PageTemplate from '../../Common/PageTemplate/index';
// import { useTitle } from '../../../Hooks/useTitle';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    Cookie.set('token', response.payload.data.token);
                    props.history.push('/');
                    Swal.fire({  
                        title: '로그인 성공',  
                        type: 'success',  
                        text: '',  
                      });  
                } else {
                    setPassword('');
                    errorToast("로그인 실패");
                }
            });
    }

    // const titleUpdater = useTitle("Loading...");
    // setTimeout(() => titleUpdater("Login"), 1000);

    return (
        <PageTemplate>
            <div className="LoginPage-Wrapper">
                <Helmet>
                    <title>Login</title>
                </Helmet>
                
                <form id="LoginPage-Wrapper-Form" onSubmit={onSubmitHandler}> 
                    <Input placeholder="Email"
                        type="email"
                        value={Email}
                        onChange={onEmailHandler}/>

                    <Input type="password"
                        placeholder="Password"
                        value={Password}
                        onChange={onPasswordHandler}/>

                    <br />

                    <Button onClick={onSubmitHandler}>
                    Signin 
                    </Button>
                </form>
            </div>
        </PageTemplate>
    )
}

export default withRouter(LoginPage)
