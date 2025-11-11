import React, { useContext,useEffect,useParams}  from "react"
import LoguinComponent from "../../Components/Login-Components/LoginComponent"


export default function RegisterScreen(){

    
const isRegister=true

return (
  <LoguinComponent isRegister={isRegister}/>
)

}