import React from 'react'

const Footer = props => {
    return (
      <footer className="footer-area">
      {/* newsletter area */}
      <div className="newsletter-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="newsletter-text">
                <div className="icon"><i className="icon ion-email" /></div>
                <h3>Sign Up To Newsletter</h3>
                <h4>..and Receive $29 Coupon For First Shopping</h4>
              </div>
              <div className="newsletter">
                <div className="newsletter-box">
                  <form action="#">
                    <input className="subscribe" placeholder="your email address" name="email" id="subscribe" type="email" />
                    <button type="submit" className="submit">subscribe!</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* newsletter area end */}
      {/* footer main */}
      <div className="footer-main">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3 col-md-3 col-xs-12">
              <div className="footer-logo-area">
                <ul>
                  <li>
                    <h4>Contact info:</h4>
                    <p>169-C, Technohub, Dubai Silicon Oasis.</p>
                  </li>
                  <li>
                    <h4>Telephone:</h4>
                    <p>(+011) 123 777 8888 - (+011) 123 888 9999</p>
                  </li>
                  <li>
                    <h4>Email:</h4>
                    <p>Support@example.com</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 col-md-3 col-xs-12">
              <div className="footer-menu">
                <h3>Customer Service</h3>
                <ul>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Returns</a></li>
                  <li><a href="#">Order History</a></li>
                  <li><a href="#">Site Map</a></li>
                  <li><a href="#">Testimonials</a></li>
                  <li><a href="#">My Account</a></li>
                  <li><a href="#">Unsubscribe Notification</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 col-md-3 col-xs-12">
              <div className="footer-menu">
                <h3>Information</h3>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Delivery infomation</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms &amp; Conditions</a></li>
                  <li><a href="#">Warranty</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">Seller Login</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 col-md-3 col-xs-12">
              <div className="footer-menu">
                <h3>Extras</h3>
                <ul>
                  <li><a href="#">Brands</a></li>
                  <li><a href="#">Gift Vouchers</a></li>
                  <li><a href="#">Affiliates</a></li>
                  <li><a href="#">Wishlist</a></li>
                  <li><a href="#">Order History</a></li>
                  <li><a href="#">Track Your Order</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer main end */}
      {/* footer copyright area */}
      <div className="footer-copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-6 col-md-6">
              <p>Copyright © 2018 Bege . All Rights Reserved.</p>
            </div>
            <div className="col-sm-12 col-lg-6 col-md-6 pull-right">
              <img src="images/icons/payment-icon.png" alt="payment icon" />
            </div>
          </div>
        </div>
      </div>
      {/* footer copyright area end */}
    </footer>
    )
}

export default Footer
