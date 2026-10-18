import { useState } from 'react';

const Likes = () => {
  const [likes, setLikes] = useState(3);

  const handleClick = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <div className="likes">
      <p>{likes} people like this review.</p>
      <button onClick={handleClick}>Like</button>
    </div>
  );
};

export default Likes;
