import pages from './pages/index.js'

window.popped = false

// 이동할 페이지 목록을 저장한 객체
// pushState 1번째 인자는 현재 주소값과 해당 페이지의 파라미터를 저장해두기
// pushState 3번째 인자 url은 맨앞에 /를 붙여서 반드시 절대경로로 정의해줘야 제대로 동작함 
window.routes={
    '/': (params)=>pages.Quiz.draw(params),
    '/score': (params)=>pages.Score.draw(params),
    '/dictionary': (params)=>pages.Dictionary.draw(params)
}

// 실제 페이지 변경과 URL 변경이 실행되는 함수
window.router=(url, params)=>{
    // 앞으로가기, 뒤로가기인 경우 popstate하면서 URL을 이미 변경했으므로 router함수에서 다시 변경할 필요가 없음
    if(!window.popped){
        window.history.pushState({url:url, params:params}, "", url) // URL 변경
    }else{
        window.popped=false
    } 
    window.routes[url](params) // 페이지 변경
}

window.router('/', {rendorDOMId:'root'})

// 앞으로가기, 뒤로가기 화살표 클릭한 경우 실행됨
window.addEventListener("popstate", (e) => {
    window.popped = true
    console.log(e.state)
    window.router(e.state.url, e.state.params) // 이전 URL로 이동
})
  
  


