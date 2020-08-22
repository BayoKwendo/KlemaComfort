import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import Select from 'react-select';
import { TOKEN } from 'Helpers/token';
import "./csv.css";

type ListingState = {

  search: any,
  apartment_name: string,
  apartment_type: string,
  showComponent: boolean,
  hideComponent: boolean,
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
  boolean: any[],
  houses: any[],
  alert_color: string,
  selectedBolean: string,
  selectedBolean1: string,
  isLoading: boolean,
  billing: any[],
  isShowError: boolean,
  hide1Component: boolean,
  csvfile: string

};


class AddBilling extends React.Component<{}, ListingState> {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      apartment_name: '',
      apartment_type: '',
      number_of_floors: '',
      statusMessage: '',
      number_of_carparking: '',
      search: '',
      number_blocks: '',
      county_id: '',
      showComponent: true,
      hideComponent: false,
      hide1Component: false,
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      billing: [],
      generator: '',
      alert_color: '',
      csvfile: '',
      lift: '',
      isLoading: false,
      Name: '',
      counties: [],
      houses: [],
      constituency: [],
      wards: [],
      landlord: [],
      selectedBolean: "",
      selectedBolean1: "",
      isShowError: false,
      boolean: [
        {
          name: 'ONCE'
        },
        {
          name: 'MONTHLY'
        }],
    };


  }
  async componentDidMount() {
    const token = 'Bearer ' + TOKEN
    const [
      countiesResponse, constituencyResponse, billingResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "apartments", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'houses', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'bill-types', { headers: { "Authorization": token } }),

      ]);

    this.setState({
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
      billing: billingResponse.data,

    },

      function () {
        console.log("bayo", countiesResponse.data)
      }
    );

  }



  County() {
    return (this.state.counties && this.state.counties.length > 0 &&
      this.state.counties.map((countyItem, i) =>
        ({ label: countyItem.apartment_name, value: countyItem.id })))
  }

  onSelectChange = (value: { value: { toString: () => any; }; }) => {
    this.setState({
      county_id: value.value.toString()
    },
      function () {
        fetch(baseURL + 'houses?apartment_id=' + value.value.toString(), { headers: { "Authorization": `Bearer ` + TOKEN } })
          .then(response => response.json())
          .then(
            res => {
              this.setState({ houses: res },
                console.log("bayd", res)
              )
            }
          )
      });


  };

  Constituency() {

    return (this.state.houses && (this.state.houses.length > 0 || this.state.houses.length == 0) &&
      this.state.houses.map((countyItem, i) =>
        ({ label: countyItem.house_number, value: countyItem.id })))

  }

  onSelectChangeConstitueny = value => {
    this.setState({ constituency_id: value.value.toString() });
  };

  Landload() {
    return (this.state.billing && (this.state.billing.length == 0 || this.state.billing.length > 0) &&
      this.state.billing.map((countyItem, i) =>
        ({ label: countyItem.bill_name, value: countyItem.id })))
  }
  onSelectChangeLandLord = value => {
    this.setState({ landLord_id: value.value.toString() });
  };

  handleChangeBlocl = (e) => {
    this.setState({ number_blocks: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let formData = {

      "apartment_id": this.state.county_id,
      "house_id": this.state.constituency_id,
      "customer_id": "0",
      "bill_type_id": this.state.landLord_id,
      "amount": this.state.number_blocks,
      "billing_frequency": this.state.selectedBolean1,
      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    this.setState({ isLoading: true });

    const token = 'Bearer ' + TOKEN

    axios.post(baseURL + 'billings', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    })
      .then((response) => {

        if (response.data.status) {
          this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-success", isShowError: true, isLoading: false });
          window.setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {
          this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-danger", isShowError: true, isLoading: false });
        }
      })
      .catch((error) => {
        console.log('bayoo', error.response)
        this.setState({ statusMessage: error.response.data.status_message, alert_color: "alert alert-danger", isShowError: true, isLoading: false });
      })
  }

  handleChangeBolean1 = (event) => {
    this.setState({ selectedBolean1: event.target.value },);

  };


  render() {
   
    return (
      <div className="newPropertyForm">
        {this.state.isShowError ? <div className={this.state.alert_color}
          style={{ fontSize: '15px' }}>
          {this.state.statusMessage}</div> : null}
        <form onSubmit={this.onSubmit}>
          <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
            <h4>Apartment</h4>
            <Select
              options={this.County()}
              onChange={this.onSelectChange}
              placeholder="Select Apartment"
              tabSelectsValue={false}
              className='drop'
            />
            <br />
          </div>
          <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
            <h4>House</h4>

            <Select
              options={this.Constituency()}
              onChange={this.onSelectChangeConstitueny}
              placeholder="Select House"
              tabSelectsValue={false}
              className='drop'
            />
            <br />
          </div>

          <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
            <h4>Billing Type</h4>

            <Select
              options={this.Landload()}
              onChange={this.onSelectChangeLandLord}
              placeholder="Select Billing Type"
              tabSelectsValue={false}
              className='drop'
            />
            <br />
          </div>
          <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
            <h4>Amount (ksh)</h4>
            <input type="number" required name="number_blocks" id="" onChange={this.handleChangeBlocl} className="form-control" />
            <br/>
          </div>


          <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
            <h4>Billing Frequency</h4>
            <select
              name="lift"
              className="form-control"
              value={this.state.selectedBolean1}
              onChange={this.handleChangeBolean1}
              id="gender">
              {<option>Billing Frequency</option>}
              {
                this.state.boolean && this.state.boolean.length > 0
                && this.state.boolean.map((genderItem, i) =>
                  <option key={i} value={genderItem.name}>{genderItem.name}</option>)
              }
            </select><br /><br/>
          </div>


          <div className="text-center title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
            <button id="input" type="submit"  className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'" style={{ fontFamily: 'Fira Sans', backgroundColor: '#0070BA' }}>
              {this.state.isLoading ? "Please Wait..." : "Submit!"}  <i className="fa fa-refresh"></i>
            </button>
          </div>

          <br />

        </form>
      </div>
    );
  }
}

export default AddBilling;