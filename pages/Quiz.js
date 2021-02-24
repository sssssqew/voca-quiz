import Nav from '../components/Nav.js'

// 부모가 업데이트되면 자식 컴포넌트도 함께 마운트된다
const Quiz=(function(){
    'use strict'

    let state={
        title: "Quiz",
        person: 'I'
    }
    let props={}
    const defaultStyle={}

    function update(newData){
        state={...state, ...newData}
        render()
        addComponents()
        addHandlers()
        doSomethingAfterRendering(()=>{
            console.log("Quiz updated!")
        })
    }

    // 서버 데이터 가져오기
    function fetchServerData(){
        console.log("Quiz mounted!")
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
    function init(properties){
        props={...properties}
        if(!props.hasOwnProperty("rendorDOMId")) throw new Error("No position to render. Please set renderDOMId property on draw function of Quiz!")
        if(!props.hasOwnProperty("style")) props.style = {}
    }
    function getTemplete(){
        const {title, person} = state
        return (`<div class="quiz-container">
                    <div id="quiz-nav"></div>
                    <div class="quiz-contents">퀴즈</div>
                </div>`)
    }
    function render(){
        const template = getTemplete()
        const renderPosition=document.getElementById(props.rendorDOMId)
        renderPosition.innerHTML=template
    }
    function addHandlers(){}

    function addComponents(){
        Nav.draw({rendorDOMId: "quiz-nav", style: {bgColor: "black", textColor: "rgb(190, 190, 190)"}})
    }

    function doSomethingAfterRendering(callback){
        setTimeout(callback,0) 
    }
    function draw(properties){
        init(properties)
        render()
        addComponents()
        addHandlers()
        doSomethingAfterRendering(fetchServerData)       
    } 
    return {draw}
})()

export default Quiz