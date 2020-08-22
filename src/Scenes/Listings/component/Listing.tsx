import * as React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import ListItems from "./ListItems";
import axios from "axios";
import * as moment from 'moment';
import { baseURL } from 'Helpers/baseURL';
import Pagination from "react-js-pagination";

const Loader = require("../loader.gif");

const List = styled.div`
  padding: 50px 0;
  .listgroup {
    width: 90%;
    margin: 0px auto;
  }
  .listLeft {
    text-align: center;
    @media (min-width: 1024px) {
      height: 515px;
    }
  }
  input {
    width: 239px;
    height: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    @media (min-width: 425px) {
      width: 315px;
    }
    @media (min-width: 768px) {
      width: 425px;
    }
    @media (min-width: 1024px) {
      width: 280px;
    }
  }

  select {
    border-radius: 0.4em;
    width: 239px;
    height: 30px;
    border: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    @media (min-width: 425px) {
      width: 315px;
    }
    @media (min-width: 768px) {
      width: 425px;
    }
    @media (min-width: 1024px) {
      width: 280px;
    }
  }
  .propt_btn {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 0.5em;
    font-size: larger;
    padding: -23px;
    background-color: #031249;
    color: #b7c2f1;
  }

  @media (min-width: 1024px) {
    .listgroup {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-gap: 20px;
    }

    .listLeft {
      height: auto;
      width: 300px;
      padding: 15px 0;
      background-color: #b7c2f1;
      border-radius: 0.4em;
      border-bottom-left-radius: 0.4em;
      @media (min-width: 1024px) {
        height: 515px;
      }
    }

    .listRight {
      height: auto;
    }
  }
`;
const ListRight = styled.div`
  @media (min-width: 768px){  
    .loader-img{
        width: 345px;
        margin: 0px auto;
    }
  }
  .right{
    @media (min-width: 768px){
      display:grid;
      grid-template-columns:1fr 1fr;
      
    }
    @media (min-width: 1440px){
      display:grid;
      grid-template-columns:1fr 1fr 1fr;
    }
  }
  .Image {
    width: 100%;
    margin: 0px auto;
    }
  }
  

`;
const Info = styled.div`
  @media (min-width: 375px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }
`;

type ListingState = {

  search: any,
  lists: any[],
  ready: string,
  Name: string,
  counties: any[],
  bill: any[],
  imageone: any[],
  amount: string,


  counties1: any[],
  bill1: any[],
  imageone1: any[],
  body: string,

  constituency: any[],
  image: any[],
  activePage: string

};
class Listing extends React.Component<{ }, ListingState> {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      ready: "initial",
      search: "",
      counties: [],
      imageone: [],
      bill: [],
      counties1: [],
      body: "",
      imageone1: [],
      bill1: [],
      amount: "",
      constituency: [],
      image: [],
      activePage: "15",

