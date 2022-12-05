import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//초기데이터를 state에 저장했다가
//추후 action객체가 전달되면
//action객체의 타입에 따라 기존 데이터를 변경해서 리턴
const init : object[] = [];
const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["headerReducer"]
  // blacklist -> 그것만 제외합니다
};

interface Action {
	type: String,
	payload: object[]
}


const headerReducer = (state=init, action:Action) => {
	switch (action.type) {
		case 'SET_HEADER':
			return { ...state, header: action.payload };

		default:
			return state;
	}
};

//전달된 각각의 reducer를 하나도 합쳐서 반환
const reducers = combineReducers({
	headerReducer,
});

export default persistReducer(persistConfig, reducers);