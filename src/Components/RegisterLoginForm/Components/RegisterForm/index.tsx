import * as React from 'react';
//import Pdf from "../../../../../public/bayo.pdf";

import './style.css';


//import Pdf from './';

// import { Icon } from 'react-fa';
import { register, RegisterData, active, ActiveData } from 'Services/Api/User';

interface RegisterFormProps {
  active: boolean;
  openLoginForm: () => void;
}

interface RegisterFormState {
  name: string;
  lastName: string;
  first_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  national_id: string;
  kra: string;
  houses: string;
  mssdn: string;
  profession: string;
  blocks: string;
  location: string;
  verifyCode: string;
  date_registration: string;
  isActiveForm: boolean;
  isLoading: boolean;
  selectedPerson: string;
  house_number: string;
  apartment_name: string;
  number_house: string;
  showReply: boolean;
  showCare: boolean;
  hideForm: boolean
  showTen: boolean
  event: any;
  person: { name: string }[];
}

class RegisterForm extends React.Component<RegisterFormProps, RegisterFormState> {
  selectedPerson: any;
  perso = [
    "LandLord",
    "CareTaker",
    "Tenant"

  ];
  constructor() {
    super();
    this.state = {
      verifyCode: '',
      name: '',
      lastName: '',
      showTen: true,
      showCare: true,
      email: '',
      hideForm: false,
      event: '',
      showReply: false,
      apartment_name: '',
      profession: '',
      first_name: '',
      national_id: '',
      kra: '',
      houses: '',
      house_number: '',
      number_house: '',
      date_registration: '',
      blocks: '',
      location: '',
      mssdn: '',
      password: '',
      confirmPassword: '',
      username: '',
      isActiveForm: false,
      isLoading: false,
      selectedPerson: "",
      person: [
        {
          name: "LandLord"
        },
        {
          name: "CareTaker"
        },
        {
          name: "Tenant"
        }
      ]
    };
  }
  submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerData: RegisterData = {
      name: {
        familyName: this.state.lastName,
        givenName: this.state.name
      },
      userName: this.state.username,
      password: this.state.password,
      address: [{
        number: '15/48',
        street: 'Đoàn Như Hài',
        district: '4',
        country: 'Viet Nam',
        countryCode: '+84'
      }],
      emails: [{
        value: this.state.email,
        active: true
      }],
      groups: [{
        id: 12344556,
        name: 'test'
      }]
    };


