import { Component } from "react";

class ClassBasedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.initialCount || 0,
    };
  }

 increment = () => {
    this.setState((prevState) => ({count: prevState.count + 1}))
  };
  
  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    let count = this.state.count;
    return (
      <>
        <h1>I am class based component</h1>
        <div>{count}</div>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </>
    );
  }
}

export default ClassBasedComponent;
