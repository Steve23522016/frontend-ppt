import '../stylesheet/ResultDetection.css';
import Header from './inc/Header.js';
import Footer from './inc/Footer.js';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, Link } from 'react-router-dom'
import {ENDPOINT_URL} from '../config/constants.js';

function ResultDetection() {
    const [labelResult, setLabelResult] = useState(null)
    let location = useLocation();
    let isLabelSet = false;

    useEffect(() => {
        if (!isLabelSet && location.state && location.state.inputText && location.state.inputType) {
            let formData = new FormData()
            formData.append('inputText', location.state.inputText)
            formData.append('inputType', location.state.inputType)

            const fetchData = async() => {
                const data = await fetch(ENDPOINT_URL + '/calculate_label', {
                    method: 'POST',
                    body: formData
                });
                const realData = await data.json()
                setLabelResult(realData.labelResult)
            }
            
            isLabelSet = true;
            fetchData()
            .catch(console.error);
        }
    }, [])

    return (
        <div>
            <Header />
            <div className="content" style={{paddingTop: '20px'}}>
                <h1>Hoax Detection Result</h1>
                {
                    (labelResult) 
                    ? 
                        <div>
                            <div className="input-cell">
                                <h4>Input Text/Paragraph</h4>
                                <div className="text">{location.state.inputText}</div>
                            </div>
                            <div className="input-cell">
                                <h4>Classifier Type</h4>
                                <div className="text">{location.state.inputType}</div>
                            </div>
                            <div className={(labelResult == "hoax") ? "output-cell-hoax" : "output-cell-non-hoax"}>
                                <span><h4>Label</h4></span>
                                <div className="text">{labelResult}</div>
                            </div>
                        </div>
                    :
                        <div>
                            <h3>Empty Parameter</h3>
                        </div>
                }
                <div>
                    <Link to="/history">
                        <Button variant="primary">
                            Check History
                        </Button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link to="/">
                        <Button variant="secondary">
                            Back to Main Page
                        </Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
  
export default ResultDetection;