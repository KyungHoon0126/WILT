import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signupUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import './Sections/SignupPage.scss'

function SignupPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onPasswordHanler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password.length < 8 || ConfirmPassword.length < 8) {
            return alert('패스워드 자릿수가 올바르지 않습니다.');
        }

        if (Password !== ConfirmPassword) {
            return alert('패스워드가 일치하지 않습니다.');
        }

        let body = {
            email : Email,
            name: Name,
            password: Password
        }

        dispatch(signupUser(body))
            .then(response => {
                if (response.payload.status === 200) {
                    props.history.push('./login');
                } else if (response.payload.status === 400) {
                    alert('중복된 이메일 입니다.');
                } else {
                    alert('회원가입에 실패하였습니다.');
                }
            })
    };

    return (
        <div className="SignupPage-Wrapper">
            <form id="SignupPage-Wrapper-Form" onSubmit={onSubmitHandler}>
                <label>이메일</label>
                <input type="email" 
                       value={Email}
                       onChange={onEmailHandler}/>

                <label>이름</label>
                <input type="text"
                       value={Name}
                       onChange={onNameHandler}/>
                
                <label>패스워드</label>
                <input type="password"
                       value={Password}
                       onChange={onPasswordHanler}
                       title="패스워드는 8자리 이상이어야 합니다."/>
                
                <label>패스워드 확인</label>
                <input type="password"
                       value={ConfirmPassword}
                       onChange={onConfirmPasswordHandler}/>

                <br />

                <button>
                    회원 가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(SignupPage)
