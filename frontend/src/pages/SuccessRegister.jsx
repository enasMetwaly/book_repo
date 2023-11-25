import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import bgImg from '../assets/success.jpeg'; // Import the image
import { NavLink } from 'react-router-dom';


const SuccessRegister = () => {
  const divStyle = {
    backgroundImage: `url(${bgImg})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div className="m-0">
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center ">
              <h1 class="heading-section">Success Registeration  </h1>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4">
              <div class="login-wrap ">
                <div class="img "
                  style={divStyle}
                ></div>
                <img src={bgImg} style={{
                  width: '250px', height: '250px', margin: 'auto'
                }} />

                <h3 class="text-center mb-0">congratulation</h3>
                <p class="mb-0">Thanks for registration with us!</p>

                <hr />
                <div class="w-100 text-center mt-4 text">
                  <p class="text-center">just one step remain check your email</p>
                  <p>
                    Read More
                    if you have any questions, please email us at customer.success@unlayer.com or visit our FAQS, you can also chat with a reel live human during our operating hours. They can answer questions about your account</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default SuccessRegister

// <NavLink
// to="/"
// className="btn form-control btn-primary rounded submit px-3 text-light"
// style={{ background: '#1f1f38', width: '200px', textDecoration: 'none' }}
// >
// Home
// </NavLink>