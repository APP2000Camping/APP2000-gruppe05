import React, {useState} from 'react';

import styles from './form.module.css'; 


const Form = ({onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        onSubmit(username,password);
        setUsername('');
        setPassword('');
    }
    return (
        <div className={styles.formContainer}>
        <form onSubmit ={handleSubmit} className={styles.form}>
            <label className={styles.BrukerNavn}>Brukernavn</label>
        <input
        type="text"
        className={styles.inputField}
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        placeholder = "f. eks camping@gmail.com"
        />
        <label className={styles.Passord}>Passord</label>
        <input 
        type="text"
        className= {styles.inputField}
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        placeholder = "passord"
        />
       
        
        <button className = {styles.LoggInn} type="submit">Logg inn</button>
        </form>
        </div>

    )

};
export default Form

