import Eform from './components/ExpenseForm';
import EList from './components/ExpenseList'
import Alert from './components/Alert';
import { v4 as uuid } from 'uuid';
import './App.css';
import React ,{ useState ,useEffect} from 'react';
  // const intialExpenses = [{id: uuid(),charge:"Rent" , amount:1600 },
  // {id: uuid(),charge:"Car Payement" , amount:400 },
  // {id: uuid(),charge:"Bills" , amount:1200 }]
  const intialExpenses = localStorage.getItem("expenses")?
  JSON.parse(localStorage.getItem("expenses")):[];
  
function App() {
  const [expenses , setExpenses] = useState(intialExpenses);
  const [charge , setCharge] = useState("");
  const [amount , setAmount] =  useState("");
  const [alert , setAlert] = useState({isShow:false});
  const [isEdit , setIsEdit] =  useState(false);
  const [id , setID] = useState(0);
  useEffect(()=>
  {

    localStorage.setItem('expenses' , JSON.stringify(expenses));
  },[expenses]);
  const handleCharge = e =>
  {
    setCharge(e.target.value);
  }
  const handleAmount = e =>
  {
 
    setAmount(e.target.value);
  }
  const handleAlert = ({type , text}) =>
  {
     setAlert({isShow:true, type , text});
     setTimeout(() => {
      setAlert({isShow:false});
   }, 2000);   
  }
  const handleSubmit = (e) =>
  {
    e.preventDefault();
     if(charge !== '' && amount>0)
     {
       if(isEdit)
       {
             let tempExpenses = expenses.map(item =>  {
               return item.id === id?{...item , charge , amount}:item;
               
             })
             setExpenses(tempExpenses);
             handleAlert({type:"success", text :"item edited"});
       }
      else{
      const singleExpense = {id:uuid() , charge , amount};
      setExpenses([...expenses , singleExpense]);
      handleAlert({type:"success", text :"item added"});
      }
      setAmount("");
      setCharge("");
     }
     else 
     {
      
       handleAlert({type:'danger' , text : 'Charge fieled and Amount is empty and'})
     }
     

  }
  const handleClearAll =()=>
  {
    setExpenses([]);
    handleAlert({type:'danger', text : 'All items deleted'});
  }
  const handleClearItem = (id) =>
  {
     let tempExpenses = expenses.filter(item => item.id !== id);
     setExpenses(tempExpenses);
     handleAlert({type:'danger', text : 'item deleted'});
  }
  const handleEdit=(id) =>

  {
    setIsEdit(true);
    let expenseItem = expenses.find(item => item.id===id)
    let {amount , charge} = expenseItem;
    setAmount(amount);
    setCharge(charge);
    setID(id);
  }


  return (
   <>
     {alert.isShow && <Alert type = {alert.type} text = {alert.text}/>}
     <h1>Budget Calculater</h1>
     <main className = "App">
     <Eform  charge = {charge} amount = {amount} handleAmount ={handleAmount}
     handleCharge = {handleCharge} handleSubmit = {handleSubmit} isEdit ={isEdit}/>
     <EList expenses = {expenses} handleClearAll = {handleClearAll} 
     handleClearItem= {handleClearItem} handleEdit = {handleEdit}/>
     </main>
      <h1>
        Total Spending :
        <span className = "total">
          RS {expenses.reduce((acc , curr) =>
          {
            return acc+= parseInt(curr.amount);

          },0)}
          </span> 
      </h1>
     
   </>
  );
}

export default App;
