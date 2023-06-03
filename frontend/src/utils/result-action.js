import { postServerData } from '../helper/helper'
import {pushResultAction,updateResultAction} from '../reducer/resultReducer'

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(updateResultAction(index));
    } catch (error) {
        console.log(error);
    }
}
export const usePublishResult = (resultData) => {
    const { result, user } = resultData;
    (async () => {
        try {
            if(result !== [] && !user) throw new Error("Couldn't get Result");
            await postServerData(`http://localhost:2000/api/result`, resultData, data => data)
        } catch (error) {
            console.log(error)
        }
    })();
}