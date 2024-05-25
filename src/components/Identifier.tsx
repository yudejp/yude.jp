import Links from "./Links"
import Keys from "./Keys"

import { useTranslation } from "react-i18next";

export default function Identifier() {
    const { t } = useTranslation();

    return (
        <>
            <p className="text-center mb-5 text-2xl">{t("links")}</p>
            <Links />

            <p className="text-center mt-10 mb-5 text-2xl">{t("public_keys")}</p>
            <Keys />
        </>
    )
}
