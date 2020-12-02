export const initialState = {
	basket: [],
	user: null,
};

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_BASKET":
			return {
				...state,
				basket: [...state.basket, action.item],
			};
		case "REMOVE_FROM_BASKET":
			const index = state.basket.findIndex((basketitem) => basketitem.id === action.id);

			let newBasket = [...state.basket];
			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				alert("Cannot remove product. Not in cart");
			}

			return {
				...state,
				basket: newBasket,
			};
		case "EMPTY_BASKET":
			return {
				...state,
				basket: [],
			};
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "SET_DRAWER":
			return {
				...state,
				drawer: action.toggle,
			};

		default:
			return state;
	}
};

export default reducer;
