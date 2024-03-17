import {createUseStyles} from 'react-jss'
import {Outlet} from "react-router-dom";
import useError from "../../hooks/useError";
import useAlert from "../../hooks/useAlert";
import {useViewportSize} from "../../hooks/useViewportSize";
import { useEffect } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';


const useStyles = createUseStyles((theme) => ({
    main: {
        height: ({ vh }) => `calc(${vh}px * 100)`,
        display: 'flex',
        flexDirection: 'column',
        padding: [24]
    }
}))

const PublicLayout = () => {
    const { vh } = useViewportSize()

    const {isAlertOpen, alertData, closeAlert} = useAlert()
    const showError = useError()
    const classes = useStyles({vh})

    console.log('error', showError)



    return <>
            <main className={classes.main}>
                <SnackbarProvider>
                    <Outlet/>
                </SnackbarProvider>
                
            </main>
    </>
}

export default PublicLayout
