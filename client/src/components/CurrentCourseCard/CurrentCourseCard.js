// client/src/components/CurrentCourseCard.js
import React, { useContext, useState, useEffect } from 'react';
import './CurrentCourseCard.css';
import LikeIcon from '../../assets/svg/like.svg';
import UnlikeIcon from '../../assets/svg/unlike.svg';
import Download from '../../assets/svg/download.svg';
import { AuthContext } from '../../context/AuthContext';
import { likeCourse, unlikeCourse } from '../../api';

export const CurrentCourseCard = ({ item, setVisibleModal }) => {
  const { authToken, user, setUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isBought, setIsBought] = useState(false);

  useEffect(() => {
    if (user && user.likes) {
      setIsLiked(user.likes.includes(item._id));
    }
    if (user && user.courses) {
      setIsBought(user.courses.includes(item._id));
    }
  }, [user, item._id]);

  const handleBuy = () => {
    setVisibleModal(true);
  };

  const handleLike = async () => {
    if (!authToken) {
      alert('Пожалуйста, войдите в систему, чтобы лайкнуть курс.');
      return;
    }

    try {
      if (isLiked) {
        const data = await unlikeCourse(authToken, item._id);
        setUser((prevUser) => ({
          ...prevUser,
          likes: data.likes,
        }));
        setIsLiked(false);
      } else {
        const data = await likeCourse(authToken, item._id);
        setUser((prevUser) => ({
          ...prevUser,
          likes: data.likes,
        }));
        setIsLiked(true);
      }
    } catch (error) {
      alert(error.error || 'Произошла ошибка при обработке лайка.');
    }
  };

  const handleDownload = () => {
    if (item.pdf) {
      window.open(item.pdf, '_blank');
    } else {
      alert('PDF файл недоступен.');
    }
  };

  return (
    <div className="current-course-card">
      <div className="current-course-card-img">
        <img className="img" src={item.image} alt={item.title} />
        <img className="img-blur" src={item.image} alt={item.title} />
      </div>
      <div className="current-course-card-body">
        <div className="current-course-card-title">{item.title}</div>
        <div className="current-course-card-category">
          <strong>Категории:</strong>{' '}
          {item.categories && item.categories.length > 0
            ? item.categories.map((cat) => cat.name).join(', ')
            : 'Нет категорий'}
        </div>
        <div className="current-course-card-tags">
          {item.recommendation && item.recommendation.length > 0 && (
            <>
              <strong>Похожие:</strong>
              {item.recommendation.map((rec, index) => (
                <div key={index} className="current-course-card-tag">
                  {rec.title}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="current-course-card-btns-container">
          <div className="btn-buy" onClick={!isBought ? handleBuy : handleDownload}>
            {isBought && <img src={Download} alt="Download" />}
            {isBought ? 'Скачать PDF' : `Купить за ${item.price} UZS`}
          </div>
          <div className="btn-like" onClick={handleLike}>
            <img src={isLiked ? UnlikeIcon : LikeIcon} alt="like" />
          </div>
        </div>
      </div>
    </div>
  );
};
