const Button=function(){
  "use strict"

  let state={}
  let props={}

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log('Button updated!')
    })
  }

  // TODO: 이벤트 핸들러 
  function handleClick(e){
    if(props.onClick){
      props.onClick(e)
    }
  }

  function init(properties){
    props={...properties}
  }
  function getTemplete(){
    const { uuid, width, height, bgColor, textColor, borderRadius, text, textSize } = props
    return (`<button class="button-el" id="${uuid}"
              style="width: ${width?width:'122'};height:${height?height:'40'};font-size:${textSize?textSize: '10px'};
              background-color:${bgColor?bgColor:'rgb(158,158,158)'};color:${textColor?textColor:'white'};
              border-radius:${borderRadius?borderRadius:'15'};cursor:pointer;outline:none">
              ${text?text:"button"}</button>`)
  }
  // innerHTML += template 문제
  // 각각의 버튼을 생성할때마다 위 코드를 실행하는데 
  // 실행할때마다 innerHTML을 새로 찍어내면서 기존에 연결한 이벤트리스너가 지워짐
  // 그래서 여러개의 컴포넌트를 생성하는 경우는 insertAdjacentHTML을 사용하기
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.insertAdjacentHTML('beforeend', template) // 여러개의 컴포넌트를 추가하는 경우 + 사용함
  }
  function addHandlers(){
    document.getElementById(`${props.uuid}`).addEventListener('click', handleClick)
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0)
  }
  function draw(properties){
    init(properties)
    render()
    addHandlers()
    doSomethingAfterRendering(()=>console.log('Button mounted!'))
  } 
  return {draw}
} // 여러개의 컴포넌트를 생성하는 경우 나중에 생성할때마다 실행함

export default Button