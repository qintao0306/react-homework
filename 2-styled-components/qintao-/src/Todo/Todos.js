import React, { Component } from 'react';
import Header from  './Header.js';
import Section from './Section.js';
import Footer from './Footer.js';
import injectGlobal from './InjectGlobal.js';



class CounterContainer extends Component {
	constructor(props) {
		super(props);
		this.todolist 	= [];
		this.completed 	= false;
		this.display	= false;
		this.state = {
			things: [],
		};
	}

	keyup = (e) => {
		
		if (e.keyCode === 13) {
			const todo = e.target.value;
			e.target.value = "";
			if (todo) {
				let task = {
					task: todo,
					done: false,
				}
				this.todolist.push(task)
				this.setState({
					things: this.state.things.concat(task)
				});
			}
		}
	}
	done = (todoTask) => {
		for (let thing of this.state.things) {
			if (thing.task === todoTask) {
				thing.done = !thing.done;
				this.completed = !this.completed;
				this.display = !this.display;
				break;
			}
		}
		this.setState({
			things: this.state.things
		});
	}

	delete = (task) => {
		this.todolist = this.todolist.filter(thing => thing.task !== task)
		this.setState({
			things: this.state.things.filter(thing => thing.task !== task)
		});
	}

	surplus = () => {
		this.setState({
			things: this.todolist.filter(thing => !thing.done)
		})

	}

	over = () => {
		this.setState({
			things: this.todolist.filter(thing => thing.done)
		})

	}

	all = () => {
		this.setState({
			things: this.todolist
		})
	}

	clear = () => {
		this.todolist = [];
		this.setState({
			things: []
		})
	}
	checkAll = (e) => {
		let checked = e.target.checked;
		for (let thing of this.state.things) {
			if(checked){
				thing.done = true
				this.display = true;
			}else{

				thing.done = !thing.done
				this.display = false;
			}
					

		}
		this.setState({
			things: this.state.things
		});

	}

	render() {
		return (
			<div>
				<Header
					keyup={this.keyup}
				/>
				<Section
					completed={this.completed}
					checkAll={this.checkAll}
					things={this.state.things}
					done={this.done}
					delete={this.delete}
					todos={this.todos}
				/>
				<Footer
					display={this.display}
					things={this.state.things}
					surplus={this.surplus}
					over={this.over}
					clear={this.clear}
					all={this.all}
				/>
			</div>
		)
	}
}

export default CounterContainer;