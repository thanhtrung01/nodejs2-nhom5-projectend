import React from 'react';
import PropTypes from 'prop-types';
import './footer.scss';

function Footer(props) {
	return (
		<div className="footer">
			<div className="footer-item footer-client">
				<h4 className="footer-title">CHĂM SÓC KHÁCH HÀNG</h4>
				<ul className="footer-list-link">
					<li className="list-link-item">Trung Tâm Trợ Giúp</li>
					<li className="list-link-item">Shopee Blog</li>
					<li className="list-link-item">Shopee Mall</li>
					<li className="list-link-item">Hướng Dẫn Mua Hàng</li>
					<li className="list-link-item">Hướng Dẫn Bán Hàng</li>
					<li className="list-link-item">Thanh Toán</li>
					<li className="list-link-item">Shopee Xu</li>
					<li className="list-link-item">Vận Chuyển</li>
				</ul>
			</div>
			<div className="footer-item footer-about">
				<h4 className="footer-title">VỀ SHOPEE</h4>
				<ul className="footer-list-link">
					<li className="list-link-item">
						{' '}
						Giới Thiệu Về Shopee Việt Nam
					</li>
					<li className="list-link-item">Tuyển Dụng</li>
					<li className="list-link-item">Điều Khoản Shopee</li>
					<li className="list-link-item">Chính Sách Bảo Mật</li>
					<li className="list-link-item">Chính Hãng</li>
					<li className="list-link-item">Kênh Người Bán</li>
					<li className="list-link-item">Flash Sales</li>
				</ul>
			</div>
			<div className="footer-item footer-payment">
				<h4 className="footer-title">THEO DÕI CHÚNG TÔI TRÊN</h4>
				<ul className="footer-list-link">
					<li className="list-link-item">
						<i className="fa-brands fa-facebook"></i>
						<span className="item-text">Facebook</span>
					</li>
					<li className="list-link-item">
						<i className="fa-brands fa-instagram-square"></i>
						<span className="item-text">Instagram</span>
					</li>
					<li className="list-link-item">
						<i className="fa-brands fa-linkedin"></i>
						<span className="item-text">LinkedIn</span>
					</li>
				</ul>
			</div>
			<div className="footer-item footer-medium">
				<h4 className="footer-title">HỔ TRỢ KHÁCH HÀNG</h4>
				<ul className="footer-list-link">
					<li className="list-link-item"> Các câu hỏi thường gặp</li>
					<li className="list-link-item">Gửi yêu cầu hỗ trợ</li>
					<li className="list-link-item">Hướng dẫn đặt hàng</li>
					<li className="list-link-item">Phương thức vận chuyển</li>
					<li className="list-link-item">Chính sách đổi trả</li>
					<li className="list-link-item">Hướng dẫn trả góp</li>
					<li className="list-link-item">
						Chính sách hàng nhập khẩu
					</li>
				</ul>
			</div>
		</div>
	);
}

Footer.propTypes = {};

export default Footer;
