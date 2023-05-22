import React, {useState} from 'react'
import './formcss.css'

import  { auth } from '../database/firebase2'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
export default function LoginForm2() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // 이메일 회원가입 메소드
    const onEmailLogin = (e) => {
        e.preventDefault();
        // 구글에서 제공하는 이메일 메소드 사용
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // 회원가입 성공했을때
            const user = userCredential.user;
            console.log(user)
            setUser(
                {
                    uid: user.uid,
                    email : user.email,
                    displayName : user.displayName
                }

            )
        })
        .catch((error) => {
            // 회원가입 실패했을때
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            if(errorCode == "auth/email-already-in-use") {
                // alert이용하여 알려주거나, 태그를 이용해 알려줌
                alert('동일한 이메일이 있습니다.')
            }
            else if (errorCode == "auth/weak-password") {
                alert('비밀번호를 6자리이상 적어주세요')
            }
        });

    }

    // 이메일 로그인 메소드
    const onClickLogin = () => {
        // async와 await 를 이용하여 파이어베이스메소드 사용
        // 비동기함수로 만들기
        async function getLogin() {
            // 오류가 날 가능성이 있는 모든 코드를 try에 작성
            try{
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log(user);
                setUser(
                    {
                        uid: user.uid,
                        email : user.email,
                        displayName : user.displayName,
                    }
                )
                navigate('/MAIN')

            }
            // 오류가 났을때 실행할 코드
            // 오류가 나면 화면이 멈추는 것이 아니라 
            // catch를 실행하고 다른 아래쪽의 코드를 실행 
            catch(error) {
                console.log(error.code, error.message)
                if ( error.code == "auth/user-not-found" ||
                    error.code == "auth/wrong-password")
                alert("없는 이메일이거나 비밀번호가 잘못되었습니다")
            }
        }
        getLogin();
        navigate('/HOME')
    }

    return (
        <div>
            <h1>로그인 또는 회원가입페이지 입니다</h1>
            <form onSubmit={onEmailLogin}>
                <label htmlFor="">이메일</label>
                <input type="email"required
                    onChange={(e)=>{setEmail(e.target.value)}}
                    value={email}
                />
                <br />
                <label htmlFor="">비밀번호</label>
                <input type="password" required
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                />
                <br />
                <br />
                <input type="submit" value="회원가입" className='gaip'/>
                <button type='button' onClick={ onClickLogin } className='login'>로그인</button>
            </form>
        </div>
    )
}
