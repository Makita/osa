import React, { Component } from 'react';

class Services extends Component {
  render() {
    return (
      <React.Fragment>
        <div><b>We provide the following services:</b></div>
        <ul>
          <li>Air conditioning</li>
          <li>Alignments</li>
          <li>Brakes</li>
          <li>Cooling systems</li>
          <li>
            Diagnoses
            <ul>
              <li>No start</li>
              <li>Hard start</li>
              <li>No power</li>
            </ul>
          </li>
          <li>Engine services</li>
          <li>Exhaust systems</li>
          <li>Fluid exchanges</li>
          <li>Heating</li>
          <li>
            Inspections
            <ul>
              <li>Mechanical</li>
              <li>Taxi</li>
              <li>Amvic</li>
              <li>Out of Province</li>
              <li>Pre-purchase</li>
            </ul>
          </li>
          <li>Front ends</li>
          <li>Rear ends</li>
          <li>Oil change</li>
          <li>Steering</li>
          <li>Tire services</li>
          <li>
            Trailer
            <ul>
              <li>Hitch installations</li>
              <li>Wiring and repair</li>
              <li>Repack the bearings</li>
            </ul>
          </li>
          <li>Transmission services</li>
          <li>Troubleshooting / Drivability</li>
          <li>Tune-ups</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Services;
