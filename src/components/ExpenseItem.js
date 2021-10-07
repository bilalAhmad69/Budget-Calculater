import {MdDelete , MdEdit} from 'react-icons/md'
function ExpenseItem({expenses, handleClearItem , handleEdit})
{
  const {id , charge , amount} = expenses;
    return <li className = 'item'>
     
      <div className="info" key = {id}>
      <span className="charge">{charge}</span>
      <span className="amount">RS {amount}</span>
      </div>
      <div>
        <button className = "edit-btn" aria-label = "edit button" onClick = {()=>handleEdit(id)} > <MdEdit/> </button>
        <button className = "clear-btn" aria-label = "delete button" onClick = {()=>handleClearItem(id)}> <MdDelete/> </button>
      </div>
     
     
     
     </li>
}
export default ExpenseItem;        