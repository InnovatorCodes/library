const mylib=[];

const addbtn=document.querySelector('#add');
const dialog=document.querySelector('dialog');
const form=document.querySelector('form');
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
        event.preventDefault();
        const newevent=new Event('click');
        submitbtn.dispatchEvent(newevent);
    }
})

function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
};

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
    const p1=document.createElement('p');
    p1.textContent=title;
    const p2=document.createElement('p');
    p2.textContent='by '+author;
    const p3=document.createElement('p');
    p3.textContent=pages+' Pages';
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
    readbtn.addEventListener('click',()=>{
        readbtn.classList.toggle('read');
        if(readbtn.classList.contains('read')) readbtn.textContent='Read';
        else readbtn.textContent='Not Read';
    })
    const remove=document.createElement('button');
    remove.textContent='Remove';
    remove.setAttribute('id','remove');
    remove.addEventListener('click',()=>{
        let index=event.target.dataset.index;
        cards.removeChild(document.querySelectorAll('.card')[index]);
    })
    div.appendChild(readbtn);
    div.appendChild(remove);
    div.dataset.index=mylib.length-1;
    document.querySelector('.cards').appendChild(div);
    dialog.close();
})