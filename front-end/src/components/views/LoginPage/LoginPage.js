import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';
import './Sections/LoginPage.scss'

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
                    Swal.fire({  
                        title: '로그인 실패',  
                        type: 'error',  
                        text: '',  
                      });
                }
            });
    }

    return (
        <div className="LoginPage-Wrapper">
            <form id="LoginPage-Wrapper-Form" onSubmit={onSubmitHandler}> 
                <label>이메일</label>
                <input type="email"
                       value={Email}
                       onChange={onEmailHandler}/>

                <label>패스워드</label>
                <input type="password"
                       value={Password}
                       onChange={onPasswordHandler}/>

                <br />

                <button>
                   로그인 
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
