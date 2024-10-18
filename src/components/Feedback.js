import React, { useState } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import styles from '../styles/Feedback.module.css';

import goodImg from '../assets/good.png';
import badImg from '../assets/bad.png';
import neutralImg from '../assets/neutral.png';
import vGoodImg from '../assets/v_good.png';
import vBadImg from '../assets/v_bad.png';

const Feedback = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { label: 'Very Bad', image: vBadImg },
    { label: 'Bad', image: badImg },
    { label: 'Neutral', image: neutralImg },
    { label: 'Good', image: goodImg },
    { label: 'Very Good', image: vGoodImg }
  ];

  const handleEmojiClick = (index) => {
    setSelectedEmoji(index);
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackHeader}>
        <span className={styles.feedbackIcon}>💬</span>
        <span className={styles.feedbackTitle}>Feedback</span>
      </div>
      <h2>How are you feeling?</h2>
      <div className={styles.emojiContainer}>
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className={`${styles.emoji} ${
              selectedEmoji === index ? styles.selected : ''
            }`}
            onClick={() => handleEmojiClick(index)}
          >
            <Image 
              src={emoji.image} 
              alt={emoji.label} 
              className={styles.emojiIcon} 
              width={50} // Adjust the size as needed
              height={50} 
            />
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
      <button className={styles.submitButton}><span>Submit Now</span></button>
    </div>
  );
};

export default Feedback;
