"use client";

import React from "react";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getRedirectResult, OAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

// These values are already public by the following url: https://geluksroute-7d52d.firebaseapp.com/__/firebase/init.json
const firebaseConfig = {
  apiKey: "AIzaSyBw4DWVR6njIzjf49TgFiWdd5ustuutXOQ",
  appId: "1:738669891354:web:9ce496062e66ae540ee6a3",
  authDomain: "firebase.degeluksroute.com",
  messagingSenderId: "738669891354",
  projectId: "geluksroute-7d52d",
  storageBucket: "geluksroute-7d52d.appspot.com",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new OAuthProvider("oidc.somtoday");

export default function Home() {
  async function loginPopup() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const credential = OAuthProvider.credentialFromResult(result);
        console.log(credential);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function loginRedirect() {
    signInWithRedirect(auth, provider)
      .then((result) => {
        console.log(result);
        const credential = OAuthProvider.credentialFromResult(result);
        console.log(credential);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        console.log("getRedirectResult", result);
        if (result) {
          const credential = OAuthProvider.credentialFromResult(result);
          console.log(credential);
        }
      })
      .catch((error) => {
        console.error("catch", error);
      });
  }, []);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged", user);
    });
  }, []);

  console.log("currentUser", auth.currentUser);

  return (
    <main>
      <div style={{ height: 20 }}></div>

      <button onClick={loginPopup}>Inloggen - popup</button>

      <div style={{ height: 20 }}></div>

      <button onClick={loginRedirect}>Inloggen - redirect</button>

      <div style={{ height: 20 }}></div>
    </main>
  );
}
