// variables
const userInputListContainer = document.getElementById('user-input-list-container')
const addBtn = document.getElementById('add-btn')
const subBtn = document.getElementById('sub-btn')
let count_limit = 100;
let value_limit = 3;
let custom_date = `Sun Aug 8 2026`;
let custom_date2 = `Sat Sep 12 2026`;
let custom_date3 = `Sun Aug 9 2026`;
let formatCustomDate = (custom) => new Date(custom).toDateString()
let getTime = (custom) => new Date(formatCustomDate(custom)).getTime()



// database representation of accomplishments & feelings
let inventory = [
    {date:formatCustomDate(custom_date2),accomplishments:'some text',feelings:'idk my feelings rn'},
    {date:formatCustomDate(custom_date),accomplishments:'i like chicken',feelings:'wowzers you look great!'},
    {date:formatCustomDate(custom_date3),accomplishments:'bad people hurt people',feelings:'second chance'}
]



// automatically hide sub-btn
hideBtn('sub')


// -----------------------------------------------------
// add user-input-row
addBtn.onclick = () => {
    createInputRow(false)
    editCurrentInputs(addBtn,subBtn,userInputListContainer)

};

// remove user-input-row
subBtn.onclick = removeInputRow;

// window scroll
window.onscroll = handleScroll

// keydown events
window.onkeydown = e => {
    let enter = 'Enter';
    let del = 'Backspace';
    let esc = 'Escape'

    const {key} = e;

    console.log(e.key)


    if(key === enter){
        if(!addBtn.classList.contains('no-display')) {
            addBtn.click();
        }
        
    }

    if(key === del || key === esc){
        if(!subBtn.classList.contains('no-display')) {
            subBtn.click();
        }
    }
}


// append existing rows to the DOM
if(inventory.length > 0){
    let existingRows = [...getExistingRows(inventory)];
    
    if(existingRows && existingRows.length > 0) {
        existingRows.map(row => userInputListContainer.appendChild(row))
    }
}
// Edit rows
let interval;
let interval_count = 0;
if(document.querySelectorAll('#user-input-list-container > li')){

    let all_Lis = [...document.querySelectorAll('#user-input-list-container > li')];
    
    // iterate through each li
    all_Lis.forEach((li,index) => {
    let editOption = [...li.children].find(x=>x.classList.contains('edit-option'));
    let delOption = [...li.children].find(x=>x.classList.contains('del-option'));
    
    handleRemoval(delOption)
    handleLiMouseUpMouseDown(editOption);

    // box shadow effect
    boxShadowEffect(li,index)
})
}



