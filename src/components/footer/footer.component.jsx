import { React, useState } from 'react';
import { Col, Image } from 'react-bootstrap';
import Banner from '../../logo/banner.svg';
import './footer.css';
import { Report } from '../forms/report';

export const Footer = ({isShow=true}) => {

    const [isReport, setReport] = useState(false);

    return(
        <footer id='footer' hidden={!isShow}>
            <Col md={3} className='text-team p-auto mt-3'>
                <div className='footer-container'>
                    <div className="footer-title mb-3">Đội ngũ phát triển</div>
                    <div className='text-name'>Nguyễn Ngọc Thạch</div>
                    <div className='text-name'>Đào Trọng Tuấn</div>
                    <div className='text-name'>Phạm Văn Trọng</div>
                    <div className='text-name'>Nguyễn Phú Quốc</div>
                    <div className='text-name'>Hồ Mạnh Tân</div>
                </div>
            </Col>
            <Col md={5} className='web-logo'>
                <Image src={Banner} alt='weHome' id='footer-banner'/>
            </Col>
            <Col md={2} className='text-team p-auto mt-3'>
                <div className='footer-container'>
                    <div className="footer-title mb-3">Liên hệ</div>
                    <div className='text-name'><i className="bi bi-telephone-fill footer-icon me-2"></i>0123456789</div>
                    <div className='text-name'><i className="bi bi-envelope footer-icon me-2"></i>wehome@gmail.com</div>
                </div>
            </Col>
            <Col md={2} className='text-team p-auto mt-3'>
                <div className='footer-container'>
                    <div className="footer-title mb-3">Hỗ trợ</div>
                    <div className='text-name' id="report-div" onClick={()=>setReport(true)}>Gửi phản hồi</div>
                    <div className='text-name'></div>
                </div>
            </Col>
            <Report show={isReport} onHide={()=>{setReport(false)}}/>
        </footer>
    )
}