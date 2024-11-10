import React, { useEffect, useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import styles from '../styles/Checkout.module.css';
import Image from 'next/image';

const PaymentForm = ({ nextStep, prevStep, userData, carFormData }) => {
  const [cars, setCars] = useState([]); // State to hold car details
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price
  const [isPriceCalculated, setIsPriceCalculated] = useState(false); // Flag to track price calculation

  const rentals = [
    {
      pickupLocation: carFormData.returnLocation,
      pickupDate: `${carFormData.pickUpDate}T${carFormData.pickUpTime}`,
      returnDate: `${carFormData.returnDate}T${carFormData.returnTime}`,
    },
  ];

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const regNum = carFormData.reg_num;
        const response = await fetch(`/api/getCar?reg_num=${regNum}`);
        const carData = await response.json();
        setCars([carData]);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    if (carFormData.reg_num && cars.length === 0) {
      fetchCarDetails();
    }
  }, [carFormData.reg_num, cars.length]);

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', options).replace(',', '').replace(' at', ' -');
  };

  const calculateDuration = (pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const returnDateObj = new Date(returnDate);
    return Math.floor((returnDateObj - pickup) / (1000 * 60 * 60 * 24)); // Duration in days
  };

  const rentalsWithDuration = rentals.map(rental => ({
    pickupLocation: rental.pickupLocation,
    pickupDate: formatDate(rental.pickupDate),
    returnDate: formatDate(rental.returnDate),
    duration: calculateDuration(rental.pickupDate, rental.returnDate),
  }));

  const tripPrice = cars[0] ? cars[0].price : 0;
  const { name, email, phone } = userData;

  const handlePaymentSuccess = (details) => {
    console.log("Payment success:", details);
    nextStep();
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  // Calculate total price and set it to the state
  useEffect(() => {
    if (rentalsWithDuration.length > 0 && cars.length > 0) {
      let price = (rentalsWithDuration[0].duration * tripPrice) + (15 * cars.length);
      const tax = price * 0.04;
      price = (price + tax).toFixed(2);
      setTotalPrice(price);
      setIsPriceCalculated(true); // Set the flag to true after the price is calculated
    }
  }, [rentalsWithDuration, cars, tripPrice]);

  const pickupDate = new Date(`${carFormData.pickUpDate}T${carFormData.pickUpTime}`);
  pickupDate.setHours(pickupDate.getHours() + 12); // Add 12 hours to pickup time for hold duration
  const holdUntilDate = pickupDate.toLocaleString('en-GB', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).replace(',', '').replace(' at', ' -');

  return (
    <div className={styles.checkoutContainer}>
      {/* Left Column for Booking Info */}
      <div className={styles.leftColumn}>
        <div className={styles.holdNotification}>
          <img className={styles.time} src='/time.png' alt="Clock icon" />
          <div className={styles.notiText}>
            <p className={styles.bold}>Your Booking is on Hold</p>
            <p>We hold your booking until <span className={styles.bold}>{holdUntilDate}</span>. If your reservation changes, we will get back to you.</p>
          </div>
        </div>

        <div className={styles.bookInfo}>
          <h3>Booking Information</h3>
          <div className={styles.successMessage}>
            <img className={styles.check} src='/check.png' alt="Success checkmark" />
            <p>Congratulations! We have sent your booking details to the vehicle owner.</p>
          </div>

          <div className={styles.bookingDetails}>
            <div><p><strong>Full Name</strong></p><p>{name}</p></div>
            <div><p><strong>Email</strong></p><p>{email}</p></div>
            <div><p><strong>Phone Number</strong></p><p>{phone}</p></div>
          </div>
        </div>

        <div className={styles.carsGrid}>
          {cars.map((car) => (
            <div key={car.id} className={styles.carContainer}>
              <div className={styles.carCard}>
                <span className={styles.categoryTag}>{car.category}</span>
                <img src={car.image} alt={car.name} className={styles.carImage} />
              </div>

              <div className={styles.carDetailsContainer}>
                <h3 className={styles.carTitle}>{car.name}</h3>
                <div className={styles.transmission}>
                  <Image src="/gear.png" alt="Transmission Gear Icon" width={45} height={45} className={styles.icon} />
                  <span>{car.transmission}</span>
                </div>
                <div className={styles.carDetails}>
                  <span><Image src="/group.png" alt="Passengers" width={45} height={45} className={styles.icon} />{car.passengers}</span>
                  <span><Image src="/luggage.png" alt="Luggage" width={45} height={45} className={styles.icon} />{car.luggage}</span>
                  <span><Image src="/star.png" alt="Rating" width={45} height={45} className={styles.icon} />{car.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cancellationPolicy}>
          <img className={styles.caution} src='/caution.png' alt="Caution icon" />
          <div>
            <h3>Cancellation Policy</h3>
            <p>At DriveIO, we understand that plans can change unexpectedly. Modify or cancel your reservation without fees up to 12 hours/days before pick-up.</p>
          </div>
        </div>
      </div>

      {/* Right Column for Payment and Summary */}
      <div className={styles.rightColumn}>
        <div className={styles.summary}>
          <h3>Summary</h3>
          <div className={styles.summaryDetails}>
            <div><p><strong>Total Vehicles</strong></p><p>{cars.length}</p></div>
            <div><p><strong>Pickup Location</strong></p><p>{rentalsWithDuration[0].pickupLocation}</p></div>
            <div><p><strong>Pickup Date</strong></p><p>{rentalsWithDuration[0].pickupDate}</p></div>
            <div><p><strong>Return Date</strong></p><p>{rentalsWithDuration[0].returnDate}</p></div>
          </div>
          <h3>Price Details</h3>
          <div className={styles.priceDetails}>
            <div><p><strong>Trip Price</strong></p><p>$ {tripPrice}/day</p></div>
            <div><p><strong>Delivery Fee</strong></p><p>$ {15 * cars.length}</p></div>
            <div><p><strong>Duration</strong></p><p>{rentalsWithDuration[0].duration} days</p></div>
            <div><p><strong>Tax</strong></p><p>$ {parseFloat(totalPrice * 0.04).toFixed(2)}</p></div>
          </div>
          <div className={styles.total}>
            <p><strong>Total</strong></p>
            <p><img className={styles.tag} src='/tag.png' alt="Tag icon" /> $ {totalPrice}</p>
          </div>
        </div>

        <div className={styles.paymentDetail}>
          <h3>Payment Detail</h3>
          <p>Please complete your payment using PayPal.</p>

          <div className={styles.termsCheckbox}>
            <input type="checkbox" id="terms" checked={termsAccepted} onChange={handleTermsChange} />
            <label className={styles.tc} htmlFor="terms">
              I agree to DriveIO <a className={styles.blue} href="#">Terms and Conditions</a> and <a className={styles.blue} href="#">Privacy Policy</a>.
            </label>
          </div>

          {/* Only render PayPal button when the price has been calculated */}
          {isPriceCalculated && (
            <PayPalScriptProvider options={{ "client-id": "Abrd8YZVQR652MGnjXfmStyBGHCJwrX8JG5XY-BVXq1ps0WuGuZftLeVftF-Lp3DEireg53qF6Vv5npR" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: { value: totalPrice } // Ensure amount is in string format
                    }]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(handlePaymentSuccess);
                }}
                disabled={!termsAccepted}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
