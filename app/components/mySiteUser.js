import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './mySiteUser.module.css';

export default function User({ userData, orderData }) {
  const { t } = useTranslation();

  const { email: userEmail, tlf: userTelephone, password: userPassword } = userData;
  const { email: orderEmail, tlf: orderTelephone, password: orderPassword } = orderData;

  return (
    <>
      <div className={styles.userProfileContainer}>
        <section className={styles.userSection}>
          <h2>{t('mysite:bruker')}</h2>
          <div className={styles.userInfo}>
            <p><strong>{t('mysite_email')}:</strong> {userEmail}</p>
            <p><strong>{t('mysite_telephone')}:</strong> {userTelephone}</p>
          </div>
        </section>
      </div>

      <div className={styles.userProfileContainer}>
        <section className={styles.userSection}>
          <h2>{t('mysite:ordre')}</h2>
          <div className={styles.userInfo}>
            <p><strong>{t('mysite_order_')}:</strong> {orderEmail}</p>
            <p><strong>{t('mysite_order_')}:</strong> {orderTelephone}</p>
          </div>
        </section>
      </div>
    </>
  );
}