// functions -----------------------------------------------------
function handleScroll(e) {
    let scrollY = window.scrollY;
    let header = document.querySelector('header');

    if(scrollY > 0){
        header.classList.add('fixed-header');
    } else {
        header.classList.remove('fixed-header');
    }
}
// bod shadow effect
function boxShadowEffect(li,index){
    li.style = `box-shadow:inset 0 -${.5 * (index+1)}px 12px .9px #333;`
    return;
}
// hide interactive button by type (add | sub)
function hideBtn(type){
    document.getElementById(`${type}-btn`).classList.add('no-display')
}
function convertDateToTime(date){
    return new Date(date).getTime();
} 
// show interactive button by type (add | sub)
function showBtn(type){
    document.getElementById(`${type}-btn`).classList.remove('no-display')
    
}
function disableAllInputs(children){
    children.forEach((child,index) =>{
        let divs = [...child.children];
        divs = divs.filter(x => x.tagName !== 'P' && !x.classList.contains('input-option'))
        console.log(divs)
        divs.forEach(div => {
            let {children} = div;
            children[1].setAttribute('disabled',true);
            children[1].classList.remove('enlarge-input')
        })
            child.style = `background-color:#fff;transition:none;`
            child.classList.remove('target-edit');
            
            boxShadowEffect(child,index);
    })
    
}
// disable last inputs
function disableLastInputs(lastInput){
    let divs = [...lastInput.children]
        divs.forEach(div => {
            let {children} = div;
            children[1].setAttribute('disabled',true)
        })
        let edit = [...lastInput.children].find(x=>x.classList.contains('edit-option'))
        let del = [...lastInput.children].find(x=>x.classList.contains('del-option'))

        handleRemoval(del)
        handleLiMouseUpMouseDown(edit);
        lastInput.classList.remove('target-edit')
}
// get existing data (inventory | fetch)
function getExistingRows(array) {
    if(array.length < 1) {
        console.log('No existing rows/data to display.');
        return;
    }
    // mutate the original array
    let arr = array.slice();
    let result = [];

    for(let i = 0; i < arr.length; i++){
        // create input row fn (li)
        const li = createInputRow(true);

        // get children [divs] from li & store in variable
        const {children} = li;
        
        // iterate through children [divs]
        for(let j = 0; j < children.length; j++){
            console.log(children[j])
            if(!children[j].classList.contains('word_count_element') && !children[j].classList.contains('input-option')){
                let label = children[j].children[0];
                let input = children[j].children[1]
                let label_for = label.getAttribute('for');

                // if the object contains a property same as label[for]
                if(Object.hasOwn(arr[i],label_for)){
                    // set the text value
                    input.value = arr[i][label_for]
                    input.setAttribute('disabled',true)
                }
            }
            
            
        }

        li.setAttribute('--data-date',convertDateToTime(arr[i].date))
        result.push(li)
    }   
        // sort reuslts
        result.sort((a,b) => {
            return Number(b.getAttribute('--data-date')) - Number(a.getAttribute('--data-date'))
        });
        return result||[];
}
// create row manually or from existing data (inventory | fetch)
function createInputRow(boolean = false){
    const {children} = userInputListContainer
    // disable all inputs
    disableAllInputs([...children])
    
    if(!boolean){
        showBtn('sub')
        hideBtn('add')
    } 

    // vars
    let li = document.createElement('li');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let label1 = document.createElement('label');
    let label2 = document.createElement('label');
    let input1 = document.createElement('input');
    let char_count = document.createElement('p');
    let edit = document.createElement('img');
    let del = document.createElement('img');

    
    input1.type = 'text'
    input1.required = true
    let input2 = document.createElement('input');
    input2.type = 'text'
    input2.required = true

    // if li is added manually (+ button)
    if(!boolean){
        input1.classList.add('enlarge-input')
        input2.classList.add('enlarge-input')
    }

    div1.setAttribute('class','input-container')
    div2.setAttribute('class','input-container')

    label1.setAttribute('for','accomplishments')
    label1.textContent = 'My Accomplishment'

    label2.setAttribute('for','feelings')
    label2.textContent = 'How it Felt'

    // append
    div1.appendChild(label1);
    div1.appendChild(input1);

    div2.appendChild(label2);
    div2.appendChild(input2);

    li.append(div1);
    li.append(div2);

    li.setAttribute('--data-date', convertDateToTime(new Date(Date.now()).toDateString()))

    // edit and delete buttons
    edit.classList.add('input-option','edit-option')
    del.classList.add('input-option','del-option')

    // handle wordcount
    char_count.textContent = `${count_limit}`;
    char_count.classList.add('word_count_element')

    li.appendChild(char_count)
    li.appendChild(del)
    li.appendChild(edit)

    // update option src
    del.src = `del.png`
    edit.src = `edit.png`

    // del onclick
    handleRemoval(del,true)
    // edit on mousedown
    handleLiMouseUpMouseDown(edit);

    // target-edit
    !boolean ? li.classList.add('target-edit') : li.classList.remove('target-edit')

    return !boolean ? userInputListContainer.prepend(li) : li
}
// remove row
function removeInputRow(e){
    const {children} = userInputListContainer
    disableAllInputs([...children])
    let lastInput;
    if(children && children.length > 0){
        let zero = 0;
        lastInput = children[zero];
    }
    lastInput.remove();
    hideBtn('sub')
    showBtn('add')

}
// user input/value
function handleInput(e){
    console.log(e.target.value)
    if(count_limit !== Infinity && e.target.value.length > count_limit){
            e.target.value = e.target.value.slice(0,count_limit);
    }

    let getCharCount = e.target.parentElement.parentElement.children[e.target.parentElement.parentElement.children.length - 1];
        let char = Math.abs(e.target.value.length - count_limit);
        console.log(char)

        getCharCount.textContent = char
    // console.log(e.target.parentElement.children[0].getAttribute('for') + ":",e.target.value)

}
function inputValuesFilled(array){
    let arr = array.slice();
    return arr.every(input => input.value && input.value.length > (value_limit - 1))
}
// find current input and edit
function editCurrentInputs(add,sub,container) {
    if(add.classList.contains('no-display') && !sub.classList.contains('no-display')){
    const {children} = container
    let lastInput;
    if(children && children.length > 0){
        let zero = 0
        lastInput = children[zero];
        
        let map_inputs = [...lastInput.children].filter(x=>{
            console.log(x.tagName)
            return x.tagName !== 'IMG' && x.tagName !== 'P'
        }).map(div => [...div.children].find(element => element.tagName==='INPUT'))
        
        for(let i = 0; i < map_inputs.length; i++){
            console.log(map_inputs[i])
            map_inputs[i].oninput = (e) => {
                handleInput(e)
                // check if both values are filled
                let filled = inputValuesFilled(map_inputs)
                console.log(filled)

                if(filled){
                    hideBtn('sub');
                    showBtn('add');
                } else {
                    hideBtn('add');
                    showBtn('sub');
                }
            };
        }

        
    }
}
}
function editInputs(target){    
        target.classList.add('target-edit')
        
        let children = [...target.children].filter(x=>x.tagName!== 'P' && !x.classList.contains('input-option'));
        for(let i of children){
            let get_children = [...i.children]
            let get_inputs = get_children[1];

            get_inputs.oninput = handleInput;
            get_inputs.removeAttribute('disabled')
        }

        if(target.getAttribute('disabled')){
            setTimeout(()=>{
            target.style = `background-color:#fff;transition:none`
        },750)
        }
    
}
function handleRemoval(del,blank = false) {
    
    if(!del || !del.classList.contains('del-option')){
        console.error('del button is missing');
        return;
    }
    del.onclick = (e) => {
        const parent = e.currentTarget.parentElement;
        parent.remove(); // test removal

        if(blank){
        console.log(blank)
        hideBtn('sub')
        showBtn('add')
    }
    }
}
function handleLiMouseUpMouseDown(edit){
    if(!edit || !edit.classList.contains('edit-option')){
        console.error('edit button is missing');
        return;
    }
    const {children} = userInputListContainer

    // start the count on mousedown
    edit.onclick = (e) => {

        let target = e.currentTarget;
        let parent = target.parentElement;
        // clearInterval(interval)
        // interval = setInterval(()=>{
        //     interval_count++
        //     if(interval_count > 1 && interval_count < 3){
        //         if(subBtn && !subBtn.classList.contains('no-display')){
        //             subBtn.click()
        //         }
        //         disableAllInputs([...children])
        //         parent.style = `background-color:#0f0;`

        //         editInputs(parent);
        //         interval_count = 0;
        //         clearInterval(interval)
        //     }
        // },500);

        if(subBtn && !subBtn.classList.contains('no-display')){
                    subBtn.click()
                }
                disableAllInputs([...children])
                parent.style = `background-color:#0f0;`

                editInputs(parent);
                interval_count = 0;
                clearInterval(interval)
    }

    // clear interval & reset the count
    // edit.onclick = () => {
    //     clearInterval(interval)
    //     interval_count = 0;
    // }
}

