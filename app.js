import pages from './pages/index.js'

// 이동할 페이지 목록을 저장한 객체
window.routes={
    '/': (params)=>pages.problem.draw(params),
    'score/': (params)=>pages.score.draw(params)
}

// 실제 페이지 변경과 URL 변경이 실행되는 함수
window.router=(url, params)=>{
    sessionStorage.setItem('prevUrl', window.location.pathname) // 이전 URL 저장
    history.pushState({}, "", url) // URL 변경
    window.routes[url](params) // 페이지 변경
}

window.router('/', {rendorDOMId:'root'})

// 앞으로가기, 뒤로가기 화살표 클릭한 경우 실행됨
window.addEventListener("popstate", (e) => {
    console.log(e)
    window.router(sessionStorage.getItem('prevUrl'), {rendorDOMId:'root'}) // 이전 URL로 이동
})
  
  


