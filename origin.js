// handle scroll
function handleScroll(e) {
    let scrollY = window.scrollY;
    let header = document.querySelector('header');
    let userAccessContainer = document.getElementById('user-access-container')
    let userAccessChildren = [...userAccessContainer.children]
    let ctaDemo = document.querySelector('.float-left');

    if(scrollY > 0){
        console.log(ctaDemo)
        ctaDemo.children[0].classList.add('float-left-switch')
        header.classList.add('fixed-header');
        for(let i in userAccessChildren){
            userAccessChildren[i].classList.add('switch-user-access-color','alternate-user-hover');

            if(userAccessChildren[i].id === 'login'){
                userAccessChildren[i].classList.add('switch-login-border');

            }
        }

    } else {
        ctaDemo.children[0].classList.remove('float-left-switch')
        header.classList.remove('fixed-header');
        for(let i in userAccessChildren){
            userAccessChildren[i].classList.remove('switch-user-access-color','alternate-user-hover')
            userAccessChildren[i].classList.remove('switch-login-border');
        }
    
    }

    // change user access color
}

window.onscroll = handleScroll
