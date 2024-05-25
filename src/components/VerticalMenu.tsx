import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faStar, faComments } from '@fortawesome/free-regular-svg-icons'
import { faPassport } from "@fortawesome/free-solid-svg-icons"

import { RecoilRoot, atom, useRecoilState } from 'recoil'
import { useTranslation } from "react-i18next";

export enum Pages {
    Profile = 0,
    Identifier = 1,
    Activities = 2,
    Spotify = 3,
    Services = 4,
    Chat = 5,
}

export const currentPage = atom({
    key: 'page',
    default: Pages.Profile,
})

export default function VerticalMenu() {
    const { t } = useTranslation();

    const [page, setPage] = useRecoilState(currentPage);
    const activeColor = " bg-slate-700 text-white"

    return (
        <RecoilRoot>
            <div className="sticky top-5">
                <ul className="text-lg font-medium text-center hover:cursor-pointer">
                    <li
                        className={`w-full px-4 py-2 rounded-lg${page === Pages.Profile ? activeColor : ""}`}
                        onClick={() => { setPage(Pages.Profile) }}
                    >
                        <FontAwesomeIcon icon={faUser} className="w-10 h-10" />{" "}
                        <p>{t("profile")}</p>
                    </li>
                    <li
                        className={`w-full px-4 py-2 rounded-lg${page === Pages.Identifier ? activeColor : ""}`}
                        onClick={() => { setPage(Pages.Identifier) }}
                    >
                        <FontAwesomeIcon icon={faPassport} className="w-10 h-10" />{" "}
                        <p>{t("identifier")}</p>
                    </li>
                    <li
                        className={`w-full px-4 py-2 rounded-lg${page === Pages.Services ? activeColor : ""}`}
                        onClick={() => { setPage(Pages.Services) }}
                    >
                        <FontAwesomeIcon icon={faStar} className="w-10 h-10" />{" "}
                        <p>{t("services")}</p>
                    </li>
                    <li
                        className={`w-full px-4 py-2 rounded-lg${page === Pages.Chat ? activeColor : ""}`}
                        onClick={() => { setPage(Pages.Chat) }}
                    >
                        <FontAwesomeIcon icon={faComments} className="w-10 h-10" />{" "}
                        <p>{t("chat")}</p>
                    </li>
                </ul>
            </div>
        </RecoilRoot>
    )
}
