const Button=function(){
  "use strict"

  let state={}
  let props={}

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log('updated!')
    })
  }

  // TODO: 이벤트 핸들러 
  function handleClick(){
    props.onClick()
  }

  function init(properties){
    props={...properties}
  }
  function getTemplete(){
    const { width, height, bgColor, textColor, borderRadius, text, textSize } = props
    return (`<button class="button-style" id="button-el"
              style="width: ${width?width:'122'};height:${height?height:'40'};font-size:${textSize?textSize: '10px'};
              background-color:${bgColor?bgColor:'rgb(158,158,158)'};color:${textColor?textColor:'white'};
              border-radius:${borderRadius?borderRadius:'15'};cursor:pointer;outline:none">
              ${text?text:"button"}</button>`)
  }
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML+=template // 여러개의 컴포넌트를 추가하는 경우 + 사용함
  }
  function addHandlers(){
    document.getElementById("button-el").addEventListener('click', handleClick)
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0)
  }
  function draw(properties){
    init(properties)
    render()
    addHandlers()
    doSomethingAfterRendering(()=>console.log('mounted!'))
  } 
  return {draw}
} // 여러개의 컴포넌트를 생성하는 경우 나중에 생성할때마다 실행함

export default Button