const Button=function(){
  "use strict"

  let state={}
  let props={}

  // css 파일에 디폴트 스타일을 지정하지 않은 이유는 자바스크립트로 스타일을 변경할때
  // 값이 없는 경우 css 스타일로 다시 설정되지 않는다는 것이다
  // 다시 말해서 자바스크립트로 스타일을 변경한 다음 초기값으로 다시 변경되어야 할때 css 파일은 정적이라 원래값으로 돌아가지 않는다
  // 그러므로 컴포넌트의 공통적인 스타일만 css 파일에 지정하고 변경될 속성들은 전적으로 자바스크립트에서 디폴트값까지 설정해주는게 안전하다 
  const defaultStyle={
    width:'120px',
    height:'40px',
    textSize: '18px',
    bgColor:'rgb(158,158,158)',
    textColor:'white',
    borderRadius:'5px',
    text:"button",
    hoverColor: 'gray',
    hoverTextColor: 'white'
  } 

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log("Button updated!")
    })
  }

  // TODO: 이벤트 핸들러 
  function handleClick(e){
    // e.stopPropagation() // 해당코드를 사용하면 이벤트 위임을 사용하지 못함
    if(props.onClick){
      props.onClick(e)
    }
  }

  function handleMouseOver(){
    const { hoverColor, hoverTextColor } = props.style
    this.style.backgroundColor = hoverColor? hoverColor: defaultStyle.hoverColor
    this.style.color = hoverTextColor? hoverTextColor: defaultStyle.hoverTextColor
  }

  function handleMouseLeave(){
    const { bgColor, textColor } = props.style
    this.style.backgroundColor = bgColor? bgColor: defaultStyle.bgColor
    this.style.color = textColor? textColor: defaultStyle.textColor
  }

  function init(properties){
    props={...properties}
    if(!props.hasOwnProperty("rendorDOMId")) throw new Error("No position to render. Please set renderDOMId property on draw function of Button!")
    if(!props.hasOwnProperty("uuid")) throw new Error("No uuid for list component. Please set uuid property on draw function of Button!") // 컴포넌트를 여러개 생성하는 경우 반드시 uuid를 전달하도록 함
    if(!props.hasOwnProperty("style")) props.style = {}
  }
  function getTemplete(){
    const { uuid, style } = props 
    const { width, height, bgColor, textColor, borderRadius, text, textSize } = style 
    const d = defaultStyle // 변수명이 너무 길어서 약자로 변경함
    return (`<button class="button-el" id="${uuid}"
              style="width: ${width?width:d.width};height:${height?height:d.height};font-size:${textSize?textSize:d.textSize};
              background-color:${bgColor?bgColor:d.bgColor};color:${textColor?textColor:d.textColor};
              border-radius:${borderRadius?borderRadius:d.borderRadius}">
              ${text?text:d.text}</button>`)
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
    const { uuid } = props
    document.getElementById(`${uuid}`).addEventListener('click', handleClick)
    document.getElementById(`${uuid}`).addEventListener('mouseover', handleMouseOver)
    document.getElementById(`${uuid}`).addEventListener('mouseleave', handleMouseLeave)
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0)
  }
  function draw(properties){
    init(properties)
    render()
    addHandlers()
    doSomethingAfterRendering(()=>console.log("Button mounted!"))
  } 
  return {draw}
} // 여러개의 컴포넌트를 생성하는 경우 나중에 생성할때마다 실행함

export default Button