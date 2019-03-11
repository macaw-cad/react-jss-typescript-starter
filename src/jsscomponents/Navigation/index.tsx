import * as React from 'react';
import NavItem from './NavItem';
import NavigationItem from '../../types/macaw/features/NavigationItem';

interface INavListProps {
    items?: NavigationItem[];
    level: number;
    expanded: boolean;
    isOpen: boolean;
}

class Navigation extends React.Component {
    render() {
        return (
            <nav className='o-nav'>
                <ul id="menu">
                    <li><a href="#">Products</a>
                        <div id="mega">
                            <ul>
                                <li><a href="#">Computers</a></li>
                                <li><a href="#">Windows Desktop Computers</a></li>
                                <li><a href="#">iMacs</a></li>
                                <li><a href="#">Laptops &amp; Macbooks</a></li>
                                <li><a href="#">Monitors</a></li>
                                <li><a href="#">Software &amp; Accessories</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Home Theatre</a></li>
                                <li><a href="#">Plasma TVs</a></li>
                                <li><a href="#">LCD TVs</a></li>
                                <li><a href="#">LED TVs</a></li>
                                <li><a href="#">Portable TVs</a></li>
                                <li><a href="#">Accessories</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Home Appliances</a></li>
                                <li><a href="#">Vacuum Cleaners</a></li>
                                <li><a href="#">Kitchenware</a></li>
                                <li><a href="#">Lighting</a></li>
                                <li><a href="#">Air Conditioners</a></li>
                                <li><a href="#">Chamberpots</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Entertainment</a></li>
                                <li><a href="#">Movies</a></li>
                                <li><a href="#">DVD &amp; Blu-Ray Players</a></li>
                                <li><a href="#">CDs</a></li>
                                <li><a href="#">Home Stereos</a></li>
                                <li><a href="#">Etch-A-Sketches</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Home Furnishings</a></li>
                                <li><a href="#">Sofas &amp; Love Seats</a></li>
                                <li><a href="#">Reclining Chairs</a></li>
                                <li><a href="#">Lamps &am; Tables</a></li>
                                <li><a href="#">Dressers &amp; Armoires</a></li>
                                <li><a href="#">Flooring</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Office Furnishings</a></li>
                                <li><a href="#">Workspaces</a></li>
                                <li><a href="#">Tables</a></li>
                                <li><a href="#">Chairs</a></li>
                                <li><a href="#">Shelving &amp; Storage</a></li>
                                <li><a href="#">Lighting</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">Clothing</a></li>
                                <li><a href="#">Women's Fashions</a></li>
                                <li><a href="#">Men's Wear</a></li>
                                <li><a href="#">Children's Wear</a></li>
                                <li><a href="#">Footwear</a></li>
                                <li><a href="#">Hats-A-Plenty!</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">The Avengers</a></li>
                                <li><a href="#">Tony "Iron Man" Stark</a></li>
                                <li><a href="#">Bruce "Hulk" Banner</a></li>
                                <li><a href="#">Steve Rogers (Captain America)</a></li>
                                <li><a href="#">Natasha Romanoff (Black Widow)</a></li>
                                <li><a href="#">Hawkeye, I guess</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#">Locations</a></li>
                    <li><a href="#">Our Team</a></li>
                    <li><a href="#">Testimonials</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">News &amp; Events</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>

            </nav>
        );
    }
};

export default Navigation;
