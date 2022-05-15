const addBtn=document.getElementById('add-btn');
const firstNameInput=document.getElementById('firstname');
const lastNameInput=document.getElementById('lastname');
const countryInput=document.getElementById('country');
const scoreInput=document.getElementById('score');
const outputSection=document.querySelector('.output-section');
const alertBox=document.querySelector('.alert-box');

addBtn.addEventListener('click',e=>{
    clearAll();
    let isError=false;
    let firstName,lastName,country,score;
    if(firstNameInput.value){
        firstName=firstNameInput.value;
        if(lastNameInput.value){
            lastName=lastNameInput.value;
            if(countryInput.value){
                country=countryInput.value;
                if(scoreInput.value){
                    score=Number(scoreInput.value);
                }else{
                    isError=true;
                }
            }else{
                isError=true;
            }
        }else{
            isError=true;
        }
    }else{
        isError=true;
    }
    if(isError){
        alertBox.textContent='All fields are required';
        alertBox.style.display='block';
        showResults();
    }else{
        firstNameInput.value='';
        lastNameInput.value='';
        countryInput.value='';
        scoreInput.value='';
        alertBox.style.display='none';
        if(localStorage.getItem('Results')!==null){
            const getResults=localStorage.getItem('Results');
            localStorage.removeItem('Results');
            const arrResults=JSON.parse(getResults);
            arrResults.push({firstName:firstName,lastName:lastName,country:country,score:score});
            const jsonResults=JSON.stringify(arrResults);
            localStorage.setItem('Results',jsonResults);
        }else{
            const results=[{firstName:firstName,lastName:lastName,country:country,score:score}];
            const jsonResults=JSON.stringify(results);
            localStorage.setItem('Results',jsonResults);
        }

        showResults();
        isError=false;
    }
});
function showResults(){
    if(localStorage.getItem('Results')!==null){
        const getResults=localStorage.getItem('Results');
        const results=JSON.parse(getResults);
        for(let i=0;i<results.length;i++){
            const outputRow=document.createElement('div');
            outputRow.className='output-row';
            outputRow.id=i;
            const name=document.createElement('h2');
            name.textContent=results[i].firstName+' '+results[i].lastName;
            name.className='name';
            outputRow.appendChild(name);
            const country=document.createElement('h2');
            country.textContent=results[i].country;
            country.className='country';
            outputRow.appendChild(country);
            const score=document.createElement('h5');
            score.textContent=results[i].score;
            score.className='score';
            outputRow.appendChild(score);
            const btnBox=document.createElement('div');
            btnBox.className='btn-box';
            const deleteBtn=document.createElement('button');
            deleteBtn.innerHTML=`<i class="fa-solid fa-trash-can"></i>`;
            deleteBtn.className='delete-btn';
            deleteBtn.onclick=deleteRow;
            btnBox.appendChild(deleteBtn);
            const plusFiveBtn=document.createElement('button');
            plusFiveBtn.textContent='+ 5';
            plusFiveBtn.className='plus-btn';
            plusFiveBtn.onclick=plusFive;
            btnBox.appendChild(plusFiveBtn);
            const minusFiveBtn=document.createElement('button');
            minusFiveBtn.textContent='- 5';
            minusFiveBtn.className='minus-btn';
            minusFiveBtn.onclick=minusFive;
            btnBox.appendChild(minusFiveBtn);
            outputRow.appendChild(btnBox);
            outputSection.appendChild(outputRow);
        }
    }else{
        alertBox.textContent='Ther is no score yet!';
        alertBox.style.display='block';

    }

}
function clearAll(){
    while(outputSection.firstChild){
        outputSection.removeChild(outputSection.firstChild);
    }
}
showResults();

function deleteRow(){
    const id=this.parentNode.parentNode.id;
    const getResults=localStorage.getItem('Results');
    localStorage.removeItem('Results');
    const arrResults=JSON.parse(getResults);
    const newArr=[];
    for(let i=0;i<arrResults.length;i++){
        if(i==id){
            continue;
        }else{
            newArr.push(arrResults[i]);
        }
    }
    const jsonResults=JSON.stringify(newArr);
    localStorage.setItem('Results',jsonResults);
    clearAll();
    showResults();
}
function plusFive(){
    const id=this.parentNode.parentNode.id;
    const getResults=localStorage.getItem('Results');
    localStorage.removeItem('Results');
    const arrResults=JSON.parse(getResults);
    if(arrResults[id].score<100){
        arrResults[id].score+=5;
    }
    if(arrResults[id].score>100){
        arrResults[id].score=100;
    }
    const jsonResults=JSON.stringify(arrResults);
    localStorage.setItem('Results',jsonResults);
    clearAll();
    showResults();
}
function minusFive(){
    const id=this.parentNode.parentNode.id;
    const getResults=localStorage.getItem('Results');
    localStorage.removeItem('Results');
    const arrResults=JSON.parse(getResults);
    if(arrResults[id].score>0){
        arrResults[id].score-=5;
    }
    if(arrResults[id].score<0){
        arrResults[id].score=0;
    }
    const jsonResults=JSON.stringify(arrResults);
    localStorage.setItem('Results',jsonResults);
    clearAll();
    showResults();
}