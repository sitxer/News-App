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
	state = {
		persons: [], // список новостей
		filterString: '' // строка из input
	};

	componentDidMount() {
		axios.get(`https://jsonplaceholder.typicode.com/posts`)
			.then(res => {
				const data = res.data; // получаем данные из Json
				const persons = [];
				data.map(item => {
					item.readed = false; // перебераем полученный массив и каждому объекту добавляем readed: false
					persons.push(item) // добавляем этот объект в созданный выше массив
				});
				this.setState({persons}) // отправляем массив в state
			});
	};

	handelInput = () => {
		this.setState({
			filterString: this.search.value // отправляем полученную из input строку в state
		});
	};

	toggleVisible = (id) => { // id получен из новости
		const persons = [...this.state.persons];
		persons[id - 1] = {...persons[id - 1], readed: true}; // 'id - 1' вычисляем позицию новости в обзем массиве
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
					filtered.length > 0 ? // проверяем длинну отфильтрованных новостей
						filtered.slice(0, 10).map((person, id) => //выводим первые 10 элементов из отфильтрованных
							<Article key={id.toString}
									 toggleVisibleFunc={this.toggleVisible}
									 articleData={person}/>)
						:
						<WithoutNews>Новостей нет</WithoutNews> // показываем если отфильтрованных новостей нет
				}
			</AppContainer>
		);
	}
}

export default App;
