import React from "react";
import { useState, useEffect } from "react";

export function Home() {
	// const [isShown, setIsShown] = useState(false);
	const [variable, setVariable] = useState(null);

	const apiUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/allenstfort";

	useEffect(() => {
		fetch(apiUrl)
			.then(res => res.json())
			.then(newTodo => setVariable(newTodo))
			.catch(error => console.log(error));
	}, []);

	useEffect(() => {
		if (variable !== null) {
			fetch(apiUrl, {
				method: "PUT",
				body: JSON.stringify(variable),
				headers: {
					"Content-Type": "application/json"
				}
			});
		}
	}, [variable]);

	let todo = (variable || []).map((item, i) => {
		return (
			<li className="list-group-item" key={i}>
				{item.label}
				<button onClick={() => removeItem(i)}>X</button>
			</li>
		);
	});

	const removeItem = index => {
		console.log(index);
		const newArray = variable.filter((item, i) => i != index);
		// const newArray = variable.filter((item, i) => {
		// 	if (i != index) {
		// 		return item;
		// 	}
		// });
		setVariable(newArray);
	};

	const newTodo = onKeyDownEvent => {
		console.log(onKeyDownEvent);
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = {
				label: onKeyDownEvent.target.value,
				done: false
			};
			const newTodo = [...variable, userInput];
			setVariable(newTodo);
			onKeyDownEvent.target.value = "";
			// fetch(apiUrl, {
			// 	method: "PUT",
			// 	body: JSON.stringify(newTodo),
			// 	headers: {
			// 		"Content-Type": "application/json"
			// 	}
			// });
		}
	};

	return (
		<div className="List ">
			<h1 className="title">To Do List</h1>
			<input
				className={"input"}
				onKeyDown={newTodo}
				type="text"
				id="fname"
				placeholder="Task"
				name="fname"></input>
			<div>
				<ul className="list-group">{todo}</ul>
				<div className="footer">{todo.length} item left</div>
			</div>
		</div>
	);
}
