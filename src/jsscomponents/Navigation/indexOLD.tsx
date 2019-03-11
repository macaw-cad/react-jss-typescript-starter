import * as React from 'react';
import NavList from './NavList';

interface INavigationProps {
    items: any;
    parameters: any;
}

interface INavigationState {
    isOpen: boolean;
}

class Navigation extends React.Component<INavigationProps, INavigationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.onShowMenuClick = this.onShowMenuClick.bind(this);
    }

    onShowMenuClick = (event) => {
        event.preventDefault();
        const isOpen = !this.state.isOpen;

        this.setState({
            isOpen,
        });

        if (document && document.documentElement) {
            document.documentElement.style.overflow = isOpen ? 'hidden' : 'visible';
        }
    }

    render() {

        const {
            items = [],
            parameters: {
                className = '',
            } = {},
        } = this.props;

        return (
            <div className={`m-navigation-menu ${className}`}>
                <a
                    className="m-navigation-menu__button"
                    onClick={this.onShowMenuClick}
                >
                    { this.state.isOpen ?
                      /*<Icon name={IconNames.FnClose} /> :
                      <Icon name={IconNames.FnMenu} />*/
                      '' : ''
                    }
                </a>
                {items ?
                    <NavList
                        items={items}
                        level={1}
                        expanded={false}
                        isOpen={this.state.isOpen}
                    /> : (null)}
            </div>
        );
    }
}

export default Navigation;
