let balance=0,transactions=[],savingsGoal=0;

window.onload=function(){
if(localStorage.getItem('transactions')){
transactions=JSON.parse(localStorage.getItem('transactions'));
balance=parseInt(localStorage.getItem('balance'))||0;
savingsGoal=parseInt(localStorage.getItem('savingsGoal'))||0;
document.getElementById('balance').innerText=balance;
document.getElementById('savingsGoal').innerText=savingsGoal;
renderTransactions();
}
};

function addTransaction(){
const description=document.getElementById('description').value;
const amount=parseInt(document.getElementById('amount').value);
const type=document.getElementById('type').value;
const category=document.getElementById('category').value;
if(description==""||isNaN(amount)){alert("Isi keterangan dan jumlah dengan benar!");return;}
const transaction={description,amount,type,category};
transactions.push(transaction);
updateBalance(type,amount);
saveData();
renderTransactions();
clearForm();
}

function updateBalance(type,amount){
if(type==="income"){balance+=amount;}else{balance-=amount;}
document.getElementById('balance').innerText=balance;
updateSummary();
}

function renderTransactions(){
const list=document.getElementById('transactions');
list.innerHTML="";
transactions.forEach((t,index)=>{
const li=document.createElement('li');
li.innerText=`${t.description}: Rp ${t.amount} (${t.category})`;
li.className=t.type+' category-'+t.category;
const delBtn=document.createElement('button');
delBtn.innerText="Hapus";
delBtn.className="delete-btn";
delBtn.onclick=()=>deleteTransaction(index);
li.appendChild(delBtn);
list.appendChild(li);
});
updateSummary();
}

function clearForm(){document.getElementById('description').value="";document.getElementById('amount').value="";}

function setSavingsGoal(){
const goal=parseInt(document.getElementById('goalAmount').value);
if(isNaN(goal)||goal<=0){alert("Masukkan jumlah target tabungan yang valid!");return;}
savingsGoal=goal;
document.getElementById('savingsGoal').innerText=savingsGoal;
localStorage.setItem('savingsGoal',savingsGoal);
document.getElementById('goalAmount').value="";
}

function deleteTransaction(index){
const t=transactions[index];
if(t.type==="income"){balance-=t.amount;}else{balance+=t.amount;}
transactions.splice(index,1);
saveData();
document.getElementById('balance').innerText=balance;
renderTransactions();
}

function saveData(){
localStorage.setItem('transactions',JSON.stringify(transactions));
localStorage.setItem('balance',balance);
}

function updateSummary(){
let totalIncome=0,totalExpense=0,totalSaving=0;
transactions.forEach(t=>{
if(t.type==="income") totalIncome+=t.amount;
if(t.type==="expense") totalExpense+=t.amount;
if(t.category==="saving") totalSaving+=t.amount;
});
document.getElementById('totalIncome').innerText=totalIncome;
document.getElementById('totalExpense').innerText=totalExpense;
document.getElementById('totalSaving').innerText=totalSaving;
}
