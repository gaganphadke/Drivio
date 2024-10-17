import React, { useState } from 'react';
import styles from '../styles/Feedback.module.css';  // Import the CSS file for styling

const Feedback = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { label: 'Very Bad', emoji: '😵‍💫' },
    { label: 'Bad', emoji: '😞' },
    { label: 'Medium', emoji: '😐' },
    { label: 'Good', emoji: '🙂' },
    { label: 'Very Good', emoji: '😄' }
  ];

  const handleEmojiClick = (index) => {
    setSelectedEmoji(index);
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackHeader}>
        <span className={styles.feedbackIcon}>💬</span>
        <span className={styles.feedbackTitle}>Feedback</span>
        <button className={styles.closeButton}>✖</button>
      </div>
      <h2>How are you feeling?</h2>
      <p>
        Your input is valuable in helping us better understand your needs and
        tailor our service accordingly.
      </p>
      <div className={styles.emojiContainer}>
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className={`${styles.emoji} ${
              selectedEmoji === index ? styles.selected : ''
            }`}
            onClick={() => handleEmojiClick(index)}
          >
            <span className={styles.emojiIcon}>{emoji.emoji}</span>
            {selectedEmoji === index && (
              <div className={styles.emojiLabel}>{emoji.label}</div>
            )}
          </div>
        ))}
      </div>
      <textarea
        className={styles.commentBox}
        placeholder="Add a Comment..."
      ></textarea>
      <button className={styles.submitButton}>Submit Now</button>
    </div>
  );
};

export default Feedback;
