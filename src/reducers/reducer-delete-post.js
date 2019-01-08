import { AT_POSTS } from '../actions/action-types';

export default function reducerDeletePost(state = null, action) {
  switch (action.type) {
    case AT_POSTS.DELETE:
      return action.payload;
  }
  return state;
}
