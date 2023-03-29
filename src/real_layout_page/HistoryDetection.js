import '../stylesheet/HistoryDetection.css';
import Header from './inc/Header.js';
import Footer from './inc/Footer.js';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import {DUMMY_LIST_ITEM_HISTORY, ENDPOINT_URL} from '../config/constants.js';

function HistoryDetection() {
    const [textKeyword, setTextKeyword] = useState(null)
    const [textDetectionType, setTextDetectionType] = useState(null)
    const [textResultType, setTextResultType] = useState(null)
    const [listItems, setListItems] = useState([]);

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

    useEffect(() => {
        fetchDataBasedFilter()
        .then(data => {
            setListItems(data.data)
        })
    }, [])

    let handleFilter = (e) => {
        e.preventDefault()
        fetchDataBasedFilter()
        .then(data => {
            setListItems(data.data)
        })
    }

    return (
        <div class="wrapper">
            <Header />
            <div className="content" style={{padding:'20px'}}>
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
                                            <th>Output Label</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listItems.map(item =>
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td style={{maxWidth: '100px'}}>{item.input_text}</td>
                                                    <td>{item.process_category}</td>
                                                    <td>{item.output_label}</td>
                                                    <td>{item.date}</td>
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