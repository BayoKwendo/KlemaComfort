import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';
import * as moment from 'moment';



const columns = [
  {
    key: "idx",
    text: "#",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  
  {
    key: "first_name",
    text: "First Name",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  }, {
    key: "last_name",
    text: "Last Name",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "id_number",
    text: "ID Number",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "msisdn",
    text: "Phone Number",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "apartment_name",
    TrOnlyClassName: 'tsc',
    text: "Apartment Name",
    className: "tsc",
  },
  {
    key: "house_number",
    text: "House Number",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "house_type",
    text: "House Type",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "invoice_id",
    text: "Invoice ID",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "payment_status",
    text: "Payment Status",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "dates3",
    TrOnlyClassName: 'tsc',
    text: "Due Date",
    className: "tsc",
  },
  {
    key: "dates",
    text: "Created At",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "dates2",
    text: "Updated At",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },

];

const config = {
  key_column: "tsc",
  length_menu: [10, 20, 50],
  show_filter: true,
  show_pagination: true,
  pagination: 'basic',
  page_size: 10,
  show_length_menu: true,
  language: {
    loading_text: "Please be patient while data loads..."
  }

}

class Invoice extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };


  }
  async componentDidMount() {
    const [invoiceResponse, houseResponse, apartmentResponse, usersResponse] = await Promise.all([
      axios.get(baseURL + "invoices", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "houses", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "apartments?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "users?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),


    ]);
    this.setState(
      {
        invoices: invoiceResponse.data,
        users: usersResponse.data,
        houses: houseResponse.data,
        apartment: apartmentResponse.data,

        isLoading: false
      },
      function () {
        console.log("lease", invoiceResponse.data);
      });
    /// var data = [];

    var data = [];
    for (let i = 0; i < this.state.invoices.length; i++) {
      //alert(this.state.users[i].id);
      let index = { idx: i + 1 };

      for (let j = 0; j < this.state.houses.length; j++) {
        //   var user_id = this.state.complian[i].user_id;
        var house_id = this.state.invoices[i].house_id;
        if (house_id == this.state.houses[j].id) {
          for (let l = 0; l < this.state.apartment.length; l++) {
            var apartment_id = this.state.houses[j].apartment_id;
            if (apartment_id == this.state.apartment[l].id) {
              for (let m = 0; m < this.state.users.length; m++) {

                if (this.state.users[m].id == this.state.invoices[i].customer_id) {
                  let date = { dates: moment(this.state.invoices[i].created_at).format('DD MMM, YYYY HH:MM') };
                  let date2 = { dates2: moment(this.state.invoices[i].updated_at).format('DD MMM, YYYY HH:MM') };
                  let date3 = { dates3: moment(this.state.invoices[i].due_date).format('DD MMM, YYYY HH:MM') };

                  data.push(Object.assign(index, this.state.invoices[i], this.state.users[m], this.state.houses[j], this.state.apartment[l], date, date2, date3))
                  this.setState({
                    data: data
                  })
                }


              }
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Invoices Generated</h3>
          <h5></h5>
        </div>
        <div className="dashboardBody">

          <div className="panel-body" >
            <br /><br />
            {this.state.isShowError ?
              <div className="alert alert-success" > {this.state.statusMessage}
              </div> : null
            }
            < ReactDatatable
              config={config}
              records={
                this.state.data
              }
              id="tsc"
              columns={columns}
              loading={this.state.isLoading}
            />

          </div>
        </div>
      </div>
    );
  }
}


export default Invoice;