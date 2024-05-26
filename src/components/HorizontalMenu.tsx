import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faStar, faComments } from '@fortawesome/free-regular-svg-icons'
import { faPassport } from "@fortawesome/free-solid-svg-icons"
import { Pages } from "./VerticalMenu"

import { RecoilRoot, useRecoilState } from 'recoil'

import { currentPage } from "./VerticalMenu"

export default function HorizontalMenu() {
    const [page, setPage] = useRecoilState(currentPage);
    const activeColor = " bg-slate-700 text-white"

    return (
        <RecoilRoot>
            <div className="relative text-lg font-medium text-center hover:cursor-pointer grid grid-cols-4 grid-flow-col backdrop-blur-2xl bg-zinc-100/30 dark:bg-neutral-900/30 rounded-lg">
                <div
                    className={`self-start py-3 rounded-lg${page === Pages.Profile ? activeColor : ""}`}
                    onClick={() => { setPage(Pages.Profile) }}
                >
                    <FontAwesomeIcon icon={faUser} />{" "}
                </div>
                <div
                    className={`self-start py-3 rounded-lg${page === Pages.Identifier ? activeColor : ""}`}
                    onClick={() => { setPage(Pages.Identifier) }}
                >
                    <FontAwesomeIcon icon={faPassport} />{" "}
                </div>
                <div
                    className={`self-start py-3 rounded-lg${page === Pages.Services ? activeColor : ""}`}
                    onClick={() => { setPage(Pages.Services) }}
                >
                    <FontAwesomeIcon icon={faStar} />{" "}
                </div>
                <div
                    className={`self-start py-3 rounded-lg${page === Pages.Chat ? activeColor : ""}`}
                    onClick={() => { setPage(Pages.Chat) }}
                >
                    <FontAwesomeIcon icon={faComments} />{" "}
                </div>
            </div>
        </RecoilRoot>
    )
}
