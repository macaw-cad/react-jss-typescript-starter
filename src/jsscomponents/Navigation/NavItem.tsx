import * as React from 'react';
import NavList from './NavList';
import NavigationItem from '../../types/macaw/features/NavigationItem';

interface INavItemState {
    expanded: boolean;
}

class NavItem extends React.Component<NavigationItem, INavItemState> {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        };

        this.navTouchHandler = this.navTouchHandler.bind(this);
    }

    navTouchHandler = (event) => {
        event.preventDefault();
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    checkForActiveChild(items: NavigationItem[], val: string): boolean {
        return items.some((arrVal) => val === (arrVal.active && arrVal.active.value ? arrVal.active.value : "false"));
    }

    render() {

        const level = this.props.text ? (this.props.text.value || 1) : 1;
        const nextLevel = parseInt(level.toString(), 10) + 1;
        const navMaxLevel = 2;

        const isAChildActive = this.props.items ? this.checkForActiveChild(this.props.items, "true") : false;
        const isNavListItselfActive = this.props.active ? this.props.active.value : "false";
        const isNavItemActive = isNavListItselfActive === "true" || isAChildActive === true ? true : false;

        const items = this.props.items || [];
        const classNameItem = `m-navigation-item-level${level}`;
        const classNameWrapped = `m-navigation-item-wrapper-level${level}`
            .concat(isNavItemActive ? ' m-navigation-item-wrapper--active' : '');
        const classNameExpander = 'm-navigation-item-expander'
            .concat(this.state.expanded ? ' is-expanded' : '');

        const item = (
            <a
                className={classNameItem}
                href={this.props.link ? this.props.link.url : ''}
                title={this.props.title ? this.props.title.value : ''}
                /*target={this.props.link ? this.props.link.target : ''}*/
            >
                {level === '1' && this.props.icon ?
                    '' /*<Icon name={this.props.icon} />*/ : (null)}
                <span>{this.props.title ? this.props.title.value : ''}</span>
            </a>
        );

        if (items.length && nextLevel <= navMaxLevel) {
            return (
                <div className={classNameWrapped}>
                    <span
                        className={classNameExpander}
                        onClick={this.navTouchHandler}
                    />
                    {item}
                    <NavList
                        items={this.props.items}
                        level={nextLevel}
                        expanded={this.state.expanded}
                        isOpen={false}
                    />
                </div>
            );
        } else {
            return (
                <div className={classNameWrapped}>
                    {item}
                </div>
            );
        }
    }
}

export default NavItem;
