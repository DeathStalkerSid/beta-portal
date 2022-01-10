import Router from './Router';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import { Layout } from 'antd';

const App = () => {
	const { Content } = Layout;
	return (
		<div className="App">
			<LayoutHeader />
			<Content>
				<Router />
			</Content>
			<LayoutFooter />
		</div>
	);
};

export default App;
