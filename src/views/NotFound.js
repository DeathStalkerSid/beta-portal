import { Typography } from "antd";

const NotFound = () => {
	const { Title } = Typography;
	return <Title>
		<span style={ { color: "red" } }>404</span> Page Not Found!
	</Title>;
};

export default NotFound;