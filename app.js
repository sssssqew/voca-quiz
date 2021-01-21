import pages from './pages/index.js'

window.routes={
    '/': ()=>pages.problem.draw({rendorDOMId:'root'}),
    'score/': ()=>pages.score.draw({rendorDOMId:'root'})
}

window.router=(url)=>{
    sessionStorage.setItem('prevUrl', window.location.pathname) // 이전 URL 저장
    history.pushState({}, "", url) // URL 변경
    window.routes[url]() // 페이지 변경
}

window.router('/')

window.addEventListener("popstate", (e) => {
    console.log(e)
    window.router(sessionStorage.getItem('prevUrl')) // 이전 URL로 이동
})
  
  


