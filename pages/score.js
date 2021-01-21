const problem=(function(){
    'use strict'

    // 새로운 객체 주소로 변경하므로 let으로 선언하기 
    let state={
        title: "Score",
    }
    let props={}

    // 이벤트 핸들러
    function changeTitle(){
        setState({title:"new title", person:'syleemomo'})
    }

    // 모든 이벤트 핸들러 적용하기
    function addHandlers(){
        document.getElementById('title-btn').addEventListener('click', changeTitle)
    }

    // state 변경하기
    function setState(newData){
        state={...state, ...newData}
        render()
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
        </div>`)
    }
    // 실제 특정 DOM 위치에 렌더링하기 
    function render(){
        console.log(props)
        const template = getTemplete()
        const renderPosition=document.getElementById(props.rendorDOMId)
        renderPosition.innerHTML=template
    }
    // 초기설정과 렌더링을 함께 실행하기
    function draw(properties){
        init(properties)
        render()
        // addHandlers()
    } 
    return {draw}
})()

export default problem