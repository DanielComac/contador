import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function Contador() {

    const [contador, setContador] = useState(10);

    const sumar = () => {
        let contador1 = contador;

        contador1++;

        setContador(contador1);
    }
    const restar = () => {
        let contador1 = contador;

        contador1--;

        setContador(contador1);
    }

    return (
        <>
            <p>Contador:{ contador }</p>
            <p>
            <Button variant="info" onClick={ sumar }>+</Button>{' '}
            <Button variant="danger" onClick={ restar }>-</Button>{' '}
            </p>
        </>
    );
}

export default Contador;