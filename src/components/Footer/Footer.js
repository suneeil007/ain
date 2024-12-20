import React, { useContext } from 'react';
import { Typography } from "@mui/material";
import { SettingsContext } from '../../context/SettingsContext';

export default function Footer() {
  
  const { settings } = useContext(SettingsContext);

  // console.log('Settings', settings)

  return (
    <footer className="bg-light text-center text-lg-start text-muted">

      <section
        className="d-flex justify-content-center justify-content-lg-between"
        style={{
          position: "relative",
          backgroundImage: 'url("../footer_bg.jpg")', 
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          color: "#fff",
          height: "700px",
          paddingBottom: "50px",
        }}
      >
      
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>

          <Typography
                    variant="h2"
                    color="#f1f1f1"
                    sx={{
                      paddingTop: 9,
                      paddingBottom: 7,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    Get in touch with us
                  </Typography>

          <div className="row">
        
          <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-4 FooterINFO">
        <p style={{ fontSize: '3em', color: 'white', fontWeight: 'bold' }}>
          <i className="fa fa-map-marker me-4" aria-hidden="true"></i>
            {settings?.data?.[0]?.head_office}
        </p>
        
        <p style={{ fontSize: '1.5em', color: 'white' }}>
          <i className="fa fa-phone me-2"></i> {settings?.data?.[0]?.phone}
        </p>

        <p style={{ fontSize: '1.5em', color: 'white' }}>Lucky Gurung, Secretariat Manager</p>

        <p style={{ fontSize: '1.5em', color: 'white' }}>
          <i className="fa fa-envelope-open-o me-3"></i>
          lucky@ain.org.np
        </p>
        <p style={{ fontSize: '1.5em', color: 'white' }}>Reshma Shrestha, Programme Coordinator</p>

        <p style={{ fontSize: '1.5em', color: 'white' }}>
          <i className="fa fa-envelope-open-o me-3"></i>
          reshma@ain.org.np
        </p>

        <p style={{ fontSize: '1.5em', 
                    color: 'white',
                    marginTop: "10px", 
                    marginBottom: "10px",
                    fontWeight: 'bolder' }}>Follow us on</p>

         <p>
          <a href="https://www.facebook.com" style={{ textDecoration: "none" }}>
            <i
              className="fa fa-facebook me-3"
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "5px",
                color: "#3b5998", 
                fontSize: "1em", 
              }}
            ></i>
          </a>
          <a href="https://www.youtube.com" style={{ textDecoration: "none" }}>
            <i
              className="fa fa-youtube me-3"
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "5px",
                color: "#ff0000", 
                fontSize: "1em", 
              }}
            ></i>
          </a>
        </p>

      </div>


     
            <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-4">
            
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control footer_input" id="name" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control footer_input" id="email" placeholder="Your Email" />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" id="message" rows="6" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Content */}
      <section style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      }}>
        <div className="container text-center text-md-start  py-5">
          <div className="row">
          <div
              className="col-md-3 col-lg-3 col-xl-3 mb-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "150px",
              }}
            >
              <img
                src="https://ain.org.np/public/images/logo.png"
                style={{ width: "40%" }}
                alt="Logo"
              />
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 footerABT">
              <h6 className="text-uppercase fw-bold mb-4">About Us</h6>
            
                <a href="#!" className="text-reset">
                What is AIN? - Video
                </a>
             
                <a href="#!" className="text-reset">
                Message from Chairperson
                </a>
              
                <a href="#!" className="text-reset">
                Steering Committee

                </a>
             
                <a href="#!" className="text-reset">
                  Members INGOs
                </a>
             
                <a href="#!" className="text-reset">
                Ain toastmasters Club
                </a>
              
              
            </div>
            
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 footerABT">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
             
                <a href="#!" className="text-reset">
                  Our Stories
                </a>
              
                <a href="#!" className="text-reset">
                  News And Events
                </a>
             
                <a href="#!" className="text-reset">
                  Career
                </a>
                
                <a href="#!" className="text-reset">
                  Help
                </a>
              
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 footerABT">
              <h6 className="text-uppercase fw-bold mb-4">LIKE US ON FACEBOOK</h6>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fainnepal%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1608952235810011"
                  width="100%"
                  height="190"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Page Plugin"
                ></iframe>
              </div>            
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4"
           style={{ backgroundColor: 'rgb(27 27 29)', 
                    color:"rgb(143 149 156)",
                    fontSize: "13px" }}>
            Copyright © 2024 All Rights Reserved
      </div>
    </footer>
  );
}
