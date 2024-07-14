"use client";
import styles from './styles/Home.module.scss';
import { useState, useEffect } from "react";

const textData = require('./data/content.json').texts;

export default function Home() {
  const [content, setContent] = useState(textData)
  const [isReady, setIsReady] = useState(false)
  const [usedTexts, setUsedTexts] = useState([content[0]]);

  const resetListener = () => {
    setUsedTexts([content[0]])
  }

  useEffect(() => {
    if(localStorage.getItem('usedTexts')) {
      let savedTexts = localStorage.getItem('usedTexts')
      savedTexts = JSON.parse(savedTexts)
      setUsedTexts(savedTexts)
    }

    window.addEventListener("reset", resetListener)

    setIsReady(true)

    return () => {
      window.removeEventListener("reset", resetListener)
    }
  },[])

  const replaceContent = () => {
    let newText;
    if(document.querySelector('input[name="option"]:checked') === null) {
      return;
    }

    switch (document.querySelector('input[name="option"]:checked').value) {
      case '1':
        newText = content[0];
        break;
      case '2':
        newText = content[1];
        break;
      case '3':
        const remainingTexts = content.filter(text => !usedTexts.includes(text));
        newText = remainingTexts[Math.floor(Math.random() * remainingTexts.length)];
        break;
      default:
        break;
    }
    setUsedTexts([newText]);
    localStorage.setItem('usedTexts', JSON.stringify([newText]));
  }

  const appendContent = () => {
    let newText;
    if(document.querySelector('input[name="option"]:checked') === null) {
      return;
    }
    switch (document.querySelector('input[name="option"]:checked').value) {
      case '1':
        newText = content[0];
        break;
      case '2':
        newText = content[1];
        break;
      case '3':
        const remainingTexts = content.filter(text => !usedTexts.includes(text));
        if (remainingTexts.length === 0) {
          alert('Nie ma już dostępnych unikalnych treści');
          return;
        }
        newText = remainingTexts[Math.floor(Math.random() * remainingTexts.length)];
        break;
      default:
        break;
    }
    if (!usedTexts.includes(newText)) {
      newText = [...usedTexts, newText].sort();
      setUsedTexts(newText);
      localStorage.setItem('usedTexts', JSON.stringify(newText));
    } else {
      alert('Nie ma już dostępnych unikalnych treści');
      return;
    }
  }


  return isReady? (
    <main className={styles.main}>
      <h1>Nagłówek H1</h1>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <h3>BLOK PIERWSZY</h3>
          <form className={styles.radioGroup}>
            <label className={styles.customRadio}>
              <input type="radio" name="option" value="1" />
              <span className={styles.radioBtn}></span>
              Opcja pierwsza
            </label>
            <label className={styles.customRadio}>
              <input type="radio" name="option" value="2" />
              <span className={styles.radioBtn}></span>
              Opcja druga
            </label>
            <label className={styles.customRadio}>
              <input type="radio" name="option" value="3" />
              <span className={styles.radioBtn}></span>
              Opcja losowa
            </label>
          </form>
        </div>
        <div className={styles.block}>
          <h3>BLOK DRUGI</h3>
          <button className={styles.primaryButton} onClick={e => replaceContent()}>ZASTĄP</button>
          <button className={styles.secondaryButton} onClick={e => appendContent()}>DOKLEJ</button>
        </div>
        <div className={`${styles.block} ${styles.center}`}>
          <h3>BLOK Z DŁUGĄ NAZWĄ KTÓRA SAMA SIĘ PRZYTNIE ...</h3>
          {usedTexts.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </main>
  ):(<main></main>)
}