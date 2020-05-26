import React, { Component,Fragment } from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';
import Footer from '../Footer';
import back from '../../assets/home.jpg'

import Pdf from '../../assets/bayo.pdf';



const Form = styled.form`
  width:100%;
  height:100hv;
  background-color: rgba(183, 194, 241, .8);
  margin:0px auto;
  border-radius: 1em;
  h4{
    text-align:center;
    padding 10px;
  }
  .sign{
    margin:20px 0;
    label,input{
      display:block;
      margin: 0px auto;
      width: 80%;
    }
    input{
      height:40px;
    }
  }
  .btn {
    text-align: center;
    padding: 20px;
  }
  .btn input{
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 0.5em;
    font-size: larger;
    padding: -23px; 
    background-color: #031249;
    color: #b7c2f1;
  }
  .login{
    text-align:center;
    margin:20px;
    color: #293064;
    cursor: pointer;
  }
`;

const Show = styled.div`
  .dontshow{
    display:none;
  }
`;
const LogForm = styled.form`
  background-color: rgba(3, 18, 73, .8);
  color: #b7c2f1;
  width: 90%;
  margin: 0px auto;
  border-radius: 1em;
  display: block;
  height: 50%;
  animation: jackInTheBox 1000ms both;
  h4 {
    text-align: center;
    padding: 20px;
  }
  h5 {
    text-align: center;
    color: red;
  }
  label,
  input {
    display: block;
    width: 80%;
    margin: 0px auto;
  }
  input {
    height: 40px;
    margin-bottom: 20px;
  }

  .logbtn {
    margin: 20px 0;
  }

  .logbtn input {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 0.5em;
    font-size: larger;
    padding: -23px;
    background-color: #b7c2f1;
    color: #032149;
  }
  @keyframes jackInTheBox {
    from {
      opacity: 0;
      transform: scale(0.1) rotate(30deg);
      transform-origin: center bottom;
    }

    50% {
      transform: rotate(-10deg);
    }

    70% {
      transform: rotate(3deg);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const FormGrid = styled.div`
  background: url(${back})no-repeat center center/cover;
  background-size:cover;
  @media(min-width:768px){
    .left{
      width:50%;
      margin:0px auto;
      max-height: 100%;

    }
    .right{
      width:420px;
      margin:0px auto;
    }
  }
