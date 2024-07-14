import styles from '../styles/Footer.module.scss';

const Footer = () => {

  const handleVisibility = () => {
    let visibility = localStorage.getItem("personal")

    if(visibility){
      if(visibility == "hidden"){
        localStorage.setItem("personal","visible")
      } else {
        localStorage.setItem("personal","hidden")
      }
      
    } else{
      localStorage.setItem("personal","visible")
    }
    window.dispatchEvent(new Event("personal"));
  }

  const handleReset = () => {
    localStorage.clear()
    window.dispatchEvent(new Event("reset"));
  }
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.logo}>
            CSS<br/>IS<br/>AWESOME
            <div className={styles.box}></div>
          </div>
        </div>
        <div className={styles.center}><span>Nabthat</span></div>
        <div className={styles.popup}>
          <input type="checkbox" id="toggle-popup" className={styles.popupInput} />
          <label htmlFor="toggle-popup" className={styles.popupToggle}>POKAŻ</label>
          <div className={styles.popupContent}>
            <button onClick={e => handleReset()}>ZRESETUJ USTAWIENIA</button>
            <button onClick={e => handleVisibility()}>POKAŻ DANE OSOBOWE</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;