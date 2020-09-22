import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL } from 'Helpers/baseURL';
import MenuBar from 'Scenes/HomePage/Components/Header/Components/MenuBar';
import Footer from 'Scenes/HomePage/Components/Footer';
import 'react-slideshow-image/dist/styles.css'
import { Zoom } from 'react-slideshow-image';
import * as moment from 'moment';
import Map from 'Components/Maps/maps';


const Loader = require("../loader.gif");
const Liststyle = styled.div`
  width: 90%;
  padding-top: 12px;
  padding-bottom: 12px;

  margin: 0px auto;
  img {
    width: 100%;
  }
  .viewright {
    text-align: justified;
    h5 {
      background-color: #b7c2f1;
      padding: 20px;
    }
  }
  .btn {
    text-align: center;
  }
  input[type='button'] {
    height: 45px;
    width: 192px;
    border: 0;
    border-radius: 0.5em;
    font-size: larger;
    padding: -23px;
    background-color: #031249;
    color: #b7c2f1;
  }
  .Image {
    width: 25%;
    margin: 0px auto;
    position: relative;
    left: 37%;
  }
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
`;
const Listgroup = styled.div`
  // @media (min-width: 1024px) {
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   grid-gap: 10px;
  // }
`;
interface ListViewState {
  list: any[],
  search: any,
  lists: any[],
  ready: string,
  Name: string,
  counties: any[],
  billings: any[],
  ward: any[],
  amount: string,
  posts: any[],
  apartments: any[],
  houses: any,
  constituency: any[],
  image: any[],
  billingss: any[],
  frequecy: any[],
  activePage: string,
  image_url: any[]
};
class ListView extends React.Component<{ match: any }, ListViewState> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],

      lists: [],
      ready: 'initial',
      counties: [],
      houses: '',
      image_url: [],
      posts: [],
      constituency: [],
      billingss: [],
      frequecy: [],

      billings: [],
      ward: [],
      apartments: [],
      amount: '',
      image: [],
      activePage: '15',
      search: '',

      Name: ''
    };
  }


  async componentDidMount() {
    this.setState({
      ready: 'loading'
    });
    const config = {
    }; const [
      postResponse, apartmentResponse, countiesResponse, constituencyResponse, wardResponse] = await Promise.all([
        axios.get(baseURL + 'posts/highlights?id='+this.props.match.params.id , config),
        axios.get(baseURL + 'apartments', config),
        axios.get(baseURL + 'counties', config),
        axios.get(baseURL + 'constituencies', config),
        axios.get(baseURL + 'wards', config)
      ]);

    this.setState({
      posts: postResponse.data,
      apartments: apartmentResponse.data,
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
      ward: wardResponse.data,
      ready: 'loaded',
    },

      function () {
      }
    );

    console.log('bayo', this.state.posts)
    var data = [];
    var da = 0;

    for (let i = 0; i < (this.state.posts.length || da); i++) {
      console.log('bayos', this.state.posts[i].houses)
      var apartment_id = this.state.posts[i].apartment_id;
      // var house_id = this.state.posts[i].house_id;
      let post_id = { post_id: this.state.posts[i].id };

      for (let r = 0; r < (this.state.posts[i].houses.microimages.length || da); r++) {
        this.setState({
          image_url: this.state.posts[i].houses.microimages,
        })
      }

      for (let w = 0; w < (this.state.posts[i].houses.billings.length || da); w++) {
        this.setState({
          billingss: this.state.posts[i].houses.billings[w].amount,
          frequecy: this.state.posts[i].houses.billings[w].billing_frequency
        })
      }
      // let index = { idx: this.state.posts[i].houses.microimages[0].s3_url};
      let rent = { rent: this.state.billingss };
      let billing = { billing_frequency: this.state.frequecy };



      for (let j = 0; j < this.state.apartments.length; j++) {

        if (apartment_id == this.state.apartments[j].id) {
           
          if (this.state.posts[i].id == this.props.match.params.id ){
            data.push(Object.assign(post_id,  rent, billing, this.state.posts[i],
              this.state.apartments[j]))
            // data.push(Object.assign(index, this.state.counties[i]))
            this.setState({
              lists: data
            })
            console.log('LISTS', this.state.lists);
          }


        
          // for (let p = 0; p < this.state.counties.length; p++) {

          //   if (this.state.apartments[j].county_id == this.state.counties[p].id) {

          //     for (let q = 0; q < this.state.constituency.length; q++) {

          //       if (this.state.apartments[j].constituency_id == this.state.constituency[q].id) {

          //         for (let m = 0; m < this.state.ward.length; m++) {

          //           if (this.state.apartments[j].ward_id == this.state.ward[m].id) {

          //           }
          //         }
          //       }
          //     }

          //   }
          // }
        }
      }
    }
  }



  render() {
    const { lists, ready, image_url } = this.state;

    const filtered = lists.filter(list => {
      return list.title.toLowerCase() !== -1;
    });

    return (
      <>
        <div className="btn btn-green" style={{ width: '100%' }} color="primary">
          <MenuBar />
        </div>

        <Liststyle>
          <div className="row">
            <div className="col-md-6">
              <div style={{ height: "50%" }} >
                <Zoom scale={0.4}>
                  {
                    image_url.map(url => (<img style={{ width: "100%", height: "70vh" }} src={url.s3_url} />))
                  }
                </Zoom>
              </div>
            </div>
            <div className="col-md-6">
              <Map />
            </div>
          </div>

          {ready === 'loading' ? <img src={Loader} className="Image" alt="loader" /> : ''}
          {ready === 'loaded' && (
            <Listgroup>
              {filtered.map(lists => (
                <>

                  {/* 
                    <img src={lists.s3_url} alt="listing items" /> */}
                  <div className="text-center">
                    <h1 >{lists.title}</h1>
                    <h4>ksh. {lists.amount} {lists.billing_frequency}  </h4>
                    <h4>{lists.slug}</h4>
                    <h5>{lists.body}</h5>
                  </div>
                  <Info>
                    <h6>Rent: <b>{lists.amount}/= {lists.billing_frequency}</b></h6>

                    <h6>Posted On: <b>{moment(lists.created_at).format('DD MMM, YYYY')}</b> </h6>
                    <h6>Location: <b>{lists.county_name} County,   {lists.constituency_name} Constituency,  {lists.ward_name} Ward </b></h6>
                    {/* <h6>Constituency:</h6> */}
                    {/* <h6>Area: {list.fields.Area}</h6>
                <h6>Status: {list.fields.Status}</h6> */}
                  </Info>
                  <br /><br />
                  <div className="text-center">
                    <div className="btn ">
                      <Link to="/listing">
                        <input type="button" value="Return" />
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </Listgroup>
          )}
        </Liststyle>
        <div className="footerWrapper">
          <Footer />
        </div>
      </>

    );
  }
}
export default ListView;
