import Links from "./Links"
import Keys from "./Keys"

import { useTranslation } from "react-i18next";

export default function Identifier() {
    const { t } = useTranslation();

    return (
        <>
            <h2 className="text-2xl font-semibold dark:text-gray-200 mt-2 mb-1 ml-1">{t("links")}</h2>
            <Links />

            <h2 className="text-2xl font-semibold dark:text-gray-200 mt-2 mb-1 ml-1 mt-10">{t("public_keys")}</h2>
            <Keys />
        </>
    )
}
