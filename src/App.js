import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import React, { useState } from "react";

function App() {
	const [cart, setCart] = useState([]);
	function addToCart(book) {
		setCart([...cart, { ...book, quantity: 1 }]);
	}

	function changeQuantity(book, quantity) {
		setCart(
			cart.map((item) => {
				return item.id === book.id
					? {
							...item,
							quantity: +quantity,
					  }
					: item;
			})
		);
	}

	function removeItem(item) {
		setCart(cart.filter((book) => book.id !== item.id));
	}

	function numberOfItems() {
		let counter = 0;
		cart.forEach((item) => {
			counter += item.quantity;
		});
		return counter;
	}

	return (
		<Router>
			<div className="App">
				<Nav numberOfItems={numberOfItems()} />
				<Route path="/" exact component={Home} />
				<Route path="/books" exact render={() => <Books books={books} />}></Route>
				<Route path="/books/:id" render={() => <BookInfo books={books} addToCart={addToCart} cart={cart} />} />
				<Route path="/cart" render={() => <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />}></Route>

				<Footer />
			</div>
		</Router>
	);
}

export default App;

// const dupeItem = cart.find((item) => +item.id === +book.id);
// if (dupeItem) {
// 	setCart(
// 		cart.map((item) => {
// 			if (item.id === dupeItem.id) {
// 				return {
// 					...item,
// 					quantity: item.quantity + 1,
// 				};
// 			} else {
// 				return item;
// 			}
// 		})
// 	);
// } else {
// 	setCart([...cart, { ...book, quantity: 1 }]);
// }
