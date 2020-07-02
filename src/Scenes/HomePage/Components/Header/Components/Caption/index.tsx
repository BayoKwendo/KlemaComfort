import * as React from 'react';
import './style.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTranslation, SupportedLanguage } from 'Services/Geo';
import { RootState } from 'Redux/Store';

const mapStateToProps = (state: RootState) => ({
  lang: state.status.lang,
  isPersist: state.status.isPersist
});

interface CaptionProps {
  lang: SupportedLanguage;
  isPersist: boolean;
}

class Caption extends React.Component<CaptionProps, {}> {
  render() {
    if (!this.props.isPersist) {
      return (null);
    }
    return (
      <div className="homeCaption">
        <div className="homeTitle">{getTranslation(this.props.lang, 'Now it\'s easy to find your desired home')}</div>
        <div className="homeSubtitle">
          {getTranslation(this.props.lang, 'With PrimeCrib')}
        </div>
        <Link className="btn btn-black" to="/listing">{getTranslation(this.props.lang, 'Listing')}</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Caption);