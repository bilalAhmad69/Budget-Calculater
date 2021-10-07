import React from "react";
import Eitem from "./ExpenseItem"
import {MdDelete} from "react-icons/md"
function ExpenseList({expenses , handleClearAll,handleClearItem ,handleEdit})
{
  
    return <>
      <ul className = "list">
          {
              expenses.map((expense) => {
                return <Eitem key = {expense.id} expenses = {expense}
                 handleClearItem = {handleClearItem}
                 handleEdit = {handleEdit}/>
              })
          }

      </ul>
      {expenses.length > 0 && <button className = "btn" onClick = {handleClearAll}>Clear All
      <MdDelete className = "btn-icon"/>
      </button>}
     
     
     
     </>
}
export default ExpenseList;        