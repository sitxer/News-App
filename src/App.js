import React, {Component} from 'react';
import styled from 'styled-components';
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
const WithoutNews = styled.h2`
	text-align: center;
	color: #A7A37E;
`;
class App extends Component {
	// Компонента запрашивает с сервера json вида [{ "userId": 1 - целое число, "id": 1 целое число,"title": "text" - строка,"body": "text" - строка},...] далее к каждому элементу добавляется флаг readed: false отвечающий за сокрытие прочитанных новостей.
	state = {
		persons: [],
		filterString: ''
	};

	componentDidMount() {
		axios.get(`https://jsonplaceholder.typicode.com/posts`)
			.then(res => {
				const data = res.data;
				const persons = [];
				data.map(item => {
					item.readed = false;
					persons.push(item)
				});
				this.setState({persons})
			});
	};

	handelInput = () => {
		// отвечает за добавление в стейт строки из инпута
		this.setState({
			filterString: this.search.value
		});
	};

	toggleVisible = (id) => {
		// омтечает новость прочитанной путем изменения стостояния readed на true
		// id новости  в state которая будет отмечена прочитанной - целое число
		const persons = [...this.state.persons];
		persons[id - 1] = {...persons[id - 1], readed: true};
		this.setState({persons});
	};

	render() {
		let filtered = this.state.persons.filter(item => item.title.includes(this.state.filterString) && !item.readed); // фильтруем новости по названию и по статусу прочитанны они или нет
		return (
			<AppContainer>
				<SearchInput
					type="text"
					onChange={this.handelInput}
					ref={input => this.search = input}
				/>
				{
					filtered.length > 0 ?
						filtered.slice(0, 10).map((person, id) =>
							<Article key={id.toString}
									 toggleVisibleFunc={this.toggleVisible}
									 articleData={person}/>)
						:
						<WithoutNews>Новостей нет</WithoutNews>
				}
			</AppContainer>
		);
	}
}

export default App;