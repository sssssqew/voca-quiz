const problem=(function(){
    'use strict'

    // 새로운 객체 주소로 변경하므로 let으로 선언하기 
    let state={
        title: "Problem",
        person: 'I'
    }
    let props={}

    // 이벤트 핸들러
    function routeToScorePage(e){
        // update({title:"new title", person:'syleemomo'})
        // console.log(e.target.dataset.url)
        window.router(e.target.dataset.url, {rendorDOMId:'root', id: 3})
    }

    // 모든 이벤트 핸들러 적용하기
    function addHandlers(){
        document.getElementById('router-btn').addEventListener('click', routeToScorePage)
    }

    // state 변경하기 (setState 함수와 유사한 기능을 함)
    function update(newData){
        state={...state, ...newData}
        render()
        addHandlers()
        // 리렌더링하기 => doSomethingAfterRendering 함수 사용하기 (여기 doSomethingAfterRendering에서는 update 사용시 무한루프에 걸림)
        // componentDidUpdate와 비슷한 기능을 함
        doSomethingAfterRendering(()=>{
            console.log('updated!')
        })
    }
    // Property 등 외부로부터 인자를 전달받아 초기화
    function init(properties){
        props={...properties}
    }
    // HTML 템플릿 가져오기
    function getTemplete(){
        const {title, person}=state
        return (`<div>
            <h1>${title} page</h1>
            <h3>${person} am the most famous person in the world</h3>
            <button id="router-btn" data-url='score/'>성적 보기</button>
        </div>`)
    }

    // 서버 데이터 가져오기
    function fetchServerData(){
        console.log('mounted...')
        const fetchData = async ()=>{
            try{
                const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res=>res.json())
                console.log(data)
                update({title:data.title}) 
            }catch(e){
                console.log(e)
            }
            
        }
        fetchData()
    }
    // 렌더링 이후에 무조건 실행되는 리액트 훅과 유사함
    function doSomethingAfterRendering(callback){
        setTimeout(callback,0) // 시간이 오래 걸릴수 있는 작업은 맨 마지막에 비동기로 실행하기
    }

    // 실제 특정 DOM 위치에 렌더링하기 
    function render(){
        const template = getTemplete()
        const renderPosition=document.getElementById(props.rendorDOMId)
        renderPosition.innerHTML=template
    }
    // 초기설정과 렌더링을 함께 실행하기
    function draw(properties){
        init(properties)
        render()
        addHandlers()

        // componentDidMount와 비슷한 기능을 함
        doSomethingAfterRendering(fetchServerData)
        
    } 
    return {draw}
})()

export default problem