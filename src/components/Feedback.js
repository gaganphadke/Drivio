import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Feedback.module.css';

import goodImg from '../assets/good.png';
import badImg from '../assets/bad.png';
import neutralImg from '../assets/neutral.png';
import vGoodImg from '../assets/v_good.png';
import vBadImg from '../assets/v_bad.png';

const Feedback = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const emojis = [
    { label: 'Very Bad', image: vBadImg, rating: 1 },
    { label: 'Bad', image: badImg, rating: 2 },
    { label: 'Neutral', image: neutralImg, rating: 3 },
    { label: 'Good', image: goodImg, rating: 4 },
    { label: 'Very Good', image: vGoodImg, rating: 5 }
  ];

  const handleEmojiClick = (index) => {
    setSelectedEmoji(index);
  };

  const handleSubmit = async () => {
    if (selectedEmoji === null) {
      alert("Please select a rating.");
      return;
    }

    const email = localStorage.getItem('email'); // Get email from localStorage
    const date = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

    // Prepare feedback data
    const feedbackData = {
      email,
      rating: emojis[selectedEmoji].rating,
      feedback: feedbackText,
      date,
    };

    try {
      // Send feedback data to the API
      const response = await fetch('/api/submitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Thank you for your feedback!");
        setSelectedEmoji(null);
        setFeedbackText(""); // Clear the feedback text after submission
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert("An error occurred while submitting feedback. Please try again later.");
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackHeader}>
        <span><img className={styles.feedbackIcon} src='/feed.png' /></span>
        <span className={styles.feedbackTitle}>Feedback</span>
      </div>
      <h2 className={styles.how}>How are you feeling?</h2>
      <div className={styles.emojiContainer}>
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className={`${styles.emoji} ${selectedEmoji === index ? styles.selected : ''}`}
            onClick={() => handleEmojiClick(index)}
          >
            <Image src={emoji.image} alt={emoji.label} className={styles.emojiIcon} width={50} height={50} />
            {selectedEmoji === index && (
              <div className={styles.emojiLabel}>{emoji.label}</div>
            )}
          </div>
        ))}
      </div>
      <textarea
        className={styles.commentBox}
        placeholder="Add a Comment..."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      ></textarea>
      <button className={styles.submitButton} onClick={handleSubmit}>
        <span>Submit Now</span>
      </button>
    </div>
  );
};

export default Feedback;
