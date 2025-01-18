import React, { useState } from 'react';
import carData from './cars.json'; // Import the JSON file
import './App.css';

const App = () => {
  const carsPerPage = 20; // Number of cars to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for the cars to be displayed
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = carData.slice(startIndex, endIndex);

  // Total pages calculation
  const totalPages = Math.ceil(carData.length / carsPerPage);

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Car Listings</h1>
      <div className="car-container">
        {currentCars.map((car, index) => (
          <div key={index} className="car-card">
            <img
              src={car.imageUrl}
              alt={car.series}
              onError={(e) => (e.target.src = '/placeholder.jpg')} // Fallback if image fails to load
            />
            <div className="car-details">
              <h2>{car.series}</h2>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Mileage:</strong> {car.mileage}</p>
              <p><strong>Price:</strong> {car.price}</p>
              {/*
              <a href={car.link} target="_blank" rel="noopener noreferrer">
                View Details
              </a>
              */}
             
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
