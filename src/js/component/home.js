import React from "react";
import { useState, useEffect } from "react";

export function Home() {
	// const [isShown, setIsShown] = useState(false);
	const [variable, setVariable] = useState([]);

	const apiUrl =
		"https://3245-black-nightingale-9dkcwj6b.ws-us14.gitpod.io/todos";

	useEffect(async () => {
		const res = await fetch(apiUrl);
		const data = await res.json();
		setVariable(data);
	}, []);

	const addingTodo = async todo => {
		try {
			const res = await fetch(apiUrl, {
				method: "POST",
				body: JSON.stringify(todo),
				header: {
					"Content-Type": "application/json"
				}
			});
			const data = await res.json();
			setVariable(data);
		} catch (error) {
			console.log(error);
		}
	};

	let todo = (variable || []).map((item, i) => {
		return (
			<li className="list-group-item" key={i}>
				{item.label}
				<button onClick={() => deleteTodo(i)}>X</button>
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
		deleteTodo(newArray);
	};

	const deleteTodo = async postiton => {
		try {
			const res = await fetch(`${apiUrl}/${postiton}`, {
				method: "DELETE"
			});
			const data = await res.json();
			setVariable(data);
		} catch (error) {
			console.log(error);
		}
	};

	const newTodo = onKeyDownEvent => {
		console.log(onKeyDownEvent);
		if (onKeyDownEvent.keyCode === 13) {
			let userInput = {
				label: onKeyDownEvent.target.value,
				done: false
			};
			addingTodo(userInput);
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
		<>
			<h1 className="text-center text-success mt-4 ">To Do List</h1>
			<div className="List col-4  mx-auto list-group mt-4">
				<input
					className="col-12 p-3 font-weight-bold text-center"
					onKeyDown={newTodo}
					type="text"
					id="fname"
					placeholder="Enter A Task"
					name="fname"
				/>
				<ul className="col-12 p-0">
					{todo}
					<span className="footer list-group-item text-danger">
						{todo.length} item left
					</span>
				</ul>
			</div>
			{/* <div className="App">
				<button
					onMouseEnter={() => setIsShown(true)}
					onMouseLeave={() => setIsShown(false)}>
					Hover over me!
				</button>
				{isShown && (
					<div>I&apos;ll appear when you hover over the button.</div>
				)}
			</div> */}
		</>
	);
}
