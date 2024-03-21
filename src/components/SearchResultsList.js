import { SearchResultsItem } from "./SearchResultsItem";
import { createUseStyles } from "react-jss";


const useStyles = createUseStyles(theme => ({
    resultsList:{
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        marginTop: "1rem",
        maxHeight: "300px",
        overflowY: "auto",
        cursor: "pointer"
    }
}))

export const SearchResultsList = ({results, openEditModal})=>{
    const classes = useStyles()
    return(
        <div className={classes.resultsList}>
            {results.map((result, id)=> {
                return <SearchResultsItem key={id} result={result} openEditModal={openEditModal}/>
            })}
        </div>
    )
}