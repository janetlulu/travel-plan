import { connect } from 'react-redux';
import { actionAddTodo } from '../userActions'; // action/index.js  export的actionAddTodo
import TodoForm from '../components/TodoForm';

function mapStateToProps() {
  //專門接props的函式
  return {};
}

function mapDispatchToProps(dispatch) {
  //專門發事件的函式
  return {
    addTodo(text) {
      dispatch(actionAddTodo(text));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
