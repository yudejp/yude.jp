import { useRecoilState } from 'recoil'

import Profile from "./Profile"
import Identifier from "./Identifier"
import Spotify from "./Spotify"
import Services from "./Services"
import Chat from "./Chat"

import { currentPage, Pages } from "./VerticalMenu"

export default function ContentRenderer() {
    const [page, _] = useRecoilState(currentPage);
    return (
        <>
            {page === Pages.Profile && <><Profile /><Spotify /></>}
            {page === Pages.Identifier && <Identifier />}
            {page === Pages.Services && <Services />}
            {page === Pages.Chat && <Chat />}
        </>
    )
}
