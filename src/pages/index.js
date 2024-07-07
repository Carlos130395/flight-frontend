import { useState } from 'react';
import { createClient, getClient } from '../services/clientsService';
import { bookFlight, cancelBooking } from '../services/flightsService';
import { processPayment, failPayment } from '../services/paymentsService';
import styles from '../styles/Home.module.css';

export default function Home() {
  // States for client
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientResponse, setClientResponse] = useState(null);
  const [clientMessage, setClientMessage] = useState('');

  // States for flight
  const [flightId, setFlightId] = useState('');
  const [flightResponse, setFlightResponse] = useState(null);

  // States for payment
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentResponse, setPaymentResponse] = useState(null);

  // Handlers for client
  const handleCreateClient = async (e) => {
    e.preventDefault();
    const clientData = { name: clientName, email: clientEmail };
    try {
      const res = await createClient(clientData);
      setClientResponse(res);
      setClientMessage('Client created successfully!');
    } catch (error) {
      setClientMessage('Error creating client.');
    }
  };

  // Handlers for flight
  const handleBookFlight = async (e) => {
    e.preventDefault();
    const flightData = { flightId: Number(flightId) };
    const res = await bookFlight(flightData);
    setFlightResponse(res);
  };

  const handleCancelBooking = async (e) => {
    e.preventDefault();
    const flightData = { flightId: Number(flightId) };
    const res = await cancelBooking(flightData);
    setFlightResponse(res);
  };

  // Handlers for payment
  const handleProcessPayment = async (e) => {
    e.preventDefault();
    const paymentData = { paymentId: Number(paymentId), amount: Number(amount) };
    const res = await processPayment(paymentData);
    setPaymentResponse(res);
  };

  const handleFailPayment = async (e) => {
    e.preventDefault();
    const paymentData = { paymentId: Number(paymentId), reason: 'Test failure' };
    const res = await failPayment(paymentData);
    setPaymentResponse(res);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Client Management</h1>
      <form className={styles.form} onSubmit={handleCreateClient}>
        <input
          type="text"
          placeholder="Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Create Client</button>
      </form>
      {clientMessage && <p>{clientMessage}</p>}
      {clientResponse && <pre className={styles.pre}>{JSON.stringify(clientResponse, null, 2)}</pre>}

      <h1 className={styles.title}>Flight Management</h1>
      <form className={styles.form} onSubmit={handleBookFlight}>
        <input
          type="text"
          placeholder="Flight ID"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Book Flight</button>
      </form>
      <form className={styles.form} onSubmit={handleCancelBooking}>
        <input
          type="text"
          placeholder="Flight ID"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Cancel Booking</button>
      </form>
      {flightResponse && <pre className={styles.pre}>{JSON.stringify(flightResponse, null, 2)}</pre>}

      <h1 className={styles.title}>Payment Management</h1>
      <form className={styles.form} onSubmit={handleProcessPayment}>
        <input
          type="text"
          placeholder="Payment ID"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Process Payment</button>
      </form>
      <form className={styles.form} onSubmit={handleFailPayment}>
        <input
          type="text"
          placeholder="Payment ID"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Fail Payment</button>
      </form>
      {paymentResponse && <pre className={styles.pre}>{JSON.stringify(paymentResponse, null, 2)}</pre>}
    </div>
  );
}
