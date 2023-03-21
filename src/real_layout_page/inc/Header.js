import '../../stylesheet/inc/Header.css';
import ITBLogo from '../../image/itb-logo.png';
import { Container, Row, Col } from 'react-bootstrap';

function Header() {
    return (
        <div class="navbar">
            <Container>
                <Col md={4} xs={12}>
                    <img src={ITBLogo} alt="ITB Logo" class="campus-logo" />
                </Col>
                <Col md={4} xs={12}>
                    <Row>
                        <Col md={12}>
                            <div class="course-title">IF5200 Proyek Penelitian Terapan</div>
                        </Col>
                        <Col md={12}>
                            <div class="course-title">KELAS 01 - KELOMPOK 3</div>
                        </Col>
                    </Row>
                </Col>
                <Col md={4} xs={12}>
                    <h3 class="app-name">Hoax Detection Classifier</h3>
                </Col>
            </Container>
        </div>
    );
}
  
export default Header;