
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuid } from 'uuid';

function Cartas() {

    const initialState = {
        'id':'',
        'nombre':'',
        'direccion':'',
        'telefono':''

    }

    const btnActual = useRef(null);

    const [datos, setDatos] = useState(initialState)
    //deconstruccion de datos u objetos
    const { nombre, direccion, telefono, id } = datos
    const [informacion, setInformacion] = useState([])
    const[isActive, setIsActive] = useState(false)

    const handleSubmit = (event) =>{
        event.preventDefault();
        const initialState2 = {
            'id':uuid(),
            'nombre':datos.nombre,
            'direccion':datos.direccion,
            'telefono':datos.telefono,
        };
        let inf = informacion
        inf.push(initialState2);
        setInformacion(inf);
        setDatos(initialState);
        console.log(informacion);
    }

    const handleChange = (e) => {
        setDatos({
            ...datos, [e.target.name]:e.target.value
        });
    }
    const handleEliminar = e =>{
        const id = e.target.name.slice(1)
        let inf = []
        for(const info of informacion){
            if(info.id !== id) inf.push(info)
        }
        setInformacion(inf)
    }
    /**
     * When the user clicks on the button, the function will get the id of the button, set the modal to
     * active, and then loop through the array of objects to find the object with the same id as the
     * button and set the modal's state to that object.
     */
    const handleModificar = e => {
        const id = e.target.name.slice(1)
        setIsActive(true)

        for(const info of informacion){
            if(info.id === id) setDatos(info) 
        }
    }

    const handleActualizar = e =>{
        const id = datos.id
        let inf = informacion
        const index = inf.findIndex(i => i.id == id)
        const modifiedState = {
            'id': datos.id,
            'nombre': datos.nombre,
            'direccion': datos.direccion,
            'telefono': datos.telefono
        }
        inf[index] = modifiedState
        setInformacion(inf)
        setDatos(initialState)

        setIsActive(false)

    }

    return (  
    <Container>
        <Row className="row-cols-3">
            {
                informacion.map(inf => (
                    <Col key={inf.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{inf.nombre}</Card.Title>
                                    <Card.Text>ID: {inf.id}</Card.Text>
                                    <Card.Text>Direccion: {inf.direccion}</Card.Text>
                                    <Card.Text>Telefono: {inf.telefono}</Card.Text>
                                    <Button name={'m' + inf.id} variant="info" className="me-2" onClick={handleModificar}>Modificar</Button>
                                    <Button name={'e' + inf.id} variant="danger" className="ms-2" onClick={handleEliminar}>Eliminar</Button>
                            </Card.Body>
                        </Card>
                    </Col>))
            }
            
            
        </Row>

        <Row>
            <Col></Col>
            <Col>
            <Form onSubmit={ handleSubmit }>
                <Form.Group className="mb-3">
                    <Form.Label>Ingresa tu nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            placeholder="Ingresa tu nombre"
                            value = {nombre} onChange = {handleChange}

                        />

                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ingresa tu direccion</Form.Label>
                        <Form.Control
                            type="text"
                            name="direccion"
                            placeholder="Ingresa tu direccion"
                            value = {direccion} onChange = {handleChange}
                        />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Ingresa tu telefono</Form.Label>
                        <Form.Control 
                            type="text"
                            name="telefono"
                            placeholder="Ingresa tu telefono"
                            value = {telefono} onChange = {handleChange}
                        />
                </Form.Group>
                <Button variant="primary" type="submit" name="btnAgregar">
                    Agregar
                </Button>
                <Button variant="info" name={id} className={isActive ? 'ml-3' : 'display-none'} onClick={handleActualizar}>
                    Actualizar
                </Button>
            </Form>
            </Col>
                
            
        </Row>

    </Container>
        
    )
}

        

export default Cartas;