      Name: ''
    };
  }


  async componentDidMount() {
    // const loc = localStorage.getItem("location")
    // alert(loc)
    // // const { match: { params } } = this.props;
    // const id = params.id;

    // alert
    this.setState({
      ready: "loading"
    });
    const config = {
    }; const [
      countiesResponse, constituencyResponse, billingResponse, countiesResponse1, constituencyResponse1, billingResponse1] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "posts", config),
        axios.get(baseURL + 'apartments', config),
        axios.get(baseURL + 'billings?bill_type_id=2', config),
        axios.get(baseURL + "counties", config),
        axios.get(baseURL + 'constituencies', config),
        axios.get(baseURL + 'wards', config)
      ]);

    this.setState({
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
      imageone: billingResponse.data,
      counties1: countiesResponse1.data,
      imageone1: constituencyResponse1.data,
      bill1: billingResponse1.data,
      ready: "loaded",
    },

      function () {
        console.log("bayo", constituencyResponse.data)
      }
    );
    var data = [];
    for (let i = 0; i < this.state.counties.length; i++) {
      let index = { idx: i };
      var house_id = this.state.counties[i].apartment_id;

      let post_id = { post_id: this.state.counties[i].id };

      const [
        imageResponse] = await Promise.all([
          axios.get(baseURL + 'galleries/apartment/' + house_id, config),
        ]);
      this.setState({
        image: imageResponse.data
      },
        function () {
          console.log("bayo", imageResponse.data)
        }
      );
      // console.log("image", this.state.image)

      // //alert(this.state.users[i].id);
      for (let j = 0; j < this.state.constituency.length; j++) {
        //   var user_id = this.state.complian[i].user_id;

        for (let n = 0; n < this.state.counties1.length; n++) {

          if (this.state.constituency[j].county_id == this.state.counties1[n].id) {

            for (let p = 0; p < this.state.imageone1.length; p++) {

              if (this.state.constituency[j].constituency_id == this.state.imageone1[p].id) {

                for (let q = 0; q < this.state.bill1.length; q++) {
                  if (this.state.constituency[j].ward_id == this.state.bill1[q].id) {
                    for (let m = 0; m < this.state.imageone.length; m++) {
                      var apartment = this.state.imageone[m].apartment_id;

                      var house = this.state.imageone[m].house_id;

                      if (house_id == this.state.constituency[j].id) {

                        if (apartment == this.state.counties[i].apartment_id) {
                          if (house == this.state.counties[i].house_id) {
                            data.push(Object.assign(index, post_id, this.state.counties[i], this.state.counties1[n], this.state.bill1[q]
                              , this.state.imageone1[p], this.state.image[0], this.state.imageone[m]))
                            // data.push(Object.assign(index, this.state.counties[i]))
                            this.setState({
                              lists: data
                            })
                            console.log("LISTS", this.state.lists);

                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

  }


  locationChange(e: { target: { value: any; }; }) {

    this.setState({
      search: e.target.value
    }, function () {
    });

  }
  locationChanges(e: { target: { value: any; }; }) {

    this.setState({
      Name: e.target.value
    }, function () {
    });

  }
  PropertyChange(e: { target: { value: any; }; }) {
    this.setState({
      search: e.target.value
    });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  render() {
    const { lists, ready, search } = this.state;


    const filtered = lists.filter(list => {
      return (list.county_name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    });

    // const filtered = lists.filter(list => {
    //   
    // });
    return (
      <div>

        <List>
          <div className="listgroup">
            <div className="listLeft">
              <h3>Filter</h3>
              <form>
                <input type="search" name="search" placeholder="Location" onChange={this.locationChange.bind(this)} />
                <input type="search" name="body" placeholder="Body" onChange={this.locationChanges.bind(this)} />
                <input type="search" name="body" placeholder="Slug" onChange={this.locationChanges.bind(this)} />

                <input type="search" name="body" placeholder="Rent" onChange={this.locationChanges.bind(this)} />


                {/* <div className="bedrooms">
                  <select name="bedroom" className="app-select" required onChange={this.PropertyChange.bind(this)}>
                    <option data-display="Bedrooms">Bedrooms</option>
                    <option value="1">Single Room</option>

                    <option value="1">One Bedroom</option>
                    <option value="1 Bedrooms">1</option>
                    <option value="2 Bedrooms">2</option>
                    <option value="3 Bedrooms">3</option>
                    <option value="4 Bedrooms">4</option>
                    <option value="5 Bedrooms">5</option>
                  </select>
                </div>
                <div className="PriceRange">
                  <input type="text" id="range" name="range" placeholder='Price Range' />
                </div>
                <div className="AreaRange">
                  <input type="text" id="range2" name="range" placeholder='Area Range' />
                </div>
                <div className="button">
                  <button className="propt_btn">Search Properties</button>
                </div> */}
              </form>
            </div>
            <ListRight>
              <div >
                {/* {lists.length ? "" : <h3>There are no list items</h3>} */}
                {ready === "loading" ? (
                  <div className="loader">
                    <img src={Loader} className="Image" alt="loader" />
                  </div>
                ) : (
                    ""
                  )}
              </div>
              <div className="right">
                {filtered.length ? "" : <h3 style={{ color: "red" }}> Ooops no match found!!</h3>}

                {filtered.map(list => (
                  <div key={list.id}>
                    <Link to={`/Listview/${list.post_id}`}>
                      <ListItems image={list.s3_url ? list.s3_url : ""} >
                        <h4 className="text-center">{list.title}</h4>
                        <h4>ksh. {list.amount} {list.billing_frequency}  </h4>
                        <h5>{list.body}</h5>
                        <Info>
                          <h6>Rent: {list.amount}/= {list.billing_frequency}</h6>
                          <h6>Area: {list.county_name}</h6>
                          <h6>Posted On: {moment(list.created_at).format('DD MMM, YYYY')} </h6>
                        </Info>
                      </ListItems>
                    </Link>
                  </div>
                ))}
              </div>
            </ListRight>
          </div>
        </List>
        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={2}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>

      </div>
    );
  }
}
export default Listing;



// const [response1, response2] = await Promise.all([
//   // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
//   axios.get(baseURL + 'galleries/apartment/' + house_id, config),
//   axios.get(baseURL + 'billings?house_id=' + this.state.counties[i].house_id, config)
// ]);

// this.setState({
//   image: response1.data,
//   Billing: response2.data,

// },

//   function () {

//     data.push(Object.assign(index, this.state.counties[i], this.state.image[0], this.state.Billing[0]))
//     this.setState({
//       lists: data,
//     },

//       console.log("lists", this.state.lists)
//     )
//   }
// );



// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// // import Navbar from '../Navbar';Footer
// // import Footer from '../Footer';
// import styled from 'styled-components';
// import ListItems from './ListItems';
// import axios from 'axios';
// // import Loader from '../../../assets/loader.gif';
//  const Loader = require("../loader.gif");

// const List= styled.div`
//   padding:50px 0;
//   .listgroup{
//     width:90%;
//     margin: 0px auto;
//   }
//   .listLeft{
//     text-align:center;
//     @media (min-width: 1024px){
//       height: 515px;
//     }
//   }
//   input{
//     width: 239px;
//     height: 30px;
//     margin-top: 20px;
//     margin-bottom: 20px;
//     padding:10px;
//     @media (min-width:425px){
//       width: 315px;
//     }
//     @media (min-width: 768px){
//       width: 425px;
//     }
//     @media (min-width: 1024px){
//       width: 280px;
//     }
//   }

//   select{
//     border-radius: 0.4em;
//     width: 239px;
//     height: 30px;
//     border: 0;
//     margin-top: 20px;
//     margin-bottom: 20px;
//     @media (min-width:425px){
//       width: 315px;
//     }
//     @media (min-width: 768px){
//     width: 425px;
//     }
//     @media (min-width: 1024px){
//       width: 280px;
//     }
//   }
//   .propt_btn{
//     height: 45px;
//     width: 192px;
//     border: 0;
//     border-radius: 0.5em;
//     font-size: larger;
//     padding: -23px; 
//     background-color: #031249;
//     color: #b7c2f1;
//   }

//   @media (min-width: 1024px){
//     .listgroup{
//       display:grid;
//       grid-template-columns:1fr 3fr;
//       grid-gap: 20px;
//     }

//     .listLeft{
//       height:auto;
//       width:300px;
//       padding:15px 0;
//       background-color: #b7c2f1;
//       border-radius: 0.4em;
//       border-bottom-left-radius: 0.4em;
//       @media (min-width: 1024px){
//         height:515px;
//       }
//     }

//     .listRight{
//       height:auto;
//     }

//   }

// `;
// const ListRight = styled.div`
//   @media (min-width: 768px){  
//     .loader-img{
//         width: 345px;
//         margin: 0px auto;
//     }
//   }
//   .right{
//     @media (min-width: 768px){
//       display:grid;
//       grid-template-columns:1fr 1fr;

//     }
//     @media (min-width: 1440px){
//       display:grid;
//       grid-template-columns:1fr 1fr 1fr;
//     }
//   }
//   .Image {
//     width: 100%;
//     margin: 0px auto;
//     }
//   }


// `;

// const Info = styled.div`
//   @media (min-width: 375px){
//     display:grid;
//     grid-template-columns:1fr 1fr;
//     text-align:center;
//   }
// `;


// type ListingState = {

//   search: any,
//   lists: any[],
//   ready: string,


// };
// class Listing extends Component<{}, ListingState> {

//   constructor() {
//     super();
//     this.state = {
//       lists: [],
//       ready: 'initial',
//       search: "",
//     };
//   }
//     componentDidMount() {
//       this.setState({
//         ready: 'loading',
//       });
//       axios({
//         method: 'get',
//         url: `https://api.airtable.com/v0/apprAJrG1euRf2tmF/Listings`,
//         headers: {Authorization: `Bearer keyRMRWZ0xrBXA8Yv`},

//       }).then(({ data: { records } }) => {
//         console.log(records);
//         this.setState({
//           ready: 'loaded',
//           lists: records,
//         })
//       })
//     }
//     locationChange(e){
//       this.setState({
//         search:e.target.value
//       })
//     }
//     PropertyChange(e){
//       this.setState({
//         search:e.target.value
//       })
//     }

//   render() {
//     const { lists, ready,search } = this.state;
//     const filtered = lists.filter(list => {
//       return list.fields.Name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
//     });


//     return (
//       <div>
//         {/* <Navbar /> */}
//         <List>
//           <div className="listgroup">
//             <div className="listLeft">
//               <h3>Filter</h3>
//               <form>
//                 <input type="search" name="search" placeholder='Location' onChange={this.locationChange.bind(this)} />
//                 <div className="Property">
//                   <select name="property-type" className="app-select" required >
//                     <option data-display="Property Type">Property Type</option>
//                     <option value="1">Modern Luxury Townhouse</option>
//                     <option value="2">terraced duplex</option>
//                     <option value="3">Urban Townhouse</option>
//                     <option value="3">Downtown Condo</option>
//                     <option value="3">Modern Beach House</option>
//                     <option value="3"> Luxury Hamptons Home</option>
//                     <option value="3"> Detached Duplex</option>
//                     <option value="3"> Semi-Detached Duplex</option>
//                     <option value="3"> Detached Bungalow</option>

//                   </select>
//                 </div>
//                 <div className="bedrooms">
//                   <select name="bedroom" className="app-select" required onChange={this.PropertyChange.bind(this)}>
//                     <option data-display="Bedrooms">Bedrooms</option>
//                     <option value="1">1BR</option>
//                     <option value="2">2BR</option>
//                     <option value="3">3BR</option>
//                     <option value="4">4BR</option>
//                     <option value="5">5BR</option>
//                   </select>
//                 </div>
//                 <div className="PriceRange">
//                   <input type="text" id="range" name="range" placeholder='Price Range' />
//                 </div>
//                 <div className="AreaRange">
//                   <input type="text" id="range2" name="range" placeholder='Area Range' />
//                 </div>
//                 <div className="button">
//                   <button className='propt_btn'>Search Properties</button>
//                 </div>
//               </form>
//             </div>
//             <ListRight>
//               <div className="loader">
//                 {lists.length ? '' : (<h3>There are no list items</h3>)}
//                 {ready === 'loading' ? (<div className='loader-img'><img src={Loader} className='Image' alt="loader" /></div>) : ''}
//               </div>
//               <div className="right">
//                 {filtered.map(list => (
//                   <div key={list.id}>
//                     <Link to={`/Listview/${list.id}`}>
//                       <ListItems image={list.fields.icon ? list.fields.icon[0].url : ''} >
//                         <h4>{list.fields.Asking}</h4>
//                         <h5>{list.fields.Name}</h5>
//                         <Info>
//                           <h6>Bedrooms: {list.fields.Bedrooms}</h6>
//                           <h6>Bathrooms: {list.fields.Bathrooms}</h6>
//                           <h6>Area: {list.fields.Area}</h6>
//                           <h6>Status: {list.fields.Status}</h6>
//                         </Info>
//                       </ListItems>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </ListRight>
//           </div>
//         </List>
//         {/* <Footer /> */}
//       </div>
//     )
//   }
// }
// export default Listing;
