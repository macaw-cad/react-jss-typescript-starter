import * as React from 'react';
import { Image } from '@sitecore-jss/sitecore-jss-react';

interface HeroFields {
    umbrella: any;
}
interface Props {
    fields: HeroFields
}
const Hero: React.FunctionComponent<Props> = (props) => {
    return (
        <div id="hero" className="o-hero h-ph h-pv-d">	
          <div className="o-hero__image">          
            <picture>
            <Image
            field={props.fields.umbrella}
            srcSet={[{ mw: 300 }, { mw: 100 }]}
            sizes="(min-width: 960px) 300px, 100px"
            className="img-fluid"
          />
            </picture>
          </div>
          <div className="o-hero__wrapper">		
            <h1 className="noselect">Welcome to Umbrella for Sitecore JSS</h1>
            <div className="o-hero__info a-text-small noselect">Thanks for using JSS. Here are some resources to get you started</div>		
          </div>	
        </div>
      )
}

export default Hero;
