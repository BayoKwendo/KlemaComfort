import React, { Component } from 'react';
import styled from 'styled-components';
import Homeimg from '../assets/home.jpeg';
import { createBrowserHistory } from "history";

import { Form   } from "react-bootstrap";
import {  Redirect, Switch } from "react-router-dom";

import Navbar from './Navbar';
const hist = createBrowserHistory();


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


export default class CareTakerReg extends Component {


  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      selectedPerson: '',
      person: [{
        name: 'LandLord'
      }, {
        name: 'CareTaker'
      }, {
        name: 'Tenant'
      }],
    }
  }

  handleChangePerson = (event) => {
    this.setState({ selectedPerson: event.target.value });
};

onSubmit(e) {
  e.preventDefault();

   if (this.state.selectedPerson === "LandLord") {

    hist.push('/landlord')
    window.location.reload();


   } else if(this.state.selectedPerson == "CareTaker") {
    hist.push('/caretaker')
    window.location.reload();
   }
     else if(this.state.selectedPerson == "Tenant") {
      hist.push('/tenants')
      window.location.reload();
     
  }else{

  }
  }

  


  render() {
    return (
      <div>
        <Navbar />
        <Headerstyle>
          <div className="header_container">
            <h1>We manage your Transition, not just the Transaction</h1>
            <h3>buy or sell a home and manage the moving process all in one place</h3>
            <form  onSubmit={this.onSubmit}>
              <div className="">

                <Form.Group controlId="first-row" className="Focus-line">
                  <Form.Control
                    as="select"
                    className="form-control input-md"
                    placeholder="Who are you"
                    value={this.state.selectedPerson}
                    onChange={this.handleChangePerson}
                    id="person"
                    option={this.selectedPerson}>
                    {<option>Who are you</option>}

                    {
                      this.state.person && this.state.person.length >
                      0 && this.state.person.map((personItem, i) =>


                        <option key={i} value={personItem.name}>{personItem.name}</option>)

                    }
                  </Form.Control>
                </Form.Group>
                </div>

              <div className="button">
                <button className='propt_btn'>Continue</button>
              </div>
            </form>
          </div>
        </Headerstyle>
      </div>
    )
  }
}