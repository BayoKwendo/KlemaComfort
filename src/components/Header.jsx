import React from 'react';
import styled from 'styled-components';
import Homeimg from '../assets/home.jpeg';
import Navbar from './Navbar';

const Headerstyle = styled.header`
  background: url(${Homeimg})no-repeat center center/cover;
  height:801px;

  .header_container {
    width: 300px;
    margin: 0px auto;
    color: white;
    background-color: rgba(3,18,73,0.7);
    border-radius: 0.4em;
    padding: 30px;
    position: relative;
    top: 55px;
    text-align:center;
    animation: intro .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    @media (min-width:375px){
      width: 90%;
      top: i95px !important;
    }
    @media (min-width:425px){
      top:100px;
      width:90%;
    }

    @media (min-width:768px){
      width: 709px;
      top: 185px;
      background-color: rgba(3,18,73,0.5)
    }

    form{
      margin-top:20px;
      @media (min-width:100){
        display:grid;
        grid-template-columns:1fr 1fr;
        align-items: center;
        justify-items: center;

      }
    }
  

    h1 {
      font-size: 26px;
    }

    h3 {
      font-size: 15px;
     }

    .buttons button{
      background-color: #c1bcbc;
      display: inline;
      padding: 2px;
      border: 0;
      height: 34px;
      padding: 10px;
    } 

    .buttons button:hover{
      background-color:rgba(3, 18, 73, 1);
      color:white;
      transition:.5s;
    }

    input{
      border-radius: 0.4em;
      width: 239px;
      height: 30px;
      border: 0;
      margin-top: 20px;
      margin-bottom: 20px;
      padding:10px;

      @media (min-width:768px){
        width: 315px;
      }
    
    }
    select{
      border-radius: 0.4em;
      width: 239px;
      height: 30px;
      border: 0;
      margin-top: 20px;
      margin-bottom: 20px;

      @media (min-width:768px){
        width: 315px;
      }
    }
    .propt_btn{
      height: 45px;
      width: 192px;
      border: 0;
      border-radius: 0.5em;
      font-size: larger;
      padding: -23px; 
      background-color: #031249;
      color: #b7c2f1;
      }
  }


  @keyframes intro{
    0%{
      transform: scale(0.2) translateY(-50px);
      opacity: 0;
    }
  }
}
`;


const Header =()=>(
  <div>
  <Navbar />
  <Headerstyle>
    <div className="header_container">
      <h1>We manage your Transition, not just the Transaction</h1>
      <h3>buy or sell a home and manage the moving process all in one place</h3>
     
      <form >
         
          <div className="bedrooms">
            <select name="bedroom" className="app-select" required>
              <option data-display="Bedrooms">Who are you?</option>
              <option value="1">LandLord</option>
              <option value="2">CareTaker</option>
              <option value="3">Tenant</option>
             </select>
          </div>
        
          	
      </form>
    </div>
  </Headerstyle>
  </div>
)

export default Header;
