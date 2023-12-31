import { Link } from "react-router-dom";
import styles from "../styles/components/Results.module.scss";

type ResultsListProps = {
  results: {
    id: number;
    value: string;
  }[];
};

export const ResultsList = ({ results }: ResultsListProps) => {
  return (
    <div className={styles.results}>
      {results.length > 0 ? (
        results.map((result) => {
          return (
            <div>
              <Link to="/" className={styles.singleResult} key={result.id}>
                {result.value}
              </Link>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.{" "}
              </p>
            </div>
          );
        })
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};
