import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import "./csv.css";
import Dashboard from 'Components/DashboardLayout';

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
  isShowError: boolean,
  hide1Component: boolean,
  csvfile: string

};


class AddAgreement extends React.Component<{}, ListingState> {
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
        axios.get(baseURL + "apartments", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'houses', { headers: { "Authorization": token } }),


      ]);

    this.setState({
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
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


  onSubmit(e) {
    e.preventDefault();
    let formData = {

      "house_number": this.state.apartment_name,
      "apartment_id": this.state.county_id,
      "house_size": this.state.number_of_floors,
      "house_type": this.state.number_of_carparking,
      "caretaker_id": this.state.constituency_id,
      "number_bathrooms": this.state.number_blocks,
      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    this.setState({ isLoading: true });

    const token = 'Bearer ' + TOKEN

    axios.post(baseURL + 'houses', formData, {
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


  importCSV = event => {
    event.preventDefault();
    console.log("fileformat", this.state.csvfile)
    var data = new FormData();
    this.setState({ isLoading: true });


    const item = localStorage.getItem("item")

   // alert(item)
    data.append("image", this.state.csvfile);
    // console.log("DATA", data);

    axios.put(baseURL + 'leases/'+item+'/agreement', data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
    }).then((response) => {

      if (response.data.status) {
        this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-success", isLoading: false, isShowError: true });
        console.log("bayo", response.data)
        window.setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        this.setState({ statusMessage: response.data.status_message, isLoading: false, alert_color: "alert alert-danger", isShowError: true });
      }

    }).catch((error) => {
      console.log('bayoo', error.response)
      this.setState({ statusMessage: error.response.data.status_message, isLoading: false, alert_color: "alert alert-danger", isShowError: true });
    })
  }

  handleChangeCSV = event => {
    console.log("FETCHER", event.target.files);
    this.setState({
      csvfile: event.target.files[0]
    });
  };



  updateData(result) {
    var data = result.data;
    console.log("bayoonfon", data);
  }
  render() {
    return (
      <div className="searchPage">
        <Dashboard>

          <div className="searchFormWrapper">
            <div className="rentPropertyPage">
              <div className="dashboardTitle">
                <h3>Upload Agreement</h3>
                <h5>Kindly Uplaod an Agreement</h5>
              </div>
              <div className="dashboardBody">
                <div className="newPropertyForm">
                  {this.state.isShowError ? <div className={this.state.alert_color}
                    style={{ fontSize: '15px' }}>
                    {this.state.statusMessage}</div> : null}
                  <form onSubmit={this.onSubmit}>


                    <div className="wrapper text-center title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
                      <div className="section1"><br />
                        <div className="container">
                          <h2 style={{ marginBottom: '20px' }}>Import Document File!</h2>
                          <input
                            className="csv-input"
                            type="file"
                            name="file"
                            placeholder={null}
                            onChange={this.handleChangeCSV}
                          />
                          <p />

                        </div>
                      </div>

                    </div>

                    <div className="text-center title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
                      <button id="input" onClick={this.importCSV} className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'" style={{ fontFamily: 'Fira Sans', backgroundColor: '#0070BA' }}>
                        {this.state.isLoading ? "Please Wait..." : "Import now!"}  <i className="fa fa-refresh"></i>
                      </button>
                    </div>



                    <br />

                  </form>
                </div>
              </div>
            </div>
          </div>
        </Dashboard>
      </div>

    );
  }
}

export default AddAgreement;