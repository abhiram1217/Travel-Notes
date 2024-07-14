import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav/>
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2 style={{color:"yellow"}}>About WorldWide.</h2>
          <p>
         You can Mark cities that you've visited on an interactive world map and we provide you a feature to write personal notes and experiences for each city.

          </p>
        
        </div>
      </section>
    </main>
  );
}
