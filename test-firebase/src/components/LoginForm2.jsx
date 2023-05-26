import React, {useState} from 'react'
import './formcss.css'

import  { auth } from '../database/firebase2'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
export default function LoginForm2() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // 이메일 회원가입 메소드
    const onEmailLogin = (e) => {
        e.preventDefault();
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
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
                alert('동일한 이메일이 있습니다.')
            }
            else if (errorCode == "auth/weak-password") {
                alert('비밀번호를 6자리이상 적어주세요')
            }
        });

    }

    // 이메일 로그인 메소드
    const onClickLogin = () => {
        
        async function getLogin() {
            
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
            
            catch(error) {
                console.log(error.code, error.message)
                if ( error.code == "auth/user-not-found" ||
                    error.code == "auth/wrong-password")
                alert("없는 이메일이거나 비밀번호가 잘못되었습니다")
                navigate('/HOME')
            }
        }
        getLogin();
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
