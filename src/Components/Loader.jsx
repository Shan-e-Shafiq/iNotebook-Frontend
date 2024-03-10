import React from 'react'

export default function Loader() {
  return (
    <div className="LoaderContainer">
      <div className=" Loader">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-warning mx-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  )
}
