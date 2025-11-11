import React, { useEffect, useState } from 'react';
import './ErrorComponent.css';
import { FiAlertTriangle, FiMenu, FiX } from "react-icons/fi";
import { COMPONENTS } from '../../constants/commonComponents';

export default function ErrorComponent({ error }) {

const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);


    return (
        <div className='error-main'>
            <header className='error-header'>
                <aside className='icon_container'>
                    <img src={COMPONENTS.HEADER_ICON} alt="" />
                </aside>

                <button
                    className='minsize_button'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                <aside className='error-menu'>
                    <nav className='error-menu-buttons'>
                        <button className='button-menu'>Productos</button>
                        <button className='button-menu'>Precios</button>
                        <button className='button-menu'>Ayuda</button>
                        <div className='button-menu-ne'>
                            <button className='ne-button'>NE</button>
                            <span className='button-menu-ne-text'>
                                Nuevo espacio de trabajo
                            </span>
                        </div>
                    </nav>
                </aside>
                {isOpen && (
                    <nav className="mobile-menu">
                        <ul>
                            <li><a href="/home">Inicio</a></li>
                            <li><a href="/help">Ayuda</a></li>
                            <li><a href="/contact">Contacto</a></li>
                        </ul>
                    </nav>
                )}
            </header>
            <div className='error-body --complete'>
                <div className="error-container">
                    <div className='error-icon'>
                        <FiAlertTriangle />
                    </div>
                    <div className="error-message">
                        Error al cargar la página: {error?.message || "Desconocido"}
                    </div>
                </div>
            </div>
            <footer>
                <div className='footer-options-list'>
                    <ul className='footer-options-list-ul'>
                        <li className='li-title'>UTILIZAR SLACK</li>
                        <li>Productos</li>
                        <li>Enterprise</li>
                        <li>Precios</li>
                        <li>Ayuda</li>
                        <li>Guías para usar Slack</li>
                        <li>Tienda de Slack</li>
                        <li>API</li>
                    </ul>
                    <ul className='footer-options-list-ul'>
                        <li className='li-title --red'>SLACK ❤️</li>
                        <li>Trabajos</li>
                        <li>Clientes</li>
                        <li>Programadores</li>
                        <li>Eventos</li>
                        <li>Blog</li>
                    </ul>
                    <ul className='footer-options-list-ul'>
                        <li className='li-title --green'>LEGAL</li>
                        <li>Privacidad</li>
                        <li>Seguridad</li>
                        <li>Condiciones de servicio</li>
                        <li>Políticas</li>
                    </ul>
                    <ul className='footer-options-list-ul'>
                        <li className='li-title --blue'>ENLACES HABITUALES</li>
                        <li>Descargar App para ordenador</li>
                        <li>Descargar la aplicación móvil</li>
                        <li>Directrices de la marca</li>
                        <li>Slack en el trabajo</li>
                        <li>Estado</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
