import React, {Component} from 'react';
import styled from 'styled-components'

const ArticleWrapper = styled.article`
	background-color: #046380;
	margin-top: 15px;
	padding: 15px;
	border-radius: 5px;
	color: #E6E2AF;
	h3 {
		margin: 0;
	}
`;
const Button = styled.button`
	background-color:#002F2F;
	border: none;
	border-radius: 5px;
	font-size: 14px;
	color: #E6E2AF;
	padding: 5px;
	cursor: pointer;
`;

class Article extends Component {
	render() {
		return (
			<ArticleWrapper>
				<h3>{this.props.articleData.title}</h3>
				<p>{this.props.articleData.body}</p>
				<Button
					onClick={
						() => this.props.toggleVisibleFunc(this.props.articleData.id) // при кликле передаем id этой новости, чтоб скрыть именно это
					}
				>
					Прочитал
				</Button>
			</ArticleWrapper>
		)
	}
}

export default Article;