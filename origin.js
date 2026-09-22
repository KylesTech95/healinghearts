// handle scroll
function handleScroll(e) {
    let scrollY = window.scrollY;
    let header = document.querySelector('header');
    let userAccessContainer = document.getElementById('user-access-container')
    let userAccessChildren = [...userAccessContainer.children]

    if(scrollY > 0){
        header.classList.add('fixed-header');
        for(let i in userAccessChildren){
            userAccessChildren[i].classList.add('switch-user-access-color','alternate-user-hover');

            if(userAccessChildren[i].id === 'login'){
                userAccessChildren[i].classList.add('switch-login-border');

            }
        }

    } else {
        header.classList.remove('fixed-header');
        for(let i in userAccessChildren){
            userAccessChildren[i].classList.remove('switch-user-access-color','alternate-user-hover')
            userAccessChildren[i].classList.remove('switch-login-border');
        }
    
    }

    // change user access color
}

window.onscroll = handleScroll
