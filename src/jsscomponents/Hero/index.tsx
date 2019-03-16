import * as React from 'react';
import Logger from '../../components/helpers/Logger';
import { Watch } from 'scrollmonitor-react';
import ReactDOM from 'react-dom';

type HeroPropsFields = {
  heading: {
    value?: string;
    editable?: string;
  } 
}
type HeroProps = {
  fields: HeroPropsFields;
};

type HeroAllProps = HeroProps;

class Hero extends React.Component<any> {

  componentDidUpdate() {
    var header = ReactDOM.findDOMNode(this.props.refs.current);
    if (this.props.isInViewport) {
      Logger.info(this.props.isInViewport, 'Hero:isInViewport');
			if(header) {
        (header as any).classList.add('o-header--transparent');
      }
		} else {
      Logger.info(this.props.isInViewport, 'Hero:isInViewport');
      if(
        header && 
        (header as any).classList)
      {
        (header as any).classList.remove('o-header--transparent');
      }
    }   
  }
  render() {    
    return (
      <div id="hero" className="o-hero h-ph h-pv-d">	
        <div className="o-hero__image">
          <picture>
            <img 
              alt="Umbrella for Sitecore JSS"
              sizes="100vw"
              srcSet="../../../../images/umbrella1.jpg?width=650&height=292 650w,
              ../../../../images/umbrella2.jpg?width=1024&height=412 1024w,
              ../../../../images/umbrella3.jpg?width=1280&height=532 1280w,				
              ../../../../images/umbrella4.jpg?width=1920&height=532 1920w"
              src="../../../../images/umbrella3.jpg?width=1280&height=532"/>
          </picture>  
        </div>
        <div className="o-hero__wrapper">		
          <ul className="o-hero__breadcrumb a-list a-list--hor">
            <li className="noselect">Welcome</li>
            <li className="noselect"><a href="/documentation">Documentation</a></li>
            <li className="noselect"><a href="/styleguide">Styleguide</a></li>
            <li className="noselect"><a href="/graphql">GraphQL</a></li>
          </ul>
          <h1 className="noselect">Welcome to Umbrella for Sitecore JSS</h1>
          <div className="o-hero__info a-text-small noselect">Thanks for using JSS. Here are some resources to get you started</div>		
        </div>	
      </div>
    )
  }
}

export default Watch(Hero);
