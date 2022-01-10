import { Layout } from "antd";

const { Footer } = Layout;

const LayoutFooter = () => {
	return <Footer style={ { textAlign: 'center', position: 'sticky', 'bottom': 0 } }>Created By &copy; Ajackus</Footer>
};

export default LayoutFooter;