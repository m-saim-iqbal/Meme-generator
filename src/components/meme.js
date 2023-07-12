import React from "react"
//import memesData from "../memesData.js"
import html2canvas from 'html2canvas';
import { saveAs } from "file-saver";

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemeImages, setAllMemeImages] = React.useState("")

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch('https://api.imgflip.com/get_memes')
            const data = await res.json()
            setAllMemeImages(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage() {
        const memesArray = allMemeImages
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))

    }

    function handleChange(event) {
        const { name, value, type } = event.target
        setMeme(prevmeme => {
            return {
                ...prevmeme,
                [name]: value
            }
        })
    }

    function downloadMeme() {
        console.log("asffaf");
        // html2canvas(document.querySelector(".meme")).then(function (canvas) {			
        //     let anchorTag = document.createElement("a");
        // 	anchorTag.download = "filename.jpg";
        // 	anchorTag.href = canvas.toDataURL();
        // 	anchorTag.target = '_blank';
        // 	anchorTag.click();
        // });
        const container = document.querySelector(".meme");

        html2canvas(container, {
            scale: 25, // Set scale to 25x for full HD resolution (1920x1080)
            useCORS: true // Enable CORS to allow screenshot of external images
        }).then(canvas => {
            canvas.toBlob(blob => saveAs(blob, "download.png"));
        });
    }
    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                    name="topText"
                    value={meme.topText}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <div className="download">
                <button className="download--button"
                    onClick={downloadMeme}>Download
                </button>
            </div>

        </main>
    )
}