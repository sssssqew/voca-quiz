const Component=(function(){
  "use strict"

  // 새로운 객체 주소로 변경하므로 let으로 선언하기
  let state={}
  let props={}
  const defaultStyle={}

  // state 변경하기 (setState 함수와 유사한 기능을 함)
  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    // 리렌더링하기 => doSomethingAfterRendering 함수 사용하기 (여기 doSomethingAfterRendering에서는 update 사용시 무한루프에 걸림)
    // componentDidUpdate와 비슷한 기능을 함
    doSomethingAfterRendering(()=>{
        console.log("Component updated!")
    })
  }

  // TODO: 이벤트 핸들러 

  // Property 등 외부로부터 인자를 전달받아 초기화
  function init(properties){
    props={...properties}
    if(!props.rendorDOMId) throw new Error("No position to render. Please set renderDOMId property on draw function of Component!") // 렌더링 위치가 없는 경우 에러 일으킴
  }
  // HTML 템플릿 가져오기
  function getTemplete(){
    return (`<div>Component</div>`)
  }
  // 실제 특정 DOM 위치에 렌더링하기
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML=template
  }
  // 모든 이벤트 핸들러 적용하기
  function addHandlers(){}

  // 렌더링 이후에 무조건 실행되는 리액트 훅과 유사함
  function doSomethingAfterRendering(callback){
    setTimeout(callback,0) // 시간이 오래 걸릴수 있는 작업은 맨 마지막에 비동기로 실행하기
  }
  // 초기설정과 렌더링을 함께 실행하기
  function draw(properties){
    init(properties)
    render()
    addHandlers()
    doSomethingAfterRendering(()=>console.log("Component mounted!"))
  } 
  return {draw}
})()

export default Component