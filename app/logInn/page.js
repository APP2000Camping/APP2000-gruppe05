// Skrevet av Rolf
"use client";
import '../globals.css';
import NavBar from '../components/nav-bar';
import Footer from '../components/footer';
import styles from '../logInn/login.module.css';
import { useEffect, useState } from 'react';

let userIDArr = [];

const UserList = () => {
  return (
    <ul>
      {userIDArr.map((user) => (
        <li key={user.userID}>{user.userID}</li>
      ))}
    </ul>
  )
}

export default function Home() {

  // Må være const, initialiserer userID og password, vil bli sent gjennom api-en
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    console.log("Bruker Lagt inn");
    e.preventDefault(); // Stopper siden fra å refreshe
    try {
      // Kaller på api-en
      const response = await fetch("../api/registerUser", {
        method: "POST", // POST for å sende data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Konverterer javascript verdi til JSON objekt
          "userID": userID,
          "password": password,
        }),
      });

      if (response) {
        const data = await response.json();
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleDelUser = async (e) => {
    console.log("Slettet bruker");
    e.preventDefault();
    try {
      const response = await fetch("../api/delUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userID": userID,
        }),
      });

    } catch (e) {
      console.log(e);
    }
  }

  /*
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Brukere hentet");
    const fetchData = async () => {
      const response = await fetch("../api/getUsers", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);
  */
  
  const fillUserIDList = async (e) => {
    console.log("Populert userIDList");
    try {
      const response = await fetch("../api/getUsers", {
        method: "GET", // GET for å hente data
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response) {
        userIDArr = (await response.json()).response;
        console.log(userIDArr);
      }

    } catch (e) {
      console.log(e);
    }
  }

  // Lager siden med form
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className = {styles.formContainer}>
      <form onSubmit = {handleSubmit} className={styles.form}>

      <input
      type="text"
      className={styles.inputField}
      value={userID}
      onChange={(e)=> setUserID(e.target.value)}
      placeholder = "Skriv brukernavn"
      />

      <input 
      type="password"
      className= {styles.inputField}
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      placeholder = "Skriv passord"
      />

      <button type="submit">Logg inn</button>
      </form>
      </div>



      <div className = {styles.formContainer}>
      <form onSubmit = {handleDelUser} className={styles.form}>

      <input
      type="text"
      className={styles.inputField}
      value={userID}
      onChange={(e)=> setUserID(e.target.value)}
      placeholder = "Skriv brukernavn"
      />

      <button type="submit">Slett Bruker</button>
      </form>
      </div>

      <div>
        <button className='button' onClick={fillUserIDList}>Hent brukere</button>
        <UserList />
      </div>
      
      <Footer />
    </div>
  );
}