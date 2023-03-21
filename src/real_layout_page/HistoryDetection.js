import Header from './inc/Header.js';
import Footer from './inc/Footer.js';
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, Link } from 'react-router-dom';

function HistoryDetection() {
    return (
        <div>
            <Header />
            <div className="content">
                
            </div>
            <Footer />
        </div>
    );
}
  
export default HistoryDetection;