import React, { useContext,useEffect,useParams}  from "react"
import LoguinComponent from "../../Components/Login-Components/LoginComponent"


export default function LoguinScreen(){

const isRegister=false

return (
  <LoguinComponent isRegister={isRegister}/>
)

}