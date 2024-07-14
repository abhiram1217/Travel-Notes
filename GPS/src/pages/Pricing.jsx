// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav/>
      <section>

      <img
          src="img-2.jpg"
          alt="person with dog overlooking mountain with sunset"
          />
        <div>
          <h2 style={{color:"yellow"}}>Simple Pricing.</h2>
          <p>
          &rarr; &nbsp;  Just ₹ 9/month.
          <br></br>
          &rarr; &nbsp;  Unlimited city tracking
          <br></br>
          &rarr; &nbsp; Personal notes for each city
          <br></br>
          &rarr; &nbsp;Interactive world map
          <br></br>
          &rarr; &nbsp;Regular updates and new features
        
          </p>
        
        </div>
          </section>
    </main>
  );
}
