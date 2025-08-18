import ACTION_TYPES from '../actions/actionsTypes';

const initialState = '';

export default function editContactReducer (
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ACTION_TYPES.CHANGE_OPERATION_MODE_TO_ADDITION:
      return '';

    case ACTION_TYPES.CHOICE_TO_EDIT:
      return payload;

    case ACTION_TYPES.DELETE_CONTACT:
      return state === payload ? '' : state;

    default:
      return state;
  }
}
