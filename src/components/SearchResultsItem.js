import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(theme => ({
    searchResult:{
        padding: "10px 20px",
        '&:hover':{
            backgroundColor: "#efefef"
        }
    }
}))

export const SearchResultsItem = ({ result, openEditModal }) => {
    const classes = useStyles()
    return(
        <div className={classes.searchResult} onClick={()=>openEditModal(result)}>{result.text}</div>
    )
}