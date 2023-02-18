import React from 'react';
import {
  addGoalActionCreator,
  deleteGoalActionCreator,
} from '../state/goals/action';
import { useSelector, useDispatch } from 'react-redux';
import GoalInput from './GoalInput';
import GoalItem from './GoalItem';

function GoalsList() {
  const goals = useSelector((state) => state.goals); // TODO: Get goals from store;
  const dispatch = useDispatch();

  function onAddGoal(text) {
    const id = `goal-${new Date()}`;
    dispatch(addGoalActionCreator({
      id,
      text,
    }))
  }

  function onDeleteGoal(id) {
    dispatch(
      deleteGoalActionCreator(id)
    )
  }

  return (
    <div>
      <h3>My Goals</h3>
      <GoalInput addGoal={onAddGoal} />

      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <GoalItem {...goal} deleteGoal={onDeleteGoal} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GoalsList;
