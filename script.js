let mylib=[];

const addbtn=document.querySelector('#add');
const dialog=document.querySelector('dialog');
const editdialog=document.querySelector('dialog.edit');
const form=document.querySelector('dialog form');
const cancelbtn=document.querySelector('.cancel');
const submitbtn=document.querySelector('.submit');
const cards=document.querySelector('.cards');
addbtn.addEventListener('click',()=>{
    dialog.showModal();
})
cancelbtn.addEventListener('click',()=>{
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#pages').value='';
    document.querySelector('#read').checked=false;
    document.querySelectorAll('input').forEach((element)=>{
        element.classList.remove('selected');
    })
    dialog.close();
})

form.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        document.querySelectorAll('input').forEach((element)=>{
            element.classList.add('selected');
        })
        event.preventDefault();
        form.requestSubmit();
    }
})

class Book{
    #title;
    #author;
    #pages;
    #read;
    constructor(title,author,pages,read){
        this.#title=title;
        this.#author=author;
        this.#pages=pages;
        this.#read=read;
    }
    static changeReadStatus(book){
        book.#read=!book.#read;
    }


}

document.querySelector('.submit').addEventListener('click',()=>{
    document.querySelectorAll('input').forEach((element)=>{
        element.classList.add('selected');
    })
})

document.querySelector('dialog form').addEventListener('submit',(event)=>{
    event.preventDefault();
    let title=document.querySelector('#title').value;   
    let author=document.querySelector('#author').value;
    let pages=document.querySelector('#pages').value;
    let read=document.querySelector('#read').checked;
    mylib.push(new Book(title,author,pages,read));
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#pages').value='';
    document.querySelector('#read').checked=false;
    document.querySelectorAll('input').forEach((element)=>{
        element.classList.remove('selected');
    })
    const div=document.createElement('div');
    div.classList.add('card');
    const svg=document.createElement('img');
    svg.src='./images/pencil.svg';
    svg.setAttribute('id','editbtn');
    const p1=document.createElement('p');
    p1.textContent=title;
    const p2=document.createElement('p');
    p2.textContent='by '+author;
    const p3=document.createElement('p');
    p3.textContent=pages+' Pages';
    div.appendChild(svg);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    const readbtn=document.createElement('button');
    if(read){
        readbtn.classList.add('read');
        readbtn.textContent='Read';
    } 
    else readbtn.textContent='Not Read';
    readbtn.setAttribute('id','read');
    const remove=document.createElement('button');
    remove.textContent='Remove';
    remove.setAttribute('id','remove');
    div.appendChild(readbtn);
    div.appendChild(remove);
    div.addEventListener('click',(event)=>{
        if(event.target.id=='read'){
            readbtn.classList.toggle('read');
            let index=event.target.parentNode.dataset.index;
            Book.changeReadStatus(mylib[index]);
            if(readbtn.classList.contains('read')) readbtn.textContent='Read';
            else readbtn.textContent='Not Read';
        }
        else if(event.target.id=='remove'){
            let index=event.target.parentNode.dataset.index;
            let child=event.target.parentNode;
            mylib.splice(index,1);
            cards.removeChild(child);
            console.log(mylib);
        }
        else if(event.target.id=='editbtn'){
            editdialog.showModal();
        }
    })
    div.dataset.index=mylib.length-1;
    document.querySelector('.cards').appendChild(div);
    dialog.close();
})