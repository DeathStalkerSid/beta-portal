import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import { Content } from 'antd/es/layout/layout';
import Router from './Router';

const App = () => {
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
