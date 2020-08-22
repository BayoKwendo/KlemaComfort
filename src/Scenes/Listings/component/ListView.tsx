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
  ready: string,
  Name: string,
  counties: any[],
  bill: any[],
  imageone: any[],

  amount: string,


  counties1: any[],
  bill1: any[],
  imageone1: any[],
  image_url: any[],

  constituency: any[],
  image: any[],
  activePage: string

};
class ListView extends React.Component<{ match: any }, ListViewState> {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      ready: "initial",
      counties: [],
      image_url: [],
      imageone: [],
      bill: [],
      counties1: [],
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
    const { match: { params } } = this.props;
    const id = params.id;
    this.setState({
      ready: "loading"
    });
    const config = {
      headers: { Authorization: `Bearer   .eyJlbWFpbF9hZGRyZXNzIjoic2FAb25mb25tZWRpYS5jb20iLCJyb2xlX2lkIjoxLCJtc2lzZG4iOiIyNTQ3MTMxMjI4MTkiLCJ1c2VybmFtZSI6InN1cGVydXNlciIsImZpcnN0X25hbWUiOiJzdXBlcnVzZXIiLCJsYXN0X25hbWUiOiJzdXBlcnVzZXIiLCJpZCI6MSwidGltZSI6IjIwMjAtMDgtMTdUMDU6NTU6MTkuNjg3WiIsImlhdCI6MTU5NzY0MzcxOSwiZXhwIjoxNTk3Njg2OTE5fQ.6B4caaSL8OgR2O-aJbqAQkeBTrvzAkGsTFplcNhWzsM` }
    }; const [
      countiesResponse, constituencyResponse, billingResponse, countiesResponse1, constituencyResponse1, billingResponse1] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + `posts?id=${id}`, config),
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
      let post_id = { post_id: this.state.counties[i].id };

      // //alert(this.state.users[i].id);
      for (let j = 0; j < this.state.constituency.length; j++) {
        var house_id = this.state.counties[i].apartment_id;
        //   var user_id = this.state.complian[i].user_id;

        for (let n = 0; n < this.state.counties1.length; n++) {

          if (this.state.constituency[j].county_id == this.state.counties1[n].id) {

            for (let p = 0; p < this.state.imageone1.length; p++) {

              if (this.state.constituency[j].constituency_id == this.state.imageone1[p].id) {

                for (let q = 0; q < this.state.bill1.length; q++) {
                  if (this.state.constituency[j].ward_id == this.state.bill1[q].id) {
                    for (let m = 0; m < this.state.imageone.length; m++) {
                      var house = this.state.imageone[m].house_id;

                      if (house_id == this.state.constituency[j].id) {

                        if (house == this.state.counties[i].house_id) {


                          axios.get(baseURL + 'galleries/apartment/' + house_id, config).then(res => {
                            //console.log("LOOG" , res.data.status_message);
                            this.setState({
                              image: res.data,
                            });
                            for (let r = 0; r < this.state.image.length; r++) {
                              this.setState({
                                image_url: this.state.image,
                              })
                              console.log("LISTS", this.state.image_url);
                            }
                            data.push(Object.assign(index, post_id, this.state.counties[i], this.state.counties1[n], this.state.imageone1[p], this.state.bill1[q], this.state.image[0], this.state.imageone[m]))
                            this.setState({
                              list: data
                            })
                            console.log("bayo", this.state.list)
                          });
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
  render() {
    const { list, ready, image_url } = this.state;

    const filtered = list.filter(list => {
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
