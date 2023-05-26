import React, { useState, useEffect } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query, where, } from 'firebase/firestore';

import { db } from '../database/firebase';

export default function FireStoreTest() {
    // 파이어 스토어에서 가져온 값
    const [books, setBooks] =useState();

    // 가져올 값을 개별로 가져옴
    const [booktitle, setBooktitle] = useState('');
    const [writer, setwriter] = useState('');
    const [memo, setMemo] = useState('');

    // 읽은 책 검색하기
    const [searchbook, setSearchbook] = useState('');

    // 검색된 값
    const [ searchResult, setSearchResult] = useState('');



    // 시작하자마자 값 들고옴
    useEffect(()=>{
        getData();
    },[])

    // 비동기 함수로 작성하여 값 가져옴
    async function getData() {
        const querySnapshot = await getDocs(collection(db, "readingbooks"))

        let dataArray = [];

        querySnapshot.forEach((doc) => {
            dataArray.push({
                id : doc.id,
                ...doc.data()
            });
        })
        setBooks(dataArray);
    }

    // 값 추가 함
    const addDocData = async () => {
        try {
            // 서버에 연결해서 사용하는 것은 비동기 함수로 작성
            const docRef = await addDoc(collection(db, "readingbooks"), {
            booktitle,
            writer,
            memo
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        getData();
    }

    // 값 삭제 함
    const deleteData = async (id) => {
        // doc(db,컬렉션이름,id)로 하나의 문서를 찾을 수 있다
        await deleteDoc(doc(db, "readingbooks", id));
        getData()
    }

    // 메모 값 업데이트
    const updateData = async(id) => {
        //수정할 필드의 값을 객체형태로 넣어줌
        let prom = prompt('느낀점을 입력하세요',"") 

        await updateDoc(doc(db,"readingbooks",id), {
            memo : prom
        });
        getData()
    }

    const onSearch = async () => {
        // where를 하나를 이용한 단일 쿼리
        // 문자열에서 특정 문자열을 찾을 수 없다
        // 데이터를 세부적으로 사용 > 따로 서버를 만들어서 SQL또는 noSQL을 사용
        const q = query(collection(db, "readingbooks"), 
                        where("booktitle", "==", searchbook)
                        );
        // 복합 쿼리문은 파이어베이스 콘솔에서 인덱스(색인)을 설정하고 쓸수 있다
    
        // 작성한 쿼리 객체를 getDocs를 이용하여 가져옴
        const querySnapshot = await getDocs(q);
        let dataArray = []
        querySnapshot.forEach((doc) => {
            dataArray.push({
            id : doc.id,
            ...doc.data()
            })
        });
        setSearchResult(dataArray)
    }

    return (
        <div>
            <h3>readingbooks컬랙션</h3>
            <h1>책 추가</h1>

            <label htmlFor="">책 이름</label>
            <input type="text" onChange={(e)=>{setBooktitle(e.target.value)}}/>
            <br />
            <label htmlFor="">작가 이름</label>
            <input type="text" onChange={(e)=>{setwriter(e.target.value)}}/>
            <br />
            <button onClick={addDocData}>
                추가
            </button>

            <hr />
            <label htmlFor="">읽은 책 검색</label>
            <input type="text" onChange={(e)=>{setSearchbook(e.target.value)}}/>
            <button onClick={ onSearch }>검색하기</button>
            {
                searchResult && searchResult.map((book)=>(
                    <div key={book.id}>
                        <p>{book.booktitle}</p>
                    </div>
                )
                )
            }


            <hr />

            {
            books && books.map((book)=>(
                <div key={book.id}>
                    <p>{book.booktitle}</p>
                    <p>{book.memo}</p>
                    <br />

                    <button onClick={ ()=>{updateData(book.id)}}>감상문적기</button>
                    <button onClick={ ()=>{deleteData(book.id)}}>X</button>
                </div>
            ))
            }
        </div>
    )
}
