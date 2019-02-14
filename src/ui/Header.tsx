import * as React from 'react';
import { Link } from 'react-router-dom';

type HeaderAllProps = {};

type HeaderState = {
    isMenuOpen: boolean; 
};

class Header extends React.Component<HeaderAllProps, HeaderState> {
    public state = {
        isMenuOpen: false
    };

    public render(): JSX.Element {
        return (
            <header>
                <div>
                    <Link to="/"><button>Home</button></Link>
                </div>
                <div>
                    I'm a header
                </div>
                <hr/>
            </header>
        );
    }
    
    private toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }
}

export default Header;
