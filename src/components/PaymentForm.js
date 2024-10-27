import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import styles from '../styles/Checkout.module.css';
import Image from 'next/image';

const PaymentForm = ({ nextStep, prevStep, userData }) => {
  const cars = [
    {
      id: 7,
      category: 'Sportsback',
      name: 'BMW M2',
      transmission: 'Automatic',
      passengers: 4,
      luggage: 2,
      rating: 4.8,
      price: '$60',
      image: '/bmw-m2.jpeg',
    },
    {
      id: 4,
      category: 'Sedan',
      name: 'Camry',
      transmission: 'Automatic',
      passengers: 4,
      luggage: 2,
      rating: 4.9,
      price: '$50',
      image: '/camry.jpeg'
    },

  ];
  const rentals = [
    {
      pickupLocation: 'Jl. Raya Ponorogo - Trenggalek, Bancangan',
      pickupDate: '2024-10-01T10:00:00',
      returnDate: '2024-10-10T10:00:00'
    },
  ];

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', options).replace(',', '').replace(' at', ' -'); // Format to the desired string
  };

  // Function to calculate the duration in days
  const calculateDuration = (pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const returnDateObj = new Date(returnDate);
    const duration = (returnDateObj - pickup) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return duration;
  };

  // Creating a new array with formatted dates and durations
  const rentalsWithDuration = rentals.map(rental => ({
    pickupLocation: rental.pickupLocation,
    pickupDate: formatDate(rental.pickupDate),
    returnDate: formatDate(rental.returnDate),
    duration: calculateDuration(rental.pickupDate, rental.returnDate),

  }));

  const tripPrice = cars.reduce((sum, car) => {
    // Convert the price from string to number
    const priceValue = parseFloat(car.price.replace('$', ''));
    return sum + priceValue;
  }, 0);
  const { name, email, phone } = userData;
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePaymentSuccess = (details) => {
    console.log("Payment success:", details);
    nextStep(); // Proceed to the confirmation step after payment success
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  var totalPrice = rentalsWithDuration[0].duration * tripPrice + 15 * cars.length;
  var tax = totalPrice * 0.04;
  totalPrice = totalPrice + totalPrice * 0.04;
  totalPrice = totalPrice.toFixed(2);
  return (
    <div className={styles.checkoutContainer}>
      {/* Left Column for Booking Info */}
      <div className={styles.leftColumn}>
        {/* Booking Hold Notification */}
        <div className={styles.holdNotification}>
          <img className={styles.time} src='\time.png' alt="Clock icon" />
          <div className={styles.notiText}>
            <p className={styles.bold}>Your Booking is on Hold</p>
            <p>
              We hold your booking until <span className={styles.bold}>Feb 14, 12:00 AM</span>.
              If your reservation changes, we will get back to you.
            </p>
          </div>
        </div>

        {/* Book Information Section */}
        <div className={styles.bookInfo}>
          <h3>Book Information</h3>
          <p><strong>Congratulations!</strong> We have sent your booking details to the vehicle owner.</p>
          <div>
            <p><strong>Full Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone Number:</strong> {phone}</p>
          </div>
        </div>

        <div className={styles.bookInfo}>
          <h3>Booking Information</h3>

          {/* Success Message */}
          <div className={styles.successMessage}>
            <img className={styles.check} src='\check.png' />
            <p>Congratulations! We have sent your booking details to the vehicle owner.</p>
          </div>

          {/* Booking Details in Columns */}
          <div className={styles.bookingDetails}>
            <div>
              <p><strong>Full Name</strong></p>
              <p>{name}</p>
            </div>
            <div>
              <p><strong>Email</strong></p>
              <p>{email}</p>
            </div>
            <div>
              <p><strong>Phone Number</strong></p>
              <p>{phone}</p>
            </div>
          </div>
        </div>
        <div className={styles.carsGrid}>
          {cars.map((car) => (
            <div key={car.id} className={styles.carContainer}>

              {/* Car Image and Category Tag (inside the container) */}
              <div className={styles.carCard}>
                <span className={styles.categoryTag}>{car.category}</span>
                <img src={car.image} alt={car.name} className={styles.carImage} />
              </div>

              {/* Car Details (outside the container) */}
              <div className={styles.carDetailsContainer}>
                <h3 className={styles.carTitle}>{car.name}</h3>

                {/* Transmission with Gear Icon */}
                <div className={styles.transmission}>
                  <Image
                    src="/gear.png"
                    alt="Transmission Gear Icon"
                    width={45}
                    height={45}
                    className={styles.icon}
                  />
                  <span>{car.transmission}</span>
                </div>

                <div className={styles.carDetails}>
                  <span>
                    <Image
                      src="/group.png"
                      alt="Passengers"
                      width={45}
                      height={45}
                      className={styles.icon}
                    />
                    {car.passengers}
                  </span>

                  <span>
                    <Image
                      src="/luggage.png"
                      alt="Luggage"
                      width={45}
                      height={45}
                      className={styles.icon}
                    />
                    {car.luggage}
                  </span>

                  <span>
                    <Image
                      src="/star.png"
                      alt="Rating"
                      width={45}
                      height={45}
                      className={styles.icon}
                    />
                    {car.rating}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
        {/* Cancellation Policy Section */}
        <div className={styles.cancellationPolicy}>
          <img className={styles.caution} src='\caution.png' />
          <div>
            <h3>Cancellation Policy</h3>
            <p>At DriveIO, we understand that plans can change unexpectedly. That's why we've crafted our cancellation policy to provide you with flexibility and peace of mind. When you book a car with us, you have the freedom to modify or cancel your reservation without incurring any cancellation fees up to 12 hours/days before your scheduled pick-up time.</p>
          </div>
        </div>
      </div>

      {/* Right Column for Payment and Summary */}
      <div className={styles.rightColumn}>
        {/* Summary Section */}
        <div className={styles.summary}>
          <h3>Summary</h3>
          <div className={styles.summaryDetails}>
            <div>
              <p><strong>Total Vehicles</strong></p>
              <p>{cars.length}</p>
            </div>
            <div>
              <p><strong>Pickup Location</strong></p>
              <p>{rentalsWithDuration[0].pickupLocation}</p>
            </div>
            <div>
              <p><strong>Pickup Date</strong></p>
              <p>{rentalsWithDuration[0].pickupDate}</p>
            </div>
            <div>
              <p><strong>Return Date</strong></p>
              <p>{rentalsWithDuration[0].returnDate}</p>
            </div>
          </div>
          <h3>Price Details</h3>
          <div className={styles.priceDetails}>
            <div>
              <p><strong>Trip Price</strong></p>
              <p>$ {tripPrice}/day</p>
            </div>
            <div>
              <p><strong>Delivery Fee</strong></p>
              <p>$ {15 * cars.length}</p>
            </div>
            <div>
              <p><strong>Duration</strong></p>
              <p>{rentalsWithDuration[0].duration} days</p>
            </div>
            <div>
              <p><strong>Tax</strong></p>
              <p>$ {tax.toFixed(2)}</p>
            </div>
          </div>
          <div className={styles.total}>
            <p><strong>Total</strong></p>
            <p><img className={styles.tag} src='\tag.png' /> $  {totalPrice}</p>
          </div>
        </div>

        {/* Payment Details Section with PayPal */}
        <div className={styles.paymentDetail}>
          <h3>Payment Detail</h3>
          <p>Please complete your payment using PayPal.</p>

          {/* Terms and Conditions Checkbox */}
          <div className={styles.termsCheckbox}>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={handleTermsChange}
            />
            <label className={styles.tc} htmlFor="terms">
              By clicking this, I agree to DriveIO <a className={styles.blue}>Terms & Conditions</a> and <a className={styles.blue}>Privacy Policy</a>
            </label>
          </div>

          <PayPalScriptProvider options={{ "client-id": "Abrd8YZVQR652MGnjXfmStyBGHCJwrX8JG5XY-BVXq1ps0WuGuZftLeVftF-Lp3DEireg53qF6Vv5npR" }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: { value: { totalPrice } }
                  }]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(handlePaymentSuccess);
              }}
              disabled={!termsAccepted} // Disable PayPal button if terms are not accepted
            />
          </PayPalScriptProvider>
        </div>
      </div>
      {/* Testing button */}
      {/* <button
        className={styles.nextStepButton}
        onClick={nextStep}
      >
        Proceed to Next Step without Payment
      </button> */}
    </div>
  );
};

export default PaymentForm;
