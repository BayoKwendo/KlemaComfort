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
  billings: any[],
  ward: any[],
  amount: string,
  posts: any[],
  apartments: any[],
  constituency: any[],
  image: any[],
  activePage: string

};
class Listing extends React.Component<{}, ListingState> {
  constructor() {
    super();
    this.state = {
      lists: [],
      ready: 'initial',
      search: '',
      counties: [],
      posts: [],
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
      postResponse, apartmentResponse, billingResponse, countiesResponse, constituencyResponse, wardResponse] = await Promise.all([
        axios.get(baseURL + 'posts?limit=3', config),
        axios.get(baseURL + 'apartments', config),
        axios.get(baseURL + 'billings?bill_type_id=2', config),
        axios.get(baseURL + 'counties', config),
        axios.get(baseURL + 'constituencies', config),
        axios.get(baseURL + 'wards', config)
      ]);

    this.setState({
      posts: postResponse.data,
      apartments: apartmentResponse.data,
      billings: billingResponse.data,
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
      ward: wardResponse.data,
      ready: 'loaded',
    },

      function () {
      }
    );

    console.log('bayo', this.state.counties)
    var data = [];
    var da = 0;

    for (let i = 0; i < (this.state.posts.length || da); i++) {
      let index = { idx: i };
      var apartment_id = this.state.posts[i].apartment_id;
      var house_id = this.state.posts[i].house_id;

      let post_id = { post_id: this.state.posts[i].id };

      const [
        imageResponse] = await Promise.all([
          axios.get(baseURL + 'galleries/apartment/' + apartment_id, config),
        ]);
      this.setState({
        image: imageResponse.data
      });
      for (let j = 0; j < this.state.apartments.length; j++) {

        if (house_id == this.state.apartments[j].house_id) {

          for (let n = 0; n < this.state.billings.length; n++) {

            if (house_id == this.state.billings[n].house_id) {

              for (let p = 0; p < this.state.counties.length; p++) {

                if (this.state.apartments[j].county_id == this.state.counties[p].id) {

                  for (let q = 0; q < this.state.constituency.length; q++) {

                    if (this.state.apartments[j].constituency_id == this.state.constituency[q].id) {

                      for (let m = 0; m < this.state.ward.length; m++) {

                        if (this.state.apartments[j].ward_id == this.state.ward[m].id) {

                          data.push(Object.assign(index, post_id, this.state.posts[i],
                             this.state.apartments[j], this.state.constituency[q],
                             this.state.counties[p], this.state.ward[m],
                              this.state.billings[n], this.state.image[0]))
                          // data.push(Object.assign(index, this.state.counties[i]))
                          this.setState({
                            lists: data
                          })
                          console.log('LISTS', this.state.lists);
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
                      <ListItems image={list.s3_url ? list.s3_url : ''} >
                        <h4 className='text-center'>{list.title}</h4>
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

        </div>

      </div>
    );
  }
}
export default Listing;
