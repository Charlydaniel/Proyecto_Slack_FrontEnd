import { useContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/UseFetch";
import { HomeContext } from "../../Contexts/HomeContext";
import Spinner from "../Spinner/Spinner";
import WorkspaceListComponent from "../Workspace-Components/WorkspaceList-Components/WorkspaceListComponent";
import { getuser } from "../../services/authService";
import ErrorComponent from "../Error-components/ErrorComponent";
import './HomeComponent.css'
import { COMPONENTS } from "../../constants/commonComponents";
import { useNavigate } from "react-router-dom";

export default function HomeComponent() {

  const { isLoading } = useContext(HomeContext);
  const { loading, response, error, sendRequest } = useFetch();
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate=useNavigate()

  const handleGoto=()=>{
        navigate('/api/workspaces/create/workspace/1')
  }


  useEffect(
              () => {
                    const fethcData=async()=>
                      {
                        await sendRequest(() => getuser());
                        setInitialLoading(false)
                      }

                    fethcData()
                        
                  }, []
                )

  useEffect(
            () => {
                    if (response?.user) {setUser(response.user)}
                  }, 
                  [response]
              )

    const handleLogout = () => {localStorage.removeItem("auth_token")
                                navigate("/login")   
    }



  if ( loading || initialLoading || isLoading) {
    return (
      <div>
            <Spinner />
      </div>
    )

  }


    return (
      <div className="home-body">
        <header className="header-login">
          <div className="header-login-icon">
            <a href="https://slack.com/">
              <img
                src={COMPONENTS.HEADER_ICON}
                alt="Slack Logo"
                className="login-logo"
              />
            </a>
          </div>
          <button onClick={handleLogout} className="home-cerrar-sesion-btn">
              Salir
          </button>
        </header>

          {
            error?
            <ErrorComponent error={error}/>
            :
            (
            <section className="section-wellcome">
              <div className="section-text">
                <h1 className="section-title --max-width">¡Hola de nuevo! ¡No olvides hidratarte!</h1>
                <h1 className="section-title --min-width">¡Hola de nuevo!</h1>
                <h5 className="section-subtitle --max-width">Elige uno de los siguientes espacios de trabajo para volver a trabajar con tu equipo.</h5>
                <h5 className="section-subtitle --min-width">Elige uno de los siguientes espacios de trabajo.</h5>
                <h3 className="">Listo para comenzar</h3>
                <p className="section-user">{user?.email || "Usuario"}</p> 
              </div>
              <div>
                  <WorkspaceListComponent/> 
              </div>
            </section>
            )
          }
              <footer>
                <div className="footer-slac-uses">
                  <img className="footer-slac-uses-img" src="https://a.slack-edge.com/bv1-13/get-started-workspaces-icon-88e0cb1.svg" alt="" />
                  <span className="footer-slac-uses-text">¿Quieres usar Slack con un equipo distinto?</span>
                  <button onClick={handleGoto} className="footer-button-workspaces">Crear otro espacio de trabajo</button>
                </div>
              </footer>
      </div>
  );
}