`;

export default class TenantRegestration extends Component {
  constructor() {
    super();
    this.state = {
      condition: false,
      first_name: '',
      last_name: '',
      national_id: '',
      kra: '',
      icon: [{}],
      houses: '',
      blocks: '',
      location: '',
      mssdn: '',
      email:'',
      password: '',
      error: '',
      files: [],

    }
    this.handleChange = this.handleChange.bind(this)

  }
  onPreviewDrop = (files) => {
    this.setState({
      files: this.state.files.concat(files),
     });
  }

  inputIcon(event) {
    this.setState({
      icon: event.target.value,
    })
  }
  handleClick(){
    this.setState({
      condition:!this.state.condition
    })
  }
  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
  
    if (!this.state.first_name) {
      return this.setState({ error: '*Name is required' });
    }
    if (!this.state.last_name) {
      return this.setState({ error: '*Username is required' });
    }
    if (!this.state.national_id) {
      return this.setState({ error: '*National ID/Passport is required' });
    }
    if (!this.state.kra) {
      return this.setState({ error: '*KRA is required' });
    }
    if (!this.state.houses) {
      return this.setState({ error: '*Name of houses is required' });
    }
    if (!this.state.blocks) {
      return this.setState({ error: '*No. of blocks is required' });
    }

    if (!this.state.location) {
      return this.setState({ error: '*Location is required' });
    }
    if (!this.state.mssdn) {
      return this.setState({ error: '*MSSDN is required' });
    }
    if (!this.state.email) {
      return this.setState({ error: '*Email is required' });
    }
  
    if (!this.state.password) {
      return this.setState({ error: '*Password is required' });
    }
    if (this.state.re_password !== this.state.password ) {
      return this.setState({ error: '*Password Do not Match' });
    }
    return this.setState({ error: '' });
  }
  

  handleChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value });
  
}

  render() {
    
    return <Fragment>
        <Navbar />
      <FormGrid>
      <br/>

      <div className="right">
        <Show>
          <div className={this.state.condition ? "show" : "dontshow"}>
            <LogForm onSubmit={this.handleSubmit}>
              <h4>Log In</h4>
              {this.state.error && <h5 onClick={this.dismissError}>
                {this.state.error}
              </h5>}
              <label>Email</label>
              <input type="text" value={this.state.email} onChange={this.handleChange} />

              <label>Password</label>
              <input type="password" value={this.state.password} onChange={this.handleChange} />
              <div className="logbtn">
                <input type="submit" value="Log In" />
              </div><br/><br/>
            </LogForm>
          </div>
        </Show>
      </div>
      
      <div className="left">
        <Form onSubmit={this.handleSubmit}>
          <h4>Tenant Registration</h4>
        
          <div className="login">
            <a onClick={this.handleClick.bind(this)}>
              Or you already registered? click here
            </a>
          </div>
          {this.state.error && <h5 onClick={this.dismissError}>
            {this.state.error}
          </h5>}
          <div className="row">
          <div>
          </div>
         
      
          <div className="sign col-md-6">
            <label htmlFor="FirstName">First Name</label>
            <input type="text" name="first_name" required value={this.state.first_name} onChange={this.handleChange} />
          </div>
          <div className="sign col-md-6">
            <label htmlFor="LastName">Last Name</label>
            <input type="text" name="last_name" required value={this.state.last_name} onChange={this.handleChange} />
          </div>
          <div className="sign">
                 <label htmlFor="Upload">Upload your passport photo</label><br/>
                  <input type="file" name="Upload" required onChange={this.inputIcon.bind(this)}  />
          </div>
          <div className="sign col-md-6">
            <label htmlFor="NationalID">National ID/Passport No.</label>
            <input type="text" name="national_id" required value={this.state.national_id} onChange={this.handleChange} />
          </div>

         <div className="sign">
                 <label htmlFor="Upload">Agreement Form   <a href = {Pdf} target = "_blank">Download Pdf</a>x</label><br/>
                <input type="file" name="agreement" required onChange={this.inputIcon.bind(this)}  />
          </div>

          <div className="sign col-md-6">
            <label htmlFor="kra">KRA PIN</label>
            <input type="text" name="kra" required value={this.state.kra} onChange={this.handleChange} />
          </div>

          <div className="sign col-md-6">
            <label htmlFor="profession">Profession</label>
            <input type="text" name="profession" required value={this.state.houses} onChange={this.handleChange} />
          </div>

          <div className="sign col-md-6">
            <label htmlFor="blocks">Number of Resident in that house</label>
            <input type="number" name="blocks" required value={this.state.blocks} onChange={this.handleChange} />
          </div>

          <div className="sign col-md-6">
            <label htmlFor="blocks">Apartment Name</label>
            <input type="number" name="blocks" required value={this.state.blocks} onChange={this.handleChange} />
          </div>
          <div className="sign col-md-6">
            <label htmlFor="blocks">House Number</label>
            <input type="number" name="blocks" required value={this.state.blocks} onChange={this.handleChange} />
          </div>

          <div className="sign col-md-6">
            <label htmlFor="location">Date of Registeration</label>
            <input type="date" name="location" required value={this.state.location} onChange={this.handleChange} />
          </div>

          <div className="sign col-md-6">
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" required value={this.state.email} onChange={this.handleChange} />
          </div>

          <div className="sign col-md-6">
            <label htmlFor="mssdn">Phone Number</label>
            <input type="number" name="mssdn" required value={this.state.mssdn} onChange={this.handleChange} />
          </div>

          <div className="sign col-md-6">
            <label htmlFor="Password">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          </div>
          <div className="sign col-md-6">
            <label htmlFor="Password">Retype-Password</label>
            <input type="password" name="re_password" value={this.state.re_password} onChange={this.handleChange} />
          </div>
          <div className="btn col-md-6">
            <input type="submit" value="Register" />
          </div>
          </div>
         
        </Form>
      </div>
      <br/>

      </FormGrid>

        <Footer />
      </Fragment>;
  }
}
