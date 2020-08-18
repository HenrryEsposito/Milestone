const puppeteer = require('puppeteer');
const { setTimeout } = require('timers');
const { Console } = require('console');

module.exports = search_engine

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function search_engine (querry) {

  //default tec to search
  var tec_dic = [
    { tec_name : "rest", value : 0 },
    { tec_name : "Git", value : 0 },
    { tec_name : "Java", value : 0 },
    { tec_name : "Python", value : 0 },
    { tec_name : "AWS", value : 0 },
    { tec_name : "Mysql", value : 0 },
    { tec_name : "Docker", value : 0 }
  ]

  //defining search parameters according to querry
  scroll_loops = querry.knob_index;
  delete querry.knob_index;
  Object.keys(querry).forEach((element) =>{
    tec_dic.push({tec_name : element, value: 0})
  })

  console.log("Engine Starting")

  //puppeteer config
  var browser = await puppeteer.launch();
  
  var page = await browser.newPage();


  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');


  await page.goto('https://www.google.com/search?q=vagas+backend&rlz=1C1GCEA_enBR869BR869&oq=vagas+b&aqs=chrome.0.69i59j69i57j69i59j0l2j69i60l3.4544j0j1&sourceid=chrome&ie=UTF-8&ibp=htl;jobs&sa=X&ved=2ahUKEwiBqP2ooJLrAhXkJLkGHTm8D8gQiYsCKAJ6BAgKEBM&sxsrf=ALeKk02DyfWT-N1JOsUxtm0Ms6H-D_5ydg:1597118034701#htivrt=jobs&htidocid=eYCrmcBE8ic-23_yAAAAAA%3D%3D&fpstate=tldetail'); //<--- change this to another job search
  await page.screenshot({path: 'example1.png'});
  await sleep(1000);

  //scroll screen results of google to getter more jobs
  if(scroll_loops > 0){
    var scrolling = true;
    var i = 1
    while (scrolling) {
      let job_divs = await page.evaluate(()=>
      {
        len = document.querySelectorAll("ul").length;
        return len;
      })

      console.log(job_divs)

      if(job_divs> i){
        await page.evaluate(()=>{
          uls = document.querySelectorAll("ul");
          uls[uls.length-1].scrollIntoView();
        })
  
        i++

        if (i < scroll_loops) {
          await sleep(1000)
        }
        else{
          i = 0;
          scrolling = false;
          await sleep(1000);
        }
      }
      else{
        await sleep(1000);
      }
    }
  }

  //scrap job descriptions
  job_descriptions = await page.evaluate(()=>
  {
    const nodeList = document.querySelectorAll('div .HBvzbc')
    const divArray = [...nodeList]

    return divArray.map(function(key) {
      return key.textContent
      })
  });
  
  job_descriptions.splice(-10,10) // <---- Correction to meet the application ui concept

  //search tec names inside job descriptions
  tec_dic.forEach((element) => {
    const tec = element
    
    job_descriptions.forEach((element) =>{
      const description = element
      
      if (description.includes(tec.tec_name)) {
        tec.value++
      }
    });
  });

  //define the most frequent tec
  var sortable = [];
  Object.values(tec_dic).forEach(element => {
    sortable.push(element.value)
  });
  sortable.sort(function(a, b){return a-b});
  greater = sortable[sortable.length-1];

  //close puppeteer and return de search results to the page
  await browser.close();
  return {
    tec_dic,
    greater
  }
}