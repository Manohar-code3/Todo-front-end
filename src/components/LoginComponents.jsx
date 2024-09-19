import { useState } from "react"
import { loginAPICall, saveLoggedInUser, storeToken } from "../Service/AuthService"
import { useNavigate } from "react-router-dom"


const LoginComponents = () => {
    const [username,setUsername]=useState('')
    // const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const nav=useNavigate()

    async function HandleLoginForm(e)
    {
        e.preventDefault();
        

        await loginAPICall(username,password).then((response)=>
        {
            console.log(response.data)

            // const token = 'Basic '+window.btoa(username + ":" + password)
            const token = 'Bearer '+response.data.accessToken;
            const role =response.data.role
            storeToken(token)
            saveLoggedInUser(username,role)
            
            nav("/todos")
            window.location.reload(false)
        })
        .catch(error =>{
            console.error(error)
        })
    }
  return (
    <div className="container">
        <br/> <br/>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <h2 className="text-center" >Login </h2>

                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">username</label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter the username or email"
                                        value={username}
                                        
                                        onChange={(e) => setUsername(e.target.value)}
                                        
                                    >
                                    </input>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <label className="col-md-3 control-label">password</label>
                                <div className="col-md-9">
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter the password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>

                            

                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-primary" onClick={(e) => HandleLoginForm(e)}>Login</button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>


    </div>
  )
}

export default LoginComponents