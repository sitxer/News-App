import React, {Component} from 'react';
import styled from 'styled-components'

import axios from 'axios';

import Article from './components/article';

const AppContainer = styled.section`
	display: flex;
	flex-direction: column;
	padding: 30px;
	background-color: #002F2F;
	min-height: 100vh;
`;
const SearchInput = styled.input`
	border: 2px solid #A7A37E;
	border-radius: 5px;
	font-size: 14px;
	padding: 10px;
`;

class App extends Component {
	state = {
		persons: [],
		filterString: ''
	};

	componentDidMount() {
		axios.get(`https://jsonplaceholder.typicode.com/posts`)
			.then(res => {
				const persons = res.data;
				this.setState({persons});
			})
	};

	handelInput = () => {
		this.setState({
			filterString: this.search.value
		});
	};

	render() {
		let filtered = this.state.persons.filter(item => item.title.includes(this.state.filterString));
		return (
			<AppContainer>
				<SearchInput
					type="text"
					onChange={this.handelInput}
					ref={input => this.search = input}
				/>
				{
					filtered.length > 0 ?
						filtered.slice(0, 10).map(person => <Article articleData={person}/>)
						:
						<h3>Новостей нет</h3>
				}
			</AppContainer>
		);
	}
}

export default App;
