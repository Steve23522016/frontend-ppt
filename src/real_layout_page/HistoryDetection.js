import '../stylesheet/HistoryDetection.css';
import Header from './inc/Header.js';
import Footer from './inc/Footer.js';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Table from 'react-bootstrap/Table';
import {ENDPOINT_URL} from '../config/constants.js';

function HistoryDetection() {
    const [textKeyword, setTextKeyword] = useState(null)
    const [textDetectionType, setTextDetectionType] = useState(null)
    const [textResultType, setTextResultType] = useState(null)
    const [listItems, setListItems] = useState([]);
    const [showToastDeleteSuccess, setShowToastDeleteSuccess] = useState(false);
    const [showToastDeleteFailed, setShowToastDeleteFailed] = useState(false);

    const fetchDataBasedFilter = () => {
        let formData = new FormData()
        if (textKeyword) {
            formData.append('inputKeyword', textKeyword)
        }
        if (textDetectionType) {
            formData.append('inputDetectionType', textDetectionType)
        }
        if (textResultType) {
            formData.append('inputResultType', textResultType)
        }
        
        const fetchData = async() => {
            const data = await fetch(ENDPOINT_URL + '/history_label', {
                method: 'POST',
                body: formData
            });
            const realData = await data.json()
            return realData
        }
        
        return fetchData()
    }

    const deleteData = (id) => {
        const deleteFunc = async() => {
            const data = await fetch(ENDPOINT_URL + '/delete_history/' + id, {
                method: 'DELETE'
            });
            const realData = await data.json()
            return realData
        }
        
        return deleteFunc()
    }

    useEffect(() => {
        fetchDataBasedFilter()
        .then(data => {
            setListItems(data.data)
        })
    }, [])

    const toggleShowToastDeleteSuccess = () => setShowToastDeleteSuccess(!showToastDeleteSuccess);
    const toggleShowToastDeleteFailed = () => setShowToastDeleteFailed(!showToastDeleteFailed);

    let handleFilter = (e) => {
        e.preventDefault()
        fetchDataBasedFilter()
        .then(data => {
            setListItems(data.data)
        })
    }

    let deleteItem = (e, id) => {
        e.preventDefault()
        deleteData(id)
        .then(data => {
            if (data.status == 200) {
                setListItems(listItems.filter(item => item.id != id))
                toggleShowToastDeleteSuccess()
            } else {
                toggleShowToastDeleteFailed()
            }
        })
        .catch(err => {
            toggleShowToastDeleteFailed()
        })
    }

    return (
        <div class="wrapper">            
            <Header />
            <div className="content" style={{padding:'20px'}}>
                <ToastContainer className="p-3" style={{position:'relative'}} position="top-start">
                    <Toast bg='primary' show={showToastDeleteSuccess} onClose={toggleShowToastDeleteSuccess}>
                        <Toast.Header>
                            <strong className="me-auto">Notification</strong>
                        </Toast.Header>
                        <Toast.Body>Success delete history detection item!</Toast.Body>
                    </Toast>
                    <Toast bg='danger' show={showToastDeleteFailed} onClose={toggleShowToastDeleteFailed}>
                        <Toast.Header>
                            <strong className="me-auto">Notification</strong>
                        </Toast.Header>
                        <Toast.Body>Failed delete history detection item!</Toast.Body>
                    </Toast>
                </ToastContainer>
                <div className="filter">
                    <Container>
                        <Row>
                            <Col md={4} xs={12}>
                                <FloatingLabel controlId="floatingTextKeyword" label="Search by keyword" className="mb-3">
                                    <Form.Control as="input" placeholder="Search by keyword" defaultValue={textKeyword} onChange={(e) => setTextKeyword(e.target.value)} />
                                </FloatingLabel>
                            </Col>
                            <Col md={4} xs={12}>
                                <FloatingLabel controlId="floatingDetectionType" label="Filter by detection type" className="mb-3">
                                    <Form.Select aria-label="Filter detection type" defaultValue={textDetectionType} onChange={(e) => setTextDetectionType(e.target.value)}>
                                        <option value="">--- Select Detection Type ---</option>
                                        <option value="not summarization">Non Summarization</option>
                                        <option value="summarization">Summarization</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md={4} xs={12}>
                                <FloatingLabel controlId="floatingResultType" label="Filter by result type" className="mb-3">
                                    <Form.Select aria-label="Filter result type" defaultValue={textResultType} onChange={(e) => setTextResultType(e.target.value)}>
                                        <option value="">--- Select Result Type ---</option>
                                        <option value="not hoax">Non Hoax</option>
                                        <option value="hoax">Hoax</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Col md={12} xs={12}>
                            <Button variant="primary" onClick={handleFilter}>
                                Filter
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="/">
                                <Button variant="secondary">
                                    Back To Main Page
                                </Button>
                            </Link>
                        </Col>
                    </Container>
                </div>
                <div className="list-item">
                    <Container>
                        {
                            (listItems.length > 0)
                            ?
                                <Table responsive striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Input Text/Paragraph</th>
                                            <th>Detection Category</th>
                                            <th>Summarization Result</th>
                                            <th>Output Label</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listItems.map(item =>
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td className="restrict-column">{item.input_text}</td>
                                                    <td>{item.process_category}</td>
                                                    <td className="restrict-column">{item.summarization_result ? item.summarization_result : 'None'}</td>
                                                    <td>{item.output_label}</td>
                                                    <td className="restrict-column">{item.date}</td>
                                                    <td>
                                                        <Button variant="danger" onClick={(e) => deleteItem(e, item.id)}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            :
                                <h3>The detection history is empty</h3>
                        }
                    </Container>
                </div>
            </div>
            <Footer />
        </div>
    );
}
  
export default HistoryDetection;