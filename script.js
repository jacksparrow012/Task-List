let form=document.getElementById("addForm");
let itemList=document.querySelector(".list-group");

///**add item */
form.addEventListener("submit",addItem)
///**Add item */
function addItem(e){
    e.preventDefault();
////**get input value */
let inputValue=document.getElementById("inputValue").value;
if(inputValue==""){
    alert("empty input not allowed")
}else{
    ///**Creating link (a) element*/
let newElement=document.createElement("a")
newElement.href="#";
newElement.className="list-group-item  list-group-item-action mt-1"
////***creating a text node */
let newNode=document.createTextNode(inputValue)
//console.log(newNode);
newElement.appendChild(newNode)
///***creating new (i) element */
let newFont=document.createElement("i")
newFont.className="far fa-times-circle float-end fa-2x del"
//console.log(newFont);
newElement.appendChild(newFont)
//console.log(newElement);
itemList.appendChild(newElement)
//console.log(itemList);
storeTaskInLocalStorage(inputValue)
}
}

//***remove item */
itemList.addEventListener("click",removeItem)

function removeItem(e){
     if(e.target.classList.contains("del")){
         if(confirm("Are you sure you want to delete?")){
             let li=e.target.parentElement;
           itemList.removeChild(li)
           removeFromLocalStorage(li)
         }
     }
}

////**clear and return  full cart */
document.getElementById("clearCart").addEventListener("click",(e)=>{   


   if(confirm("Are you sure you want to delete?")){
 
    Array.from(itemList.children).forEach(item=>{
        item.style.display="none"
    })
   }
})
document.getElementById("returnCart").addEventListener("click",(e)=>{
    Array.from(itemList.children).forEach(item=>{
            item.style.display="block"
        })
})

////////////***filtering element: */

let filter=document.getElementById("filter")

filter.addEventListener("keyup",(e)=>{
let text=e.target.value.toLowerCase();
let items=itemList.getElementsByTagName("a")
Array.from(items).forEach(item=>{
    let itemName=item.textContent
    if(itemName.toLowerCase().indexOf(text) !=-1){
        item.style.display="block"
    }else{
        item.style.display="none"
    }
})
})

//////////**local storage */

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task)

    localStorage.setItem("tasks",JSON.stringify(tasks))
}
//////////***for getting back data from local storage when page is loaded */
document.addEventListener("DOMContentLoaded",getTask)

function getTask(){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"))
    }

    tasks.forEach(item=>{
        let newElement=document.createElement("a")
newElement.href="#";
newElement.className="list-group-item  list-group-item-action mt-1"
////***creating a text node */
let newNode=document.createTextNode(item)
//console.log(newNode);
newElement.appendChild(newNode)
///***creating new (i) element */
let newFont=document.createElement("i")
newFont.className="far fa-times-circle float-end fa-2x del"
//console.log(newFont);
newElement.appendChild(newFont)
//console.log(newElement);
itemList.appendChild(newElement)
    })
}

function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"))
    }
    let li=taskItem
    li.removeChild(li.lastChild)
    tasks.forEach((task,index)=>{
        if(li.textContent.trim()==task){
            tasks.splice(index,1)
        }
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))
}