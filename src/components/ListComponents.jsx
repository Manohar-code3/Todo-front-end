
import { useState ,useEffect} from 'react'
import { incompleted,completed, getAllTodos, remove } from '../Service/TodoService'
import { useNavigate } from 'react-router-dom'
import { Adminuser } from '../Service/AuthService'



const ListComponents = () => {
    
    const [Todos,setTodo]=useState([])
    const navigator =useNavigate()
    const isAdmin =Adminuser()



    useEffect(() =>{
        listTodo()

    },[])
    function listTodo()
    {
        getAllTodos().then((response) =>{
            setTodo(response.data)


        }).catch((error) =>{
            console.error(error)
        })

        
    }
    function addNewTodo()
    {
        navigator('/add-todo')

    }
    function updateTodo(id)
    {
        console.log(id)
        navigator(`/update-todo/${id}`)
    }
    function deleteTodo(id)
    {
        
        remove(id).then((response) => {
            listTodo()

        }).catch((error)=>{
            console.error(error)
        })


    }
    function McompletedTodo(id)
    {
       
        completed(id).then((response)=>{
            listTodo()

        }).catch((error) =>{
            console.error(error)
        })
    
    }
    function MincompletedTodo(id)
    {
        
        incompleted(id).then((response)=>{
            listTodo()

        }).catch((error) =>{
            console.error(error)
        })
    
    }

  return (
    <div className='container'>
        <h2 className='text-center' >List of TODO</h2>
        {
            isAdmin &&
            <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add New Todo</button>
        }
       
        <div>
            <table className='table table-bordered table-striped'>
               <thead>
                    <tr>
                        <th>Todo List</th>
                        <th>Todo Description</th>
                        <th>Todo Completed</th>
                        <th>Action</th>
                    </tr>
               </thead>
               <tbody>
                {
                    Todos.map(Todo =>
                        <tr key={Todo.id}>
                            <td>{Todo.title}</td>
                            <td>{Todo.description}</td>
                            <td>{Todo.completed ? 'YES':'NO'}</td>
                            <td>
                                {
                                    isAdmin &&
                                    <button className='btn btn-info' onClick={() => updateTodo(Todo.id)}>Update</button>
                                }
                                {
                                    isAdmin &&
                                    <button className='btn btn-danger' onClick={() => deleteTodo(Todo.id)} style={{marginLeft:"10px"}}>Delete</button>
                                }
                                <button className='btn btn-success' onClick={() => McompletedTodo(Todo.id)} style={{marginLeft:"10px"}}>Completed</button>
                                <button className='btn btn-info' onClick={() => MincompletedTodo(Todo.id)} style={{marginLeft:"10px"}}>Incompleted</button>
                            </td>
                        </tr>
                    )
                }
               </tbody>

            </table>
        </div>
        
    </div>
  )
}

export default ListComponents