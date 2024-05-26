export default function Weather() {
    return (
        <div className="flex justify-center items-start w-screen">
            <div>
                <div className="inline-block">
                    <iframe
                        src="https://www.tenki-yoho.com/blogparts/img.php?all,acrweb"
                        width={166}
                        height={196}
                    />
                </div>
                <div className="inline-block ml-3">
                    <img width={94} src="buttons/009button.gif" />
                    <img width={94} src="buttons/mac.gif" />
                    <img width={94} src="buttons/right2repair.png" />
                    <img width={94} src="buttons/vscbutton.gif" />
                    <img width={94} src="buttons/parental.png" />
                    <img width={94} src="buttons/www.gif" />

                </div>
            </div>
        </div>
    )
}
