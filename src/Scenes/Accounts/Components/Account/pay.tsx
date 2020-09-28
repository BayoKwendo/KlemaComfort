import * as React from 'react';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { ID, TOKEN } from 'Helpers/token';


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
  alert_color: string,

  generator: string,
  lift: string,
  houses: any[],
  Name: string,
  counties: any[],
  constituency: any[],
  wards: any[],
  complian: any[],
  landlord: any[],
  boolean: any[],
  selectedBolean: string,
  selectedBolean1: string,
  isLoading: boolean,
  isShowError: boolean,
  hide1Component: boolean,
  csvfile: string,
  data:any[]

};


class Payment extends React.Component<{}, ListingState> {
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
      alert_color: "",
      showComponent: true,
      hideComponent: false,
      hide1Component: false,
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      generator: '',
      csvfile: '',
      lift: '',
      houses: [],
      isLoading: false,
      Name: '',
      complian: [],
      counties: [],
      data:[],
      constituency: [],
      wards: [],
      landlord: [],
      selectedBolean: "",
      selectedBolean1: "",
      isShowError: false,
      boolean: [
        {
          name: 'House'
        },
        {
          name: 'Apartment'
        }],
    };


  }
  async componentDidMount() {
    const token = 'Bearer ' + TOKEN
    const [
      countiesResponse, constituencyResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "tenants", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'users?LIMIT=1000', { headers: { "Authorization": token } }),


      ]);

    this.setState({
      complian: countiesResponse.data,
      houses: constituencyResponse.data,
    },

      function () {
        console.log("bayo", countiesResponse.data)
      }
    );


    var data = [];
    for (let i = 0; i < this.state.complian.length; i++) {
      //alert(this.state.users[i].id);
      for (let j = 0; j < this.state.houses.length; j++) {
        var house_id = this.state.complian[i].user_id;
        //   var user_id = this.state.complian[i].user_id;
        console.log("EVANS", this.state.houses[j].id);

        // var house_id = this.state.houses[j].id;
        if (house_id == this.state.houses[j].id) {

             data.push(Object.assign(this.state.complian[i], this.state.houses[j]))
          this.setState({
            data: data
          })
          console.log("bayd", this.state.data)

        }
      }
    }

  }

  County() {
    return (this.state.data && (this.state.data.length == 0 || this.state.data.length) > 0 &&
      this.state.data.map((countyItem, i) =>
        ({ label: countyItem.first_name +" "+countyItem.last_name, value: countyItem.id })))
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
    return (this.state.houses && (this.state.houses.length == 0 || this.state.houses.length > 0) &&
      this.state.houses.map((countyItem, i) =>
        ({ label: countyItem.house_number, value: countyItem.id })))
  }
  onSelectChangeConstitueny = value => {
    this.setState({ constituency_id: value.value.toString() });
  };


  onSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    // data.append("image", this.state.csvfile);

    let formData = {

      "msisdn": this.state.number_of_floors,
      "amount": this.state.number_of_carparking,
      "customer_type": "tenant",
      "customer_id": ID,

      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    // console.log("DATA", data);

    axios.post(baseURL + 'mpesapayments', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
    }).then((response) => {

      if (response.data.status) {
        this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-success", isLoading: false, isShowError: true });
        console.log("bayo", response.data)
      } else {
        this.setState({ statusMessage: response.data.status_message, isLoading: false, alert_color: "alert alert-danger", isShowError: true });
      }

    }).catch((error) => {
      console.log('bayoo', error.response)
      this.setState({ statusMessage: error.response.data.statusMessage, isLoading: false, alert_color: "alert alert-danger", isShowError: true });
    })

  }

  handleChangeBolean1 = (event) => {
    this.setState({ selectedBolean1: event.target.value },);

  };




  handleChangefloor = (e) => {
    this.setState({ number_of_floors: e.target.value });
  }
  handleChangePark = (e) => {
    this.setState({ number_of_carparking: e.target.value });
  }
  handleChangeBlocl = (e) => {
    this.setState({ number_blocks: e.target.value });
  }

  render() {

    return (
      <div className="newPropertyForm">
        {this.state.isShowError ? <div className={this.state.alert_color}
          style={{ fontSize: '15px' }}>
          {this.state.statusMessage}</div> : null}
        <form onSubmit={this.onSubmit}>
          <>
          <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              {/* <h4>Tenants</h4>
              <Select
                options={this.County()}
                onChange={this.onSelectChange}
                placeholder="Select Tenant"
                tabSelectsValue={false}
                className='drop'
              /> */}
              <br />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Phone Number</h4>
              <input type="number" required name="title" onChange={this.handleChangefloor} id="" className="form-control" />
            </div>
            
            <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Amount</h4>
              <input type="number" required name="slug" onChange={this.handleChangePark} id="" className="form-control" />
              <br/>
            </div>


         

            <div className=" text-center title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <button id="input" type="submit" className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'" style={{ fontFamily: 'Fira Sans', backgroundColor: '#0070BA' }}>
                {this.state.isLoading ? "Please Wait..." : "Pay"}  <i className="fa fa-refresh"></i>
              </button>
            </div>
          </>


          <br />

        </form>
      </div>
    );
  }
}

export default Payment;