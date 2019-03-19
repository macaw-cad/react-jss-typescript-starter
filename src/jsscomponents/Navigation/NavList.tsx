import * as React from 'react';
import NavItem from './NavItem';
import NavigationItem from '../../types/macaw/features/NavigationItem';

interface INavListProps {
    items?: NavigationItem[];
    level: number;
    expanded: boolean;
    isOpen: boolean;
}

const NavList: React.SFC<INavListProps> = (props) => {

    const items = props.items || [];
    const level = props.level || 1;

    const className = `m-navigation-list-level${level}`
        .concat(props.isOpen ? ' is-open' : '')
        .concat(props.expanded ? ' is-expanded' : '');

    return (
        <div className={className}>
            {items ?
                items.map((item, index) => (
                    <NavItem key={index} {...item} />
                )) : (null)}
        </div>
    );
};

export default NavList;
