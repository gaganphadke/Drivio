import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Feedback.module.css';

import goodImg from '../assets/good.png';
import badImg from '../assets/bad.png';
import neutralImg from '../assets/neutral.png';
import vGoodImg from '../assets/v_good.png';
import vBadImg from '../assets/v_bad.png';

const Feedback = ({ regNum, customerId }) => {
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
    if (selectedEmoji === null || feedbackText.trim() === "") {
      alert("Please select a rating and add a comment.");
      return;
    }

    const feedbackData = {
      regNum,
      customerId,
      rating: emojis[selectedEmoji].rating,
      feedback: feedbackText,
    };

    try {
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert("Thank you for your feedback!");
        setSelectedEmoji(null);
        setFeedbackText("");
      } else {
        alert("There was an error submitting your feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback.");
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
