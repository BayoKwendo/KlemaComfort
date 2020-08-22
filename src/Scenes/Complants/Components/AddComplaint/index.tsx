import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import Select from 'react-select';
import { TOKEN, ID } from 'Helpers/token';

type ListingState = {

  search: any,
  apartment_name: string,
  apartment_type: string,
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
  houses: any[],
  caretaker: any[],
  constituency: any[],
  wards: any[],
  landlord: any[],
  boolean: any[],
  alert_color: string,
  selectedBolean: string,
  selectedBolean1: string,
  isLoading: boolean,
  isShowError: boolean,
  complian: any[],
  users: any[],
  data: any[]


};


class AddComplaint extends React.Component<{}, ListingState> {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      apartment_name: '',
      apartment_type: '',
      number_of_floors: '',
      statusMessage: '',
      houses: [0],
      number_of_carparking: '',
      search: '',
      caretaker: [0],
      alert_color: "",
      number_blocks: '',
      county_id: '',
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      data: [],
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
      complian: [],
      users: [],
      isShowError: false,
      boolean: [
        {
          name: 'YES'
        },
        {
          name: 'NO'
        }],
    };


  }
  async componentDidMount() {
    const token = 'Bearer ' +TOKEN
    const [
      countiesResponse, constituencyResponse, wardsResponse, landlordResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "apartments", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'houses?id=', { headers: { "Authorization": token } }),
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



  County() {
    return (this.state.counties && (this.state.counties.length > 0 || this.state.counties.length == 0) &&
      this.state.counties.map((countyItem, i) =>
        ({ label: countyItem.apartment_name, value: countyItem.id })))
  }

  onSelectChange = (value: { value: { toString: () => any; }; }) => {
    this.setState({ county_id: value.value.toString() },
      function () {
        fetch(baseURL + 'houses?apartment_id=' + value.value.toString(), { headers: { "Authorization": `Bearer ` + TOKEN } })
          .then(response => response.json())
          .then(
            res => {
              this.setState({ houses: res },
                console.log("bayssd", res)
              )
            }
          )
      });
  };

  Ward() {
    return (this.state.houses && (this.state.houses.length > 0 ||this.state.houses.length ==0) &&
      this.state.houses.map((countyItem, i) =>
        ({ label: countyItem.house_number, value: countyItem.id })))
  }


  onSelectChangeWard = value => {
    this.setState({ ward_id: value.value.toString() },
      function () {

        axios.all([
          axios.get(baseURL + 'tenants?house_id=' + value.value.toString(), { headers: { "Authorization": `Bearer ` + TOKEN } }),
          axios.get(baseURL + "users?id="+ID, { headers: { "Authorization": `Bearer ` + TOKEN } }),
        ]).then(axios.spread((complainResponse, usersResponse) => {
          this.setState(
            {
              complian: complainResponse.data,
              users: usersResponse.data,
              isLoading: false
            },
            function () {
              console.log("teachers", usersResponse.data);
              var data = [];
              for (let i = 0; i < this.state.complian.length; i++) {
                //alert(this.state.users[i].id);
                for (let j = 0; j < this.state.users.length; j++) {
                  var house_id = this.state.complian[i].user_id;
                  //   var user_id = this.state.complian[i].user_id;
                  let index = { idx: i + 1 };
                  // var house_id = this.state.houses[j].id;
                  if (house_id == this.state.users[j].id) {
                    data.push(Object.assign(index, this.state.complian[i], this.state.users[j]))
                    this.setState({
                      data: data
                    })
                    console.log("EVANS", data);
                  }
                }
              }
            });
        }));
      }

    );



  };


  Constituency() {
    return (this.state.data && (this.state.data.length > 0 || this.state.data.length ==0) &&
      this.state.data.map((countyItem, i) =>
        ({ label: countyItem.last_name + " " + countyItem.first_name, value: countyItem.id })))
  }
  onSelectChangeConstitueny = value => {
    this.setState({ constituency_id: value.value.toString() });
  };
  Landload() {
    return (this.state.landlord && (this.state.landlord.length > 0  || this.state.landlord.length == 0)&&
      this.state.landlord.map((countyItem, i) =>
        ({ label: countyItem.username, value: countyItem.id })))
  }
  onSelectChangeLandLord = value => {
    this.setState({ landLord_id: value.value.toString() });
  };

  onSubmit(e) {
    e.preventDefault();

    let formData = {

      "house_id": this.state.ward_id,
      "tenant_id": this.state.constituency_id,
      "title": this.state.number_of_floors,
      "description": this.state.number_of_carparking,

      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    this.setState({ isLoading: true });

    const token = 'Bearer ' + TOKEN

    axios.post(baseURL + 'complaints', formData, {
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

          this.setState({ statusMessage: response.data.status_message, isShowError: true, alert_color: "alert alert-danger", isLoading: false });
        }
      })
      .catch((error) => {
        console.log('bayoo', error.response)

        this.setState({ statusMessage: error.response.data.status_message, isShowError: true, alert_color: "alert alert-danger", isLoading: false });

      })
  }

  handleChangeBolean = (event) => {
    this.setState({ selectedBolean: event.target.value });
  };
  handleChangeBolean1 = (event) => {
    this.setState({ selectedBolean1: event.target.value });
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
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Add Complain</h3>
          <h5>Fill the below fields to add complains</h5>
        </div>
        <div className="infoWrapper">
          <div className="newPropertyForm">
            <div className="panel-body" >
              {this.state.isShowError ? <div className={this.state.alert_color}
                style={{ fontSize: '15px' }}>
                {this.state.statusMessage}</div> : null}
              <form onSubmit={this.onSubmit}>
                <div className="row form-group">
                  <div className="Price col-xs-12 col-sm-6 col-md-6">
                    <h4>Apartment</h4>

                    <Select
                      options={this.County()}
                      onChange={this.onSelectChange}
                      placeholder="Select Apartment"
                      tabSelectsValue={false}
                      className='drop' />
                    <br />

                  </div>
                  <div className="Price col-xs-12 col-sm-6 col-md-6">
                    <h4>House Number</h4>
                    <Select
                      options={this.Ward()}
                      onChange={this.onSelectChangeWard}
                      placeholder="Select House Number"
                      tabSelectsValue={false}
                      className='drop'
                    />
                    <br />
                  </div>
                  <div className="title col-xs-12 col-sm-6 col-md-6">
                    <h4>Tenant</h4>
                    <Select
                      options={this.Constituency()}
                      onChange={this.onSelectChangeConstitueny}
                      placeholder="Select Your name"
                      tabSelectsValue={false}
                      className='drop'
                    />
                    <br />
                  </div>
                  <div className="title col-xs-12 col-sm-6 col-md-6">
                    <h4>Title</h4>
                    <input type="text" required name="title" onChange={this.handleChangefloor} id="" className="form-control" />
                  </div>
                  <div className="Price col-xs-6">
                    <h4>Description</h4>
                    <input type="text" required name="description" onChange={this.handleChangePark} id="" className="form-control" />
                  </div>
                </div>
                <br />

                <div className="row form-group rowBtn">
                  <button id="input" type="submit" className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'" style={{ fontFamily: 'Fira Sans', backgroundColor: '#0070BA' }}>
                    {this.state.isLoading ? "Please Wait..." : "Submit"}  <i className="fa fa-refresh"></i>
                  </button> &nbsp;&nbsp;&nbsp;

          </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddComplaint;