import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import SelectComponent from 'Components/SelectComponent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslation, SupportedLanguage } from 'Services/Geo';

const mapStateToProps = (state: any) => ({
  lang: state.status.lang,
  isPersist: state.status.isPersist
});

interface SearchBarProps {
  lang: SupportedLanguage;
  isPersist: boolean;
}

interface SelectBarState {
  loc: string;

  isAdvance: boolean;

}

class SearchBar extends React.Component<SearchBarProps, SelectBarState> {
  listBed: string[];
  listBath: string[];
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      isAdvance: false,
      loc: "",

    };
  }
  updateEmail = (e) => {
    this.setState({
      loc: e.currentTarget.value
    }, function(){
      localStorage.setItem("location", e.currentTarget.value)
     // alert(e.currentTarget.value)
    }) ;
  }
  toggleAdvSearch = () => {
    this.setState({
      isAdvance: !this.state.isAdvance
    });
  }
  render() {
    if (!this.props.isPersist) {
      return (null);
    }
    const listBed = [
      getTranslation(this.props.lang, 'Bedrooms'),
      'Single Room',
      'Bedsitter',
      '1',
      '2',
      '3',
      '4'
    ];
  
    return (
      <div className="search-panel">
        <form className="form-inline" role="form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={this.updateEmail}
                required
              id="city"
              placeholder={getTranslation(this.props.lang, 'Location')}
            />
          </div>
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <SelectComponent switchTop={true} listItem={listBed}>
              {getTranslation(this.props.lang, 'Bedrooms')}
            </SelectComponent>
          </div>
         
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <div className="input-group">
              <div className="input-group-addon">Ksh.</div>
              <input
                className="form-control price"
                type="number"
                placeholder={getTranslation(this.props.lang, 'From')}
              />
            </div>
          </div>
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <div className="input-group">
              <div className="input-group-addon">Ksh.</div>
              <input className="form-control price" type="number" placeholder={getTranslation(this.props.lang, 'To')} />
            </div>
          </div>
          <div className={`form-group${this.state.isAdvance ? ' adv' : ' hidden-xs'}`}>
            <div className="checkbox custom-checkbox">
              <label>
                <input type="checkbox"  checked/>
                <Icon name="check" /> {getTranslation(this.props.lang, 'For rent')}</label>
            </div>
          </div>
        
          <div className="form-group">
            <Link to="/listing" className="btn btn-green isThemeBtn">{getTranslation(this.props.lang, 'Search')}</Link>
            <a
              href="#"
              className={`btn btn-o btn-white pull-right visible-xs${this.state.isAdvance ? ' advBtnActive' : ''}`}
              onClick={this.toggleAdvSearch}
            >
              {getTranslation(this.props.lang, 'Advance Search')}
              <Icon name={`${this.state.isAdvance ? 'angle-down' : 'angle-up'}`} />
            </a>
          </div>
        </form>
      </div>
    );
  }
}
export default connect(mapStateToProps)(SearchBar);