    register(registerData).then((reponseData) => {
      this.setState({
        isActiveForm: true
      });
    });
  }
  submitActive = () => {
    const activeData: ActiveData = {
      email: this.state.email,
      verifycode: this.state.verifyCode
    };
    active(activeData).then((resolveData) => {
      if (resolveData) {
        // todo
      }
    });
  }
  changeFormData = (key: string, value: string) => {
    let changeObject = {};
    changeObject[key] = value;
    this.setState(changeObject);
  }


  handleChangePerson = (event: { target: { value: any; }; }) => {

    this.setState({ selectedPerson: event.target.value });
    //  }
    if (event.target.value == 'LandLord') {
      this.setState({
        showReply: false,
        showCare: true,
        hideForm: true,
        showTen: true


      });
    }  else if (event.target.value == 'Tenant') {
      this.setState({
        showReply: true,
        showCare: true,
        hideForm: true,
        showTen: false


      });
    }
    else if (event.target.value == 'CareTaker') {
      this.setState({
        showReply: false,
        showCare: true,
        hideForm: true,
        showTen: false


      });
    }else{
      this.setState({
        showReply: false,
        showCare: false,
        hideForm: false,
        showTen: false


      });
    }

  };




  registerForm() {

    // const { showReply } = this.state


    return (
      <form role="form" onSubmit={this.submitRegister}>


        <div className="form-group " >

          <select
            value={this.state.selectedPerson}
            className="form-control dropdown-toggle"
            onChange={this.handleChangePerson}

            id="person" >
            {<option>Who are you</option>}

            {this.state.person &&
              this.state.person.length > 0 &&
              this.state.person.map((personItem, i) => (
                <option key={i} value={personItem.name}>
                  {personItem.name}
                </option>
              ))}
          </select>
        </div>

        {this.state.hideForm ?
         <div>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            className="form-control"
            value={this.state.name}
            onChange={(e) => { this.changeFormData('name', e.currentTarget.value); }}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            className="form-control"
            value={this.state.lastName}
            onChange={(e) => { this.changeFormData('lastName', e.currentTarget.value); }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Upload">Upload your passport photo</label><br />
          <input type="file"
            className="form-group"
            name="Upload" required
            onChange={this.changeFormData.bind(this)} />
        </div>

        <div className="form-group">
          <input type="text"
            name="national_id"
            className="form-control"
            required
            placeholder="National ID/Passport No"
            value={this.state.national_id}
            onChange={(e) => { this.changeFormData('national_id', e.currentTarget.value); }} />
        </div>
        <div className="form-group">
          <input type="text" name="kra"
            required
            placeholder="KRA PIN"
            className="form-control"
            value={this.state.kra}
            onChange={(e) => { this.changeFormData('kra', e.currentTarget.value); }} />
        </div>
        {this.state.showCare ?


          <div>

            {this.state.showTen ?


              <div>
                <div className="form-group">

                  <input type="text"
                    name="houses"
                    className="form-control"
                    placeholder="Name of the Apartment/Houses"
                    required value={this.state.houses}
                    onChange={(e) => { this.changeFormData('houses', e.currentTarget.value); }} />
                </div>

                <div className="form-group">
                  <input type="number"
                    name="blocks"
                    className="form-control"
                    placeholder="Number of Blocks"
                    required
                    value={this.state.blocks}
                    onChange={(e) => { this.changeFormData('blocks', e.currentTarget.value); }} />
                </div>

                <div className="form-group">

                  <input type="text"
                    name="location"
                    placeholder="Location of the Block"
                    className="form-control"
                    required
                    value={this.state.location}
                    onChange={(e) => { this.changeFormData('location', e.currentTarget.value); }} />

                </div>
              </div>
              : null
            }
            {this.state.showReply ?


              <div>


                <div className="form-group">
                  <input type="text" name="profession"
                    className="form-control"
                    required
                    placeholder="Profession"
                    value={this.state.profession}
                    onChange={(e) => { this.changeFormData('profession', e.currentTarget.value); }} />
                </div>

                <div className="form-group">
                  <input type="number"
                    name="number_house"
                    placeholder="Number of Resident in that house"
                    className="form-control"
                    required value={this.state.number_house}
                    onChange={(e) => { this.changeFormData('number_house', e.currentTarget.value); }} />
                </div>

                <div className="form-group">
                  <input type="number" name="blocks"
                    placeholder="Apartment Name"
                    className="form-control"
                    required value={this.state.apartment_name}
                    onChange={(e) => { this.changeFormData('apartment_name', e.currentTarget.value); }} />
                </div>
                <div className="form-group">
                  <input type="number"
                    name="house_number"
                    placeholder="House Number<"
                    className="form-control"
                    required
                    value={this.state.house_number}
                    onChange={(e) => { this.changeFormData('house_number', e.currentTarget.value); }} />
                </div>

                <div className="form-group">
                  <label>Date of Registeration</label>
                  <input type="date"
                    name="date_registration"
                    placeholder="Date of Registeration"
                    className="form-control"
                    required
                    value={this.state.date_registration}
                    onChange={(e) => { this.changeFormData('date_registration', e.currentTarget.value); }} />
                </div>
              </div>
              : null
            }

          </div>
          : null
        }
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            className="form-control"
            value={this.state.email}
            onChange={(e) => { this.changeFormData('email', e.currentTarget.value); }}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Phone"
            className="form-control"
            value={this.state.mssdn}
            onChange={(e) => { this.changeFormData('mssdn', e.currentTarget.value); }}
          />
        </div>
        {this.state.showReply ?
          <div className="form-group">
            <label htmlFor="Upload">
              Agreement Form{" "}
              <a href="" >
                Download Pdf
                    </a>x
                  </label>
            <br />
            <input type="file" name="agreement" required onChange={this.changeFormData.bind(this)} />
          </div>
          : null
        }
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={this.state.password}
            onChange={(e) => { this.changeFormData('password', e.currentTarget.value); }}
          />
        </div>
        <div className="form-group">


          <input
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            value={this.state.confirmPassword}
            onChange={(e) => { this.changeFormData('confirmPassword', e.currentTarget.value); }}
          />
        </div>
        <div className="form-group">
          <div className="btn-group-justified">
            <button type="submit" className="btn btn-lg btn-green isThemeBtn">Register</button>
          </div>
        </div>
        </div>
        : null
        }
        <p className="help-block">
          <span>Already a Reales member? </span>
          <a
            href="#"
            className="modal-su text-green isThemeText text-red"
            onClick={this.props.openLoginForm}
          >
            Sign In
          </a>
        </p>

      </form>
    );
  }
  activeForm() {
    return (
      <form role="form" onSubmit={this.submitActive}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Verify Code"
            className="form-control"
            value={this.state.verifyCode}
            onChange={(e) => { this.changeFormData('verifyCode', e.currentTarget.value); }}
          />
        </div>
        <div className="form-group">
          <div className="btn-group-justified">
            <button type="submit" className="btn btn-lg btn-green isThemeBtn">Verify</button>
          </div>
        </div>
      </form>
    );
  }
  render() {
    return (
      <div
        className={'registerForm slimScroll modal fade' + (this.props.active ? ' in' : '')}
      >
        <div className="modal-dialog modal-sm text-center" >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {this.state.isActiveForm ? 'Verify your account' : 'Registration Form'}
              </h4>
            </div>
            <div className="modal-body">
              {this.state.isActiveForm ? this.activeForm() : this.registerForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;