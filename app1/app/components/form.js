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
        <input
        type="text"
        className={styles.inputField}
        value={username}
        onChange={(e)=> setUsername(e.target.value)}
        placeholder = "skriv brukernavn"
        />
        <input 
        type="text"
        className= {styles.inputField}
        value={password}
        onChange={()=> setPassword(e.target.value)}
        placeholder = "skriv passord"
        
        />
       
        
        <button type="submit">Log inn</button>
        </form>
        </div>

    )

};
export default Form

