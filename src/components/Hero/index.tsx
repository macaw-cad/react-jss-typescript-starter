import * as React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';

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

const Hero: React.SFC<HeroAllProps> = (props: HeroAllProps) => (
  <div>
    <p>Hero Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default Hero;
