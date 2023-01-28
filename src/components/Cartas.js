
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
        'telefono':'',

    }

    const btnActual = useRef(null);

    const [datos, setDatos] = useState(initialState);
    //deconstruccion de datos u objetos
    const { nombre, direccion, telefono } = datos;
    const [informacion, setInformacion] = useState([]);

    useEffect(() =>{
        btnActual.current.disabled = true;
    }, [])

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
    }

    const handleChange = (e) => {
        setDatos({
            ...datos, [e.target.name]:e.target.value
        });
    }
    const handleEliminar = (e) =>{
        let nombre = e.target.name;
        nombre = nombre.slice(1);
        let inf = [];
        for(let i=0; i<informacion.length;i++) {
            if(informacion[i].id !== nombre) {
              inf.push(informacion[i]);  
            }
        }
        setInformacion(inf);
    }
    const handleModificar = m => {
        btnActual.current.disabled = false;
    }
    return (  
    <Container>
        <Row classname="row-cols-3">
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
                <Button variant="primary" type="submit">
                    Agregar
                </Button>
                <Button variant="success" name="btnActualizar" ref={btnActual}>
                    Actualizar
                </Button>
            </Form>
            </Col>
                
            
        </Row>

    </Container>
        
    )
}

        

export default Cartas;