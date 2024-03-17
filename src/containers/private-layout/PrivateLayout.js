import {createUseStyles} from 'react-jss'
import {Outlet} from "react-router-dom";
import Header from "../../components/Header";
import useError from "../../hooks/useError";
import useAlert from "../../hooks/useAlert";
import { SnackbarProvider } from 'notistack';

const useStyles = createUseStyles((theme) => ({

}))

const PrivateLayout = () => {

    const {isAlertOpen, alertData, closeAlert} = useAlert()
    const showError = useError()
    const classes = useStyles()

    return <>
        <Header/>
            <main className={classes.main}>
                <SnackbarProvider >
                    <Outlet/>
                </SnackbarProvider>
                {/* <div className={classes.alertContainer}>alert box alert box</div> */}
            </main>
    </>
}

export default PrivateLayout
