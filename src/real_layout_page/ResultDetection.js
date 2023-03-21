import '../stylesheet/ResultDetection.css';
import Header from './inc/Header.js';
import Footer from './inc/Footer.js';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, Link } from 'react-router-dom';

function ResultDetection() {
    const [labelResult, setLabelResult] = useState(null)
    let location = useLocation();

    useEffect(() => {
        if (location.state && location.state.inputText && location.state.inputType) {
            let randomInt = Math.floor(Math.random() * 10) + 1
            let labelResult = (randomInt < 5) ? 'hoax' : 'not hoax'
            setLabelResult(labelResult);
        }
    }, [])

    return (
        <div>
            <Header />
            <div className="content">
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