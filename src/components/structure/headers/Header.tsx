import * as React from 'react';
import logo from '../../../assets/images/sitecore.svg';
import GridBuilder from '../../../jsscomponents/GridBuilder';
import Rendering from '../../../containers/Rendering';

class Header extends Rendering {
    render() {
        return (
            <header id="header" className="o-header">
                {/*<GridBuilder {...this.props} name={this.props.name} columns={[12]}>
                    top links
                </GridBuilder>
                <GridBuilder {...this.props} name={this.props.name} columns={[12]}>
                    <img src={logo} alt="" />
                    menu
        </GridBuilder> */}
            </header>
        );
    }
}

export default Header;