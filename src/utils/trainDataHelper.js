
export const enrichTrainDataWithRoute = (trainData) => {
  // Create a basic route array with source and destination
  const route = [
    {
      station_name: trainData.source,
      arrival_time: "N/A", // Source station doesn't have arrival time
      departure_time: trainData.departure_time,
    },
    {
      station_name: trainData.destination,
      arrival_time: trainData.arrival_time,
      departure_time: "N/A", // Destination station doesn't have departure time
    }
  ];

  // Calculate approximate duration if not provided
  const duration = calculateDuration(trainData.departure_time, trainData.arrival_time);

  return {
    ...trainData,
    route,
    duration,
  };
};

const calculateDuration = (departureTime, arrivalTime) => {
  const [depHour, depMin] = departureTime.split(':').map(Number);
  const [arrHour, arrMin] = arrivalTime.split(':').map(Number);
  
  let depMinutes = depHour * 60 + depMin;
  let arrMinutes = arrHour * 60 + arrMin;
  
  // Handle next day arrival (if arrival time is less than departure time)
  if (arrMinutes < depMinutes) {
    arrMinutes += 24 * 60; // Add 24 hours
  }
  
  const totalMinutes = arrMinutes - depMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};
