// import React, { useState } from 'react';
// import styles from './AccountPage.module.css';

// import img from './Components/img/icon.png'
// import lockImg from './Components/img/lock.png'
// import avatarStock from './Components/img/img_avatar.png'

// const token = localStorage.getItem("myLittleToken");

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     lastName: 'Боярський',
//     firstName: 'Андрій',
//     patronymic: 'Батькович',
//     address: 'м. Боярка, Київська область',
//     phone: '+38 099 000 00 00',
//     email: 'chin-chin@sauntres.com',
//   });

//   const [isEditable, setIsEditable] = useState(false);
//   const [photo, setPhoto] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleEdit = () => {
//     setIsEditable((prev) => !prev);
//   };

//   const handleSave = () => {
//     // 
//     setIsEditable(false);
//   };

//   const handlePhotoChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedPhoto = URL.createObjectURL(e.target.files[0]);
//       setPhoto(selectedPhoto);
//     }
//   };

//   const handleDeletePhoto = () => {
//     setPhoto(null);
//   };

//   return (
//     <div className={styles.profileContainer}>
//       <div className={styles.avatarSection}>
//         <div className={styles.avatar} style={{ backgroundImage: photo ? `url(${photo})` : `url(${avatarStock})` }}>
//             {!photo && <div className={styles.avatarPlaceholder}></div>}
//         </div>
//             <div className={styles.avatarButtonSection}>
//                 <label htmlFor="photoInput" className={`${styles.choosePhoto} ${isEditable ? styles.active : styles.inactive}`}>Вибрати фото</label>
//                     <input
//                         id="photoInput"
//                         type="file"
//                         accept="image/*"
//                         style={{ display: 'none' }}
//                         onChange={handlePhotoChange}
//                         disabled={!isEditable}
//                         className={isEditable ? styles.active : styles.inactive} 
//                     />
//                 <button className={styles.deletePhoto} disabled={!isEditable} onClick={handleDeletePhoto}>Видалити фото</button>
//             </div>
//       </div>
//       <div className={styles.infoSection}>
//         {[
//           { label: 'ПРІЗВИЩЕ', name: 'lastName', value: formData.lastName },
//           { label: "ІМ'Я", name: 'firstName', value: formData.firstName },
//           { label: 'ПО БАТЬКОВІ', name: 'patronymic', value: formData.patronymic },
//           { label: 'МІСЦЕ ПРОЖИВАННЯ', name: 'address', value: formData.address },
//           { label: 'ТЕЛЕФОН', name: 'phone', value: formData.phone },
//           { label: 'ПОШТА', name: 'email', value: formData.email },
//         ].map((field, index) => (
//           <div key={index} className={styles.fieldContainer}>
//             <label>{field.label}</label>
//             <input
//               type="text"
//               name={field.name}
//               value={field.value}
//               onChange={handleChange}
//               readOnly={!isEditable} 
//             />
//             <img src={lockImg} alt=""  className={isEditable ? styles.activeLock : styles.inactiveLock}/>
//           </div>
//         ))}
//         <div className={styles.ButtonSection}>
//             <button className={styles.saveButton} onClick={handleSave} disabled={!isEditable}>
//                 ЗБЕРЕГТИ ЗМІНИ
//             </button>
//         </div>
//         <div onClick={toggleEdit} className={styles.YakasHuinaBlaIZaibavsa}>
//             <img src={img} alt="" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './AccountPage.module.css';

import img from './Components/img/icon.png';
import lockImg from './Components/img/lock.png';
import avatarStock from './Components/img/img_avatar.png';

const token = localStorage.getItem("loginToken");

const Profile = () => {
  const [formData, setFormData] = useState({
    lastName: 'Боярський',
    firstName: 'Андрій',
    patronymic: 'Батькович',
    address: 'м. Боярка, Київська область',
    phone: '+38 099 000 00 00',
    email: 'chin-chin@sauntres.com',
  });

  const [isEditable, setIsEditable] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/customer', {
          headers: {
            Authorization:`Bearer ${token}`,
          },
        });
        setFormData({
          lastName: response.data.lastName || '',
          firstName: response.data.firstName || '',
          patronymic: response.data.middleName || '',
          address: response.data.address || '',
          phone: response.data.phoneNumber || '',
          email: '',
        });
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  const handleSave = () => {
    // Add save logic if needed
    setIsEditable(false);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedPhoto = URL.createObjectURL(e.target.files[0]);
      setPhoto(selectedPhoto);
    }
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatarSection}>
        <div className={styles.avatar} style={{ backgroundImage: photo ? `url(${photo})` : `url(${avatarStock})` }}>
          {!photo && <div className={styles.avatarPlaceholder}></div>}
        </div>
        <div className={styles.avatarButtonSection}>
          <label htmlFor="photoInput" className={`${styles.choosePhoto} ${isEditable ? styles.active : styles.inactive}`}>Вибрати фото</label>
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
            disabled={!isEditable}
            className={isEditable ? styles.active : styles.inactive} 
          />
          <button className={styles.deletePhoto} disabled={!isEditable} onClick={handleDeletePhoto}>Видалити фото</button>
        </div>
      </div>
      <div className={styles.infoSection}>
        {[{
          label: 'ПРІЗВИЩЕ', name: 'lastName', value: formData.lastName
        }, {
          label: "ІМ'Я", name: 'firstName', value: formData.firstName
        }, {
          label: 'ПО БАТЬКОВІ', name: 'patronymic', value: formData.patronymic
        }, {
          label: 'МІСЦЕ ПРОЖИВАННЯ', name: 'address', value: formData.address
        }, {
          label: 'ТЕЛЕФОН', name: 'phone', value: formData.phone
        }, {
          label: 'ПОШТА', name: 'email', value: formData.email
        }].map((field, index) => (
          <div key={index} className={styles.fieldContainer}>
            <label>{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={field.value}
              onChange={handleChange}
              readOnly={!isEditable} 
            />
            <img src={lockImg} alt="" className={isEditable ? styles.activeLock : styles.inactiveLock} />
          </div>
        ))}
        <div className={styles.ButtonSection}>
          <button className={styles.saveButton} onClick={handleSave} disabled={!isEditable}>
            ЗБЕРЕГТИ ЗМІНИ
          </button>
        </div>
        <div onClick={toggleEdit} className={styles.YakasHuinaBlaIZaibavsa}>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Profile;