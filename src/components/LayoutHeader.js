import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import logo from '../logo.jpg';

import classes from './Layout.module.css';

const LayoutHeader = () => {
	let activeItem = '';

	return <Header>
		<Link to={ '/' }>
			<img className={ classes.logo } src={ logo } alt={ 'Logo' } />
		</Link>
		<Menu theme="dark" mode="horizontal" selectedKeys={ [activeItem] } style={ { justifyContent: 'end' } }>
			
		</Menu>
	</Header>;

};

export default LayoutHeader;