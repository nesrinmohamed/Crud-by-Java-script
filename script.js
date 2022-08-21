let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
// get total
let mode ='create'
let tmp 
submit.innerHTML='Create'
function getTotal(){
if(total.value != ''){
    let result = (+price.value + +taxes.value + +ads.value ) - 
    +discount.value
    console.log(result)
    total.innerHTML = result
    total.style.background ='green'
}else{
total.innerHTML = ''
total.style.background ='rgb(116, 11, 3)'
}
}
// create product
let datapro;
if(localStorage.product != null){
datapro = JSON.parse(localStorage.product)
}else{
 datapro = []
}
//save local storage

submit.onclick = function (){
 let newpro = {
title: title.value.toLowerCase(),
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value.toLowerCase()

}
if(title.value != '' 
&& price.value !='' 
&& category.value != ''
&& newpro.count <= 100
){
    if (mode === 'create'){
        if(newpro.count > 1){
            for (var i=0 ; i<newpro.count ; i++){
                datapro.push(newpro)
            }
        }else{
            datapro.push(newpro)
        }
    }else{
            datapro[tmp] =newpro
            mode='create';
            submit.innerHTML = 'Create',
            count.style.display='block'
        }
        clearData()
}
 

localStorage.setItem('product' , JSON.stringify(datapro))
// console.log(datapro)

showData()
}
//clear inputs
function clearData(){
 title.value='';
price.value = '';
taxes.value ='';
ads.value='';
discount.value ='';
total.innerHTML='';
count.value='';
category.value='';
console.log('data')


}
//read
function showData(){

let tabel = ''
for(var i=0; i<datapro.length ; i++){
    tabel += `
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick=updateData(${i}) id='update'>Update</button></td>
    <td><button  onclick=deleteData(${i})  id='delte'>Delete</button></td>
    </tr>
    `
}
document.getElementById('tbody').innerHTML = tabel
let btnDelete = document.getElementById('deleteAll')
if(datapro.length>0){
btnDelete.innerHTML = `
<button onclick=deleteAll()>delete All (${i})</button>
`
}else{
    btnDelete.innerHTML =''
}
}
showData()
//count
//delete
function deleteData(i){
        datapro.splice(i,1)
        localStorage.product = JSON.stringify(datapro)
        showData()
        // console.log('deleye')
    }
    function deleteAll(){
        localStorage.clear()
        datapro.splice(0)
        showData()
    }
//update

function updateData(i){
title.value =datapro[i].title
price.value =datapro[i].price
taxes.value =datapro[i].taxes
ads.value =datapro[i].ads
discount.value =datapro[i].discount
getTotal()
count.style.display='none'
category.innerHtml =datapro[i].category
submit.innerHTML = 'Update'
mode='update'
tmp =i;
scroll({
top: 0,
behavior: 'smooth',
})
}
//search
let  searchMode = 'title'
function getSearchMode (id){
    let search = document.getElementById('search')
if(id == 'searchTitle'){
searchMode = 'title',
search.placeholder ='search by title'
}else{
searchMode = 'category'
search.placeholder = 'search by category'

}

console.log(searchMode)
search.focus()
search.value='';
showData()
}
function searchData(value){
let tabel =''
    if(searchMode =='title'){
    for(var i=0 ; i<datapro.length ; i++){
        if(datapro[i].title.includes(value.toLowerCase())){
        tabel += `
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick=updateData(${i}) id='update'>Update</button></td>
    <td><button onclick='deleteData(${i}) id='delte'>Delete</button></td>
    </tr>
    `
    }
}
    }else{
        for(var i=0 ; i<datapro.length ; i++){
            if(datapro[i].category.includes(value.toLowerCase())){
            tabel += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick=updateData(${i}) id='update'>Update</button></td>
        <td><button onclick='deleteData(${i}) id='delte'>Delete</button></td>
        </tr>
        `
        }
    }
    }
document.getElementById('tbody').innerHTML = tabel

    }

//clear data(validation)
