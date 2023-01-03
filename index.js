const cheerio = require('cheerio');
const axios = require('axios');

const beers = [];

const fetchInfo = async () => {
  const response = await axios.get(
    'https://drydrinker.com/collections/low-and-no-alcohol-lagers'
  );

  const html = response.data;
  const $ = cheerio.load(html);
  const base = 'https://drydrinker.com/';

  $("[href^='/products']", html).each((i, value) => {
    const title = $(value).text().trim();
    const url = $(value).attr('href');
    beers.push({
      title,
      url: base + url,
    });
  });
  console.log(beers);
};

fetchInfo();
