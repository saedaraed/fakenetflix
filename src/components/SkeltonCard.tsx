import Skeleton from "./SkeltonLoader";
import styles from "../styles/MovieCard.module.css";


const SkeltonCards=()=>{
    return(
 
        <div className="container mx-auto py-6 px-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="mb-6 w-full">
            <Skeleton className="h-6 w-1/4 mb-4" /> 
            <div className="flex w-full gap-4 overflow-hidden" >
              {[...Array(6)].map((_, j) => (
                <Skeleton key={j} className={styles.card}/>
              ))}
            </div>
          </div>
        ))}
      </div>    )
}

export default SkeltonCards;