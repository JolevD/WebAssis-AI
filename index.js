import axios from "axios"
import * as cheerio from 'cheerio';

async function scrapeWebpage(url) {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    const pageHead = $('head').html()
    const pageBody = $('body').html()

    // console.log({ pageHead })

    const internalLinks = []
    const externalLinks = []

    $('a').each((_, el) => {
        const link = $(el).attr('href')
        if (link === "/") return;

        if (link.startsWith('/')) {
            internalLinks.push(link)
        }
        else
            externalLinks.push(link)


    })

    return { head: pageHead, body: pageBody, externalLinks, internalLinks }

}

scrapeWebpage("https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html").then(console.log)