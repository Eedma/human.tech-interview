import {createUseStyles} from "react-jss"
import TextArea from "../../../components/TextArea"
import Checkbox from "../../../components/Checkbox"
import React, {useState} from "react"
import Popover from "../../../components/Popover"
import {useForm, useWatch} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup/dist/yup"
import {validationSchema} from "./model"
import dayjs from "dayjs"
import {TASK_MODEL} from "../../../models";
import DatePickerInput from "../../../components/DatePickerInput";
import {TASK_PRIORITIES} from "../../../models/task";
import ControlledSelect from "../../../components/ControlledSelect"
import { handleApiError, retrieveSingleValueForRs } from "../../../utilities/helpers"
import useError from "../../../hooks/useError"

const useStyles = createUseStyles(theme => ({
    root: {
        padding: [66, 32, 0],
        display: "flex",
        flexDirection: "column",
        gap: 24
    },
    textareaWrapper: {
        position: "relative",
    },
    checkbox: {
        position: "absolute !important",
        width: "max-content !important",
        top: 0,
        left: 0,
        margin: 0,
        zIndex: 2
    },
    textarea: {
        marginLeft: 32,

        "& textarea": {
            borderRadius: 0,
            border: "none",
            padding: "0 !important",
            fontSize: 16,
            fontWeight: 500,
            color: theme.palette.common.textBlack,
        }
    },
    buttons: {
        ...theme.utils.flexbox.spaceBetween,
        margin: [4, 0]
    }
}))

const EditTaskModal = ({onClose, onUpdateCb, task}) =>  {
    const [date, setDate] = useState(task[TASK_MODEL.date])
    const [priority, setPriority] = useState(retrieveSingleValueForRs(TASK_PRIORITIES,task[TASK_MODEL.effort]))
    const showError = useError()
    const classes = useStyles() 

    const {handleSubmit, register, control, reset, setValue, formState: {errors}} = useForm({
        shouldUnregister: false,
        mode: 'onBlur',
        reValidateMode: 'onChange',
        nativeValidation: false,
        shouldFocusError: true,
        resolver: yupResolver(validationSchema),
        defaultValues: {
            [TASK_MODEL.completed]: !!task[TASK_MODEL.completed],
            [TASK_MODEL.description]: task[TASK_MODEL.description],
            [TASK_MODEL.date]: task[TASK_MODEL.date],
            [TASK_MODEL.effort]: task[TASK_MODEL.effort],
        }
    })

    const description = useWatch({name: TASK_MODEL.description, control})
    const completed = useWatch({name: TASK_MODEL.completed, control})

    const onSubmit = async () => {
        
        const updatedTask = {
            ...task,
            [TASK_MODEL.effort]: priority.value,
            [TASK_MODEL.date]: dayjs(date).format("YYYY-MM-DD"),
            [TASK_MODEL.completed]: completed,
            [TASK_MODEL.description]: description,
            [TASK_MODEL.updated_at]: dayjs(new Date()).format("YYYY-MM-DD")
        }

        try {
            await onUpdateCb(task, updatedTask)
        }catch (error){
            console.log('error', error)
            handleApiError({
                error,
                handleGeneralError: showError
            })
        }

        onClose()
    }

    return (
        <Popover
            onClose={onClose}
            buttonPrimary={{
                text: "Done",
                disabled: !description || !date,
                onClick: handleSubmit(onSubmit)
            }}
            buttonSecondary={{
                text: "Cancel",
                onClick: () => {
                    reset({
                        [TASK_MODEL.completed]: 0,
                        [TASK_MODEL.description]: "",
                        [TASK_MODEL.date]: null,
                        [TASK_MODEL.effort]: 0,
                    })
                    setDate('')
                }
            }}
        >
            <div className={classes.root}>
                <div className={classes.textareaWrapper}>
                    <Checkbox className={classes.checkbox} {...register(TASK_MODEL.completed)}/>
                    <TextArea
                        className={classes.textarea}
                        maxLength={200}
                        rows={6}
                        charCount={description?.length}
                        {...register(TASK_MODEL.description)}
                    />
                </div>
                <div className={classes.buttons}>
                    <DatePickerInput
                        value={date}
                        callback={setDate}
                        
                    />
                    <ControlledSelect
                        onChangeCallback={setPriority}
                        onClear={() => setPriority(false)}
                        name={'priority'}
                        placeholder={'Priority'}
                        isClearable
                        menuPlacement={'top'}
                        value={priority}
                        options={TASK_PRIORITIES}
                    />
                </div>
            </div>
        </Popover>
    )
}

export default EditTaskModal