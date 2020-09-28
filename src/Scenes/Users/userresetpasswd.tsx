import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import { RouteComponentProps } from 'react-router-dom';

type ListingState = {
  search: any,
  password: string,
  password_again: string,
  number_of_floors: string,
  number_of_carparking: string,
  number_blocks: string,
  county_id: string,
  constituency_id: string,
  landLord_id: string,
  ward_id: string,
  statusMessage: string,
  generator: string,
  lift: string,
  Name: string,
  counties: any[],
  constituency: any[],
  wards: any[],
  landlord: any[],
  alert_color: string,
  selectedBolean: string,
  selectedBolean1: string,
  isLoading: boolean,
  isShowError: boolean,
};
// RouteComponentProps<{ action: string }>, {}

class PasswordReset extends React.Component<RouteComponentProps<{ token: string }>, ListingState> {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      password: '',
      password_again: '',
      number_of_floors: '',
      statusMessage: '',
      number_of_carparking: '',
      search: '',
      alert_color: "",
      number_blocks: '',
      county_id: '',
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      generator: '',
      lift: '',
      isLoading: false,
      Name: '',
      counties: [],
      constituency: [],
      wards: [],
      landlord: [],
      selectedBolean: "",
      selectedBolean1: "",
      isShowError: false,
    };
  }
  async componentDidMount() {

    const token = 'Bearer ' + TOKEN
    const [
      countiesResponse, constituencyResponse, wardsResponse, landlordResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "apartments", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'users?role_id=5', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'wards', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'users?role_id=4', { headers: { "Authorization": token } }),

      ]);

    this.setState({
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
      wards: wardsResponse.data,
      landlord: landlordResponse.data,
    },

      function () {
        console.log("bayo", constituencyResponse.data)
      }
    );

  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.password != this.state.password_again) {
      this.setState({ statusMessage: "Password dont match. try again", isShowError: true, alert_color: "alert alert-danger", isLoading: false });

    } else {
      let formData = {
        "password": this.state.password,
        // 'school_logo': "logo.png"
      }
      console.log("DATA", JSON.stringify(formData))
      this.setState({ isLoading: true });
      const token = 'Bearer ' + this.props.match.params.token
      axios.post(baseURL + 'change-password', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      })
        .then((response) => {
          if (response.data.status) {
            this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-success", isShowError: true, isLoading: false });
            window.setTimeout(function () {
              window.location.href = '/';
            }, 2000);
          } else {
            this.setState({ statusMessage: response.data.status_message, isShowError: true, alert_color: "alert alert-danger", isLoading: false });
          }
        })
        .catch((error) => {
          console.log('bayoo', error.response)
          this.setState({ statusMessage: error.response.data.status_message, isShowError: true, alert_color: "alert alert-danger", isLoading: false });
        })
    }
  }

  handleChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleChangeBlocl = (e) => {
    this.setState({ password_again: e.target.value });
  }

  render() {
    return (
      <div className="newPropertyForm">
        {this.state.isShowError ? <div className={this.state.alert_color}
          style={{ fontSize: '15px' }}>
          {this.state.statusMessage}</div> : null}
        <form onSubmit={this.onSubmit}>
          <h4>Set your password here</h4>
          <div className="row form-group">
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Password</h4>
              <input type="password" required name="password" onChange={this.handleChange} id="" className="form-control" />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Password Again</h4>
              <input type="password" required name="password_again" id="" onChange={this.handleChangeBlocl} className="form-control" />
            </div>

          </div>
          <br />

          <div className="row form-group rowBtn">
            <button id="input" type="submit" className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'">
              {this.state.isLoading ? "Please Wait..." : "Submit"}  <i className="fa fa-refresh"></i>
            </button> &nbsp;&nbsp;&nbsp;

          </div>
        </form>
      </div>
    );
  }
}

export default PasswordReset