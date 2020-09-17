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
  bill: any[],
  imageone: any[],
  amount: string,


  counties1: any[],
  bill1: any[],
  imageone1: any[],

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
      imageone: [],
      bill: [],
      counties1: [],
      imageone1: [],
      bill1: [],
      amount: '',
      constituency: [],
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
      countiesResponse, constituencyResponse, billingResponse, countiesResponse1, constituencyResponse1, billingResponse1] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { 'Authorization': `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + 'posts?limit=3', config),
        axios.get(baseURL + 'apartments', config),
        axios.get(baseURL + 'billings?bill_type_id=2', config),
        axios.get(baseURL + 'counties', config),
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
      ready: 'loaded',
    },

      function () {
        console.log('bayo', constituencyResponse.data)
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
          console.log('bayo', this.state.ima)
        }
      );
      // console.log('image', this.state.image)

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
