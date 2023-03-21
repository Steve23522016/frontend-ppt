import '../stylesheet/Home.css';
import Header from './inc/Header.js';
import Footer from './inc/Footer.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';

function Home() {
    const [inputText, setInputText] = useState(null);
    const [inputType, setInputType] = useState('non-summarization');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/result', {state : {
            inputText : inputText,
            inputType : inputType
        }})
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingTextarea" label="Input your statement text here" className="mb-3">
                        <Form.Control as="textarea" placeholder="Leave your text here" style={{height: '100px'}} onChange={(e) => setInputText(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingDropdownArea" label="Choose hoax detection category type" className="mb-3">
                        <Form.Select aria-label="Choose model type here" onChange={(e) => setInputType(e.target.value)}>
                            <option value="non-summarization" selected>Non Summarization Type</option>
                            <option value="summarization">Summarization Type</option>
                        </Form.Select>
                    </FloatingLabel>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <Footer />
        </div>
    );
}
  
export default Home;