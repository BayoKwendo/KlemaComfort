import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseURL } from 'Helpers/baseURL';
import ListItems from 'Scenes/Listings/component/ListItems';
import * as moment from 'moment';

const Loader = require('../../loader.gif');

const List = styled.div`
  padding: 50px 0;
  .listgroup {
    width: 90%;
    margin: 0px auto;
  }
  
  
`;
const ListRight = styled.div`
  @media (min-width: 100%){  
    .loader-img{
        width: 300px;
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
  billings: any[],
  ward: any[],
  amount: string,
  posts: any[],
  apartments: any[],
  houses: any,
  billingss: any[],
  frequecy: any[],
  image_url: any[],
  constituency: any[],
  image: any[],
  activePage: string

};
class ListingHigh extends React.Component<{}, ListingState> {
  constructor() {
    super();
    this.state = {
      lists: [],
      ready: 'initial',
      search: '',
      counties: [],
      billingss: [],
      image_url: [],
      houses: '',
      posts: [],
      frequecy: [],
      constituency: [],
      billings: [],
      ward: [],
      apartments: [],
      amount: '',
      image: [],
      activePage: '15',
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
        axios.get(baseURL + 'posts/highlights?limit=3', config),
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

    for (let i = 0; i < (this.state.posts.length || da ); i++) {
      console.log('bayos', this.state.posts[i].houses)
      var apartment_id = this.state.posts[i].apartment_id;
      // var house_id = this.state.posts[i].house_id;
      let post_id = { post_id: this.state.posts[i].id };

      for (let r = 0; r < (this.state.posts[i].houses.microimages.length || da); r++) {
        this.setState({
          image_url: this.state.posts[i].houses.microimages[r].s3_url,
        })
      }

      for (let w = 0; w < (this.state.posts[i].houses.billings.length || da); w++) {
        this.setState({
          billingss: this.state.posts[i].houses.billings[w].amount,
          frequecy: this.state.posts[i].houses.billings[w].billing_frequency
        })
      }
      let index = { idx: this.state.image_url };
      // let index = { idx: this.state.posts[i].houses.microimages[0].s3_url};
      let rent = { rent: this.state.billingss};
      let billing = { billing_frequency: this.state.frequecy};

      for (let j = 0; j < this.state.apartments.length; j++) {

        if (apartment_id == this.state.apartments[j].id) {
          data.push(Object.assign(post_id,index,rent,billing, this.state.posts[i],
            this.state.apartments[j]))
          // data.push(Object.assign(index, this.state.counties[i]))
          this.setState({
            lists: data
          })
          console.log('LISTS', this.state.lists);
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


  locationChange(e: { target: { value: any; }; }) {

    this.setState({
      search: e.target.value
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
      return list.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });


    return (
      <div>

        <List>
          <div className='listgroup'>
            <div className=''>

              <form>


              </form>
            </div>
            <ListRight>
              <div >
                {lists.length ? '' : <h3>There are no list items</h3>}
                {ready === 'loading' ? (
                  <div className='loader'>
                    <img src={Loader} className='Image' alt='loader' />
                  </div>
                ) : (
                    ''
                  )}
              </div>
              <div className='right'>
                {filtered.map(list => (
                  <div key={list.id}>
                    <Link to={`/Listview/${list.post_id}`}>
                      <ListItems image={list.idx ? list.idx : ''} >
                        <h4 className='text-center'>{list.title}</h4>
                        <h4>ksh. {list.rent} {list.billing_frequency}  </h4>
                        <h5>{list.body}</h5>
                        <Info>
                          <h6>Rent: {list.rent}/= {list.billing_frequency}</h6>
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

        </div>

      </div>
    );
  }
}
export default ListingHigh;
