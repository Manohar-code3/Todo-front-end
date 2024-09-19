import { useEffect, useState } from "react"
import { getTodo, saveTodo, update } from "../Service/TodoService"
import { useNavigate, useParams } from "react-router-dom"

const Todo = () => {
  const navigator = useNavigate()
  const [title,setTittle]=useState('')
  const [description,setDescription]=useState('')
  const [completed,setComplete]=useState(false)
  const {id} =useParams()

  function saveOrUpdate(e)
  {
    e.preventDefault()
    const todo={title,description,completed}
    console.log(todo)

    if(id)
    {
      
      update(id,todo).then((response)=>{
        navigator("/todos")
      }).catch((error)=>{
        console.error(error)
      })
    }
    else{
      saveTodo(todo).then((response) =>{
        console.log(response.data)
        navigator('/todos')  
      }).catch(error =>{
        console.error(error)
      })
    }

    
    

  }
  function pageTittle()
  {
    if(id)
    {
      return <h2 className="text-center">UPDATE TODO</h2>
    }
    else{
      return  <h2 className="text-center">ADD TODO</h2>
    }
  }

  useEffect(()=>{
    if(id)
    {
      getTodo(id).then((response)=>{
        console.log(response.data)
        setTittle(response.data.title)
        setDescription(response.data.description)
        setComplete(response.data.completed)
      }).catch((error) =>{
        console.error(error)
      })
    }
  },[id])
  

  return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTittle()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Title :</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="enter the title "
                    name="title"
                    value={title}
                    onChange={(e)=> setTittle(e.target.value)}
                  >

                  </input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Description :</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="enter the description"
                    name="desciption"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                  >
                  </input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">completed</label>
                  <select className="form-control" value={completed} onChange={(e) => setComplete(e.target.value)}>
                    <option value="false">NO</option>
                    <option value="true">YES</option>
                  </select>
                 
                </div>
                <button className="btn btn-success" onClick={(e)=> saveOrUpdate(e)}>Submit</button>
                
              </form>

            </div>

          </div>

        </div>
      </div>
  )
}

export default Todo

