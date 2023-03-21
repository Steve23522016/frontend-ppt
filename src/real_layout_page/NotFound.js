import Header from './inc/Header.js';
import Footer from './inc/Footer.js';

function NotFound() {
    return (
        <div>
            <Header />
            <div className="content">
                <h2>The page you requested is not found</h2>
            </div>
            <Footer />
        </div>
    );
}
  
export default NotFound;