import React, { Component } from "react";
import Traincard from "../TrainCard/TrainCard";
import trainData from '../../trainData.json'
class TrainList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: [],
      isLoading: true,
      error: null,
    };
  }

  // ComponentDidMount: Lifecycle method that runs after the component is mounted
  componentDidMount() {
    // Simulate an API call to fetch train data
    fetch("http://localhost:3000/traincard")
      .then((response) => response.json())
      .then((data) => this.setState({ trains: data, isLoading: false }))
      .catch((error) => this.setState({ error, isLoading: false }))
      .finally(()=>this.setState({ trains: trainData, isLoading: false, error: null }));
  }

  // ComponentWillUnmount: Cleanup logic before the component is removed from the DOM
  componentWillUnmount() {
    console.log("TrainList component will unmount");
    // Cleanup if necessary (e.g., clearing intervals, aborting API requests)
  }

  render() {
    const { trains, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading trains...</div>;
    }

    if (error) {
      return <div>Error fetching trains: {error.message}</div>;
    }

    return (
      <div>
        {trains.map((train) => (
          <Traincard key={train.id} train={train} />
        ))}
      </div>
    );
  }
}

export default TrainList;