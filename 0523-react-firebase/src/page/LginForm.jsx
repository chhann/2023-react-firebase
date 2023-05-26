import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import  { auth } from '../database/firebase'
import {useNavigate} from 'react-router-dom'
import Button from '../styleComp/Button';

import { useDispatch } from 'react-redux'
import { loginUser } from '../slice/userSlice';

export default function LginForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    // 회원가입
    const createUser = (e) => {
        e.preventDefault();// sumbit으로 진행되면 새로고침 나는데 프리벤트로 새로고침 막기
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // 가져온 값을 리덕스 툴킷에 담아서 사용
            dispatch(loginUser({
                name : user.displayName,
                email: user.email,
                photo : user.photoURL,
                uid : user.uid
            }))
            navigate('/main')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            navigate('/')
        });
    }

    //로그인
    const onClickLogin = () => {
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatch(loginUser({
                name : user.displayName,
                email: user.email,
                photo : user.photoURL,
                uid : user.uid
            }))
            navigate('/main')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            navigate('/')
        });
    }

    return (
        <div>
            <h3>로그인 또는 회원가입 페이지입니다</h3>
            <form action="" onSubmit={createUser}>
                <label>이메일</label>
                <input type="email" required
                onChange={(e) => {setEmail(e.target.value)}}
                /> <br />
                
                <label htmlFor="">비밀번호</label>
                <input type="password"
                onChange={(e) => {setPassword(e.target.value)}}
                /> <br />

                <Button color="green" type='submit'>회원가입</Button>
                <Button  type='button' onClick={ onClickLogin } >로그인</Button>
            </form>
        </div>
    )
}
