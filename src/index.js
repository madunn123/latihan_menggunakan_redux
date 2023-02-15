import { createStore } from './redux';

function addTodoActionCreator({ id, text }) {
  return {
    type: 'ADD_TODO',
    payload: {
      id,
      text,
      complete: false,
    },
  };
}

function deleteTodoActionCreator(id) {
  return {
    type: 'DELETE_TODO',
    payload: {
      id,
    },
  };
}

function toggleTodoActionCreator(id) {
  return {
    type: 'TOGGLE_TODO',
    payload: {
      id,
    },
  };
}

function addGoalActionCreator({ id, text }) {
  return {
    type: 'ADD_GOAL',
    payload: {
      id,
      text,
    },
  };
}

function deleteGoalActionCreator(id) {
  return {
    type: 'DELETE_GOAL',
    payload: {
      id,
    },
  };
}

function goalsReducer(goals = [], action = {}) {
  if (action.type === 'ADD_GOAL') {
    return [...goals, action.payload];
  }

  if (action.type === 'DELETE_GOAL') {
    return goals.filter((goal) => goal.id !== action.payload.id);
  }

  return goals;
}

function todosReducer(todos = [], action = {}) {
  if (action.type === 'ADD_TODO') {
    return [...todos, action.payload];
  }

  if (action.type === 'DELETE_TODO') {
    return todos.filter((todo) => todo.id !== action.payload.id);
  }

  if (action.type === 'TOGGLE_TODO') {
    return todos.map((todo) => {
      if (todo.id === action.payload.id) {
        return { ...todo, complete: !todo.complete };
      }

      return todo;
    });
  }

  return todos;
}

function rootReducer(state = [], action = {}) {
  return {
    todos: todosReducer(state.todos, action),
    goals: goalsReducer(state.goals, action),
  };
}

// consume
const store = createStore(rootReducer);

store.subcribe(() => {
  console.log('state changed!', store.getState());
});

// menambahkan new data todo
store.dispatch(
  addTodoActionCreator({
    id: 1,
    text: 'ini adalah todo pertama',
  })
);

store.dispatch(
  addTodoActionCreator({
    id: 2,
    text: 'ini adalah todo kedua',
  })
);

store.dispatch(
  addTodoActionCreator({
    id: 3,
    text: 'ini adalah todo kedua',
  })
);

// menambahkan new data goals
store.dispatch(
  addGoalActionCreator({
    id: 1,
    text: 'ini adalah goals pertama',
  })
);

store.dispatch(
  addGoalActionCreator({
    id: 2,
    text: 'ini adalah goals kedua',
  })
);

store.dispatch(
  addGoalActionCreator({
    id: 3,
    text: 'ini adalah goals kedua',
  })
);

// menghapus data todo
store.dispatch(deleteTodoActionCreator(1));
store.dispatch(toggleTodoActionCreator(2));

// menghapus data goals
store.dispatch(deleteGoalActionCreator(1));
