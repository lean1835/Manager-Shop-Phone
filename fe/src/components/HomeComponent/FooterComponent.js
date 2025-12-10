import React from 'react'
import { Link} from 'react-router-dom';
import './FooterComponent.css'
function FooterComponent() {
    return (
        <>
            <div className='footer'>
                <div className='footer-left'>
                    <h5>Tổng đài hỗ trợ</h5>
                    <a>Tư vấn mua hàng (Miễn phí) :</a>
                    <a>0359694849</a>
                    <p />
                    <a>Góp ý, khiếu nại :</a>
                    <a>0359694849</a>
                    <p />
                    <a>Bảo hành, hỗ trợ kỹ thuật :</a>
                    <a>0359694849</a>
                </div>
                <div className='footer-mid'>
                    <h5>Về công ty</h5>
                    <a>Giới thiệu về công ty</a>
                    <p />
                    <a>Tin tức khuyến mãi </a>
                    <p />
                    <a>Giới thiệu máy đổi trả </a>
                    <p />
                    <a>Tra cứu hóa đơn </a>
                    <p />
                    <a>Tra cứu bảo hành </a>
                    <p />
                </div>
                <div className='footer-right'>
                    <h5>Chính sách công ty</h5>
                    <a>Chính sách bảo hành</a>
                    <p />
                    <a>Chính sách đổi trả</a>
                    <p />
                    <a>Chính sách bảo mật</a>
                    <p />
                    <a>Chính sách trả góp</a>
                    <p />
                    <a>Chính sách xử lý dữ liệu cá nhân</a>
                    <p />
                </div>
                <div className='footer-logo'>
                    <h5>Website cùng tập đoàn</h5>
                    <Link to='https://codegym.vn/'><img src='./logoCT.png' /></Link>
                </div>
            </div>
        </>
    )
}
export default FooterComponent;
