import classNames from "classnames";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@app/store/hooks";


import { routesActions, type Route } from "@entities/routes";

import { RouteAPI } from "@features/route/api";

import { Input, type InputMessageType } from "@shared/ui/components/Input";
import { ProgressBarLine, useProgress } from "@shared/ui/progress";
import { sleep } from "@shared/api";


import formStyles from '@styles/modules/form.module.scss'
import buttonStyles from "@styles/modules/button.module.scss";


export const FindRouteForm = () => {
    const [routeId, setRouteId] = useState<string>("");
    const [messages, setMessages] = useState<{ [input: string]: InputMessageType }>({});

    const { progress, isLoading, startProgress, completeProgress } = useProgress()

    const dispatch = useAppDispatch();
    const navigate = useNavigate()


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setMessages({})


        startProgress()
        try {
            const response = await RouteAPI.find(routeId)
            if (!response.success && response.error) {
                if (response.error.fields) {
                    setMessages(response.error.fields)
                }
                return
            }

            dispatch(routesActions.setRoute(response.data as Route))

        } catch (error) {
            console.error(error);

        } finally {
            completeProgress(async () => setMessages(_ => ({
                routeId: {
                    text: "Нашли!",
                    type: 'info'
                }
            })))

            sleep(1000).then(() => navigate('/'))
        }
    }


    return (<>
        <div className={formStyles.wrapper}>
            <div className={formStyles.header}>
                <div className={classNames(formStyles.title, "font-h1 font-color")}>Маршрут</div>
                <div className={classNames(formStyles.text)}>Найти маршрут</div>
            </div>


            <form
                className={classNames(formStyles.form, isLoading && formStyles.formLoading)}
                onSubmit={handleSubmit}
            >
                <ProgressBarLine progress={progress} isLoading={isLoading} />

                <Input
                    name="routeId"
                    externalMessage={messages.routeId}

                    placeholder="ID маршрута"
                    onChange={setRouteId}

                    onChangeEvent={(event) => {
                        event.target.value = event.target.value.toUpperCase()
                    }}

                    className={formStyles.formItem}
                    required
                />

                <button className={classNames(buttonStyles.button, formStyles.formItem)}>
                    {!isLoading ? "Посмотреть" : "Стараемся найти"}
                </button>
            </form>
        </div>
    </>);
};