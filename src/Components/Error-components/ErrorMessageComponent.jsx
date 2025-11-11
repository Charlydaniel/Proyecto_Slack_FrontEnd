import './ErrorComponent.css';
import { FiAlertTriangle } from "react-icons/fi";


export default function ErrorMessageComponent({ error }) {




    return (
            <div className='error-body'>
                <div className="error-container">
                    <div className='error-icon'>
                        <FiAlertTriangle />
                    </div>
                    <div className="error-message">
                        Error al cargar la página: {error?.message || "Desconocido"}
                    </div>
                </div>
            </div>
            
    );
}
