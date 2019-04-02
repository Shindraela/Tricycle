export const GET_HOURS = 'TricycleProject/horaires/LOAD';
export const GET_HOURS_SUCCESS = 'TricycleProject/horaires/LOAD_SUCCESS';
export const GET_HOURS_FAIL = 'TricycleProject/horaires/LOAD_FAIL';
export const GET_CATEGORIES = 'TricycleProject/categories/LOAD';
export const GET_CATEGORIES_SUCCESS = 'TricycleProject/categories/LOAD_SUCCESS';
export const GET_CATEGORIES_FAIL = 'TricycleProject/categories/LOAD_FAIL';
export const GET_TIPS = 'TricycleProject/astuces/LOAD';
export const GET_TIPS_SUCCESS = 'TricycleProject/astuces/LOAD_SUCCESS';
export const GET_TIPS_FAIL = 'TricycleProject/astuces/LOAD_FAIL';
export const GET_CHALLENGES = 'TricycleProject/missions/LOAD';
export const GET_CHALLENGES_SUCCESS = 'TricycleProject/missions/LOAD_SUCCESS';
export const GET_CHALLENGES_FAIL = 'TricycleProject/missions/LOAD_FAIL';

export default function reducer(state = { hours: [], categories: [], tips: [], challenges: [] }, action) {
	switch (action.type) {
		case GET_HOURS:
			return { ...state, loading: true };
		case GET_HOURS_SUCCESS:
			return { ...state, loading: false, hours: action.payload.data };
		case GET_HOURS_FAIL:
			return {
				...state,
				loading: false,
				error: 'Error while fetching hours'
			};
		case GET_CATEGORIES:
			return { ...state, loading: true };
		case GET_CATEGORIES_SUCCESS:
			return { ...state, loading: false, categories: action.payload.data };
		case GET_CATEGORIES_FAIL:
			return {
				...state,
				loading: false,
				error: 'Error while fetching categories'
			};
		case GET_TIPS:
			return { ...state, loading: true };
		case GET_TIPS_SUCCESS:
			return { ...state, loading: false, tips: action.payload.data };
		case GET_TIPS_FAIL:
			return {
				...state,
				loading: false,
				error: 'Error while fetching tips'
			};
		case GET_CHALLENGES:
			return { ...state, loading: true };
		case GET_CHALLENGES_SUCCESS:
			return { ...state, loading: false, challenges: action.payload.data };
		case GET_CHALLENGES_FAIL:
			return {
				...state,
				loading: false,
				error: 'Error while fetching challenges'
			};
		default:
			return state;
	}
}

export function listHours() {
	return {
		type: GET_HOURS,
		payload: {
			request: {
				// url: `/users/${param}/repos`
				url: `/horaires`
			}
		}
	};
}

export function listCategories() {
	return {
		type: GET_CATEGORIES,
		payload: {
			request: {
				url: `/categories`
			}
		}
	};
}

export function listTips() {
	return {
		type: GET_TIPS,
		payload: {
			request: {
				url: `/astuces`
			}
		}
	};
}

export function listChallenges() {
	return {
		type: GET_CHALLENGES,
		payload: {
			request: {
				url: `/missions`
			}
		}
	};
}
