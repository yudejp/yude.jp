import { useEffect, useState } from "react";
import { currentPage, Pages } from "./VerticalMenu"
import { RecoilRoot, useRecoilState } from 'recoil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { formatDistance } from 'date-fns'
import { ja, enUS, zhCN } from 'date-fns/locale'
import { InlineMath } from 'react-katex';
import Markdown from 'react-markdown';
import { useTranslation } from "react-i18next";

export default function Chat() {
    const { t, i18n: { language } } = useTranslation();

    const [page, _] = useRecoilState(currentPage);
    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [messages, setMessages] = useState<Message[]>();
    const [alert, setAlert] = useState("");

    interface Message {
        name: string
        body: string
        createdAt: string
    }

    useEffect(() => {
        if (page === Pages.Chat) {
            updateChat();
        }
    }, [page]);

    async function submit() {
        await fetch(
            "https://bbs.yude.workers.dev/api/message",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors',
                body: JSON.stringify({
                    name: name,
                    body: body,
                })
            }
        )
            .then(
                (res) => res.text()
            )
            .then(
                async (text) => {
                    if (text.includes("Success")) {
                        await showAlert(t("sent"));
                        setBody("");
                    } else {
                        await showAlert(t("sent_error") + text);
                    }
                }
            )
        await new Promise(s => setTimeout(s, 800));
        updateChat();
    }

    const updateChat = () => {
        fetch(
            "https://bbs.yude.workers.dev/api/messages",
        )
            .then((res) => res.json())
            .then((data) => setMessages(data));
    }
    const updateName = (e: any) => {
        setName(e.target.value);
    }
    const updateBody = (e: any) => {
        setBody(e.target.value);
    }

    async function showAlert(alert: string) {
        setAlert(alert);
        await new Promise(s => setTimeout(s, 1500));
        setAlert("");
    }

    return (
        <RecoilRoot>
            <div
                className={`w-1/2 absolute flex items-center p-4 text-sm border border-gray-300 rounded-lg bg-gray-800 text-gray-300 border-gray-600${alert === "" ? ` hidden` : ``}`}
                role="alert"
            >
                <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div>
                    {alert}
                </div>
            </div>
            <div className="text-wrap max-w-xl">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white">
                        {t("name")}{" "}
                        <span className="text-orange-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full block p-4 border rounded-lg text-base dark:bg-neutral-900 border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        value={name}
                        onChange={updateName}
                        placeholder="Hatsune Mike"
                        aria-label="名前"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium dark:text-white">
                        {t("body")}{" "}
                        <span className="text-orange-400">*</span>
                    </label>
                    <textarea
                        aria-label="チャットの本文"
                        id="body"
                        rows={4}
                        className="font-serif text-2xl w-full block p-2.5 rounded-lg border dark:bg-neutral-900 border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t("message_leave")}
                        value={body}
                        onChange={updateBody}
                    ></textarea>
                </div>
                <button
                    onClick={submit}
                    type="button"
                    aria-label="チャットを送信"
                    className={`w-full text-xl dark:text-white hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center border border-2 border-blue-600 hover:bg-blue-700 focus:ring-blue-800${name === "" || body === "" ? " opacity-20" : ""}`}
                    disabled={name === "" || body === ""}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />{" "}{t("send")}
                </button>
            </div>

            <div className="overflow-auto h-96 mt-5 rounded-lg max-w-xl">
                {
                    messages &&
                    messages.map((message, index) => {
                        return (
                            <div key={index} className="p-6 border border-gray-200 rounded-lg shadow border-gray-700 mb-2">
                                <p className="font-medium opacity-80">
                                    {message.name},{" "}
                                    {
                                        formatDistance(Date.parse(message.createdAt), new Date(), { addSuffix: true, locale: (language === "ja" ? ja : language === "en" ? enUS : language === "zhCN" ? zhCN : ja) })
                                    }
                                </p>
                                <p className="font-serif text-2xl">
                                    {
                                        message.body.includes("$$")
                                            ?
                                            <InlineMath>
                                                {message.body.replace(/\$\$/g, "")}
                                            </InlineMath>
                                            :
                                            <Markdown className="prose prose-xl dark:prose-invert">
                                                {message.body}
                                            </Markdown>
                                    }
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </RecoilRoot>
    )
}
