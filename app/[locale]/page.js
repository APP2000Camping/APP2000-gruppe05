"use client";
import './globals.css';
import TranslationsProvider from '../components/TranslationsProvider';
import News from '../components/news';
import ButtonOnPicture from "../components/buttonOnPicture";
import initTranslations from '../i18n';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
/*
import { getClient } from "@/app/utils/db"; kan ikkje vær i klient sida

const database = await getClient();
const users = database.collection("users");
*/

const i18nNamespaces = ['Home', 'Common'];

export default function Home({ params:{locale}}) {
const { t, resources } = useMemo(() => initTranslations(locale, i18nNamespaces), [locale]);

const { data: session } = useSession();
const [file, setFile] = useState(null); 
/*
const loggedUser = session.user?.email;
const adminCheck = "admin";

const curUser = users.findOne({ adminCheck })
console.log(curUser);
var curAdmin = null;

if (!curUser) {
  console.log("Admin ikke funnet");
  curAdmin = 0;
} else {
  console.log("Admin er funnet")
  curAdmin = 1;
}
*/


const handleFileChange = async (e) => {
  console.log("handleFileChange called");
  const selectedFile = e.target.files[0];
  console.log(selectedFile);
  setFile(selectedFile); 
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("handleSubmit reached");
  try {
  
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    const response = await fetch("../api/imgUpload", {
      method: "POST", 
      body: formData,
    });

    if (response) {
      const data = await response.json();
      console.log(data);
      console.log("response caught")
    }
  }
  catch (e) {
    console.log(e);
    console.log("error caught")
  }
}

  return (
   
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
    <main>
     
      <section>
        <div className="section-row">
          <div className="picture-component">
            <ButtonOnPicture />
          </div>
        </div>
      </section>

      {session ? (
        <>
        <section>
          <div className="section-row">
            <div>
              <h2>Endre bilde:</h2>
              <input type='file' onChange={handleFileChange}/>
              <button onClick={handleSubmit}>Bytt bilde</button>
            </div>
          </div>
        </section>
        </>
      ): (
        <></>
      )}
      
      <section>
        <div className="section-row">
          <div className="news-component">
            <News />
          </div>
        </div>
      </section>
      
      <section>
        <div className="section-row">
          <div className="">
            <h1> GRID HER </h1> 
          </div>
        </div>
      </section>
    </main>
  </TranslationsProvider>
    
  );
}