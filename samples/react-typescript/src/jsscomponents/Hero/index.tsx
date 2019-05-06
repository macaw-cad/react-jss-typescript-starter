import * as React from 'react';
import { Image } from '@sitecore-jss/sitecore-jss-react';
import { HeroBaseProps } from './Hero.props';

type HeroProps = HeroBaseProps;

const Hero: React.FunctionComponent<HeroProps> = (props) => {
    return (
        <div id="hero" className="o-hero h-ph h-pv-d">	
          <div className="o-hero__image">          
            <picture>
            <Image
            field={props.fields.image}
            className="img-fluid"
          />
            </picture>
          </div>
          <div className="o-hero__wrapper">		
            <h1 className="noselect">Welcome to Umbrella for Sitecore JSS</h1>
            <div className="o-hero__info a-text-small noselect">Use React, TypeScript and Docker to build your next headless Sitecore solution</div>		
          </div>	
        </div>
      );
};

export default Hero;
