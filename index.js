const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  let browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  
  await page.setViewport({
    width: 1800,
    height: 1600,
  });
  

  await page.goto('https://soysocia.bocajuniors.com.ar/');
  
  //const screenshot = await page.screenshot({ path: 'captura.png' });
  await page.waitForSelector('a[onclick="javascript:login();"]');

  await page.click('a[onclick="javascript:login();"]')

  const loginTarget = await browser.waitForTarget(target => target.url().includes('login.jsp?'));
  const loginPage = await loginTarget.page();
  await page.waitForTimeout(1500);

  const screenshot2 = await loginPage.screenshot({ path: 'captura2.png' });

  await loginPage.type('#email', process.env.MAIL);
  await loginPage.type('#password', process.env.PASSWORD);
  await loginPage.click('button[type="submit"]');

  //await loginPage.close();

  try {
    
  await page.waitForSelector('a[data-toggle="tooltip"]', { timeout: 10000 });
 
  //const screenshot3 = await page.screenshot({ path: 'captura3.png' });
  await page.waitForTimeout(1500);

  await page.click('.popup_imagen_close');

  await page.waitForTimeout(2000);
  await page.waitForSelector('a[data-toggle="tooltip"]', { timeout: 10000 });
    await page.click('a[data-toggle="tooltip"]');
    
  } catch (error) {
   console.log(error); 
  }



  //const screenshot4 = await page.screenshot({ path: 'captura4.png' });

  await page.waitForSelector('a[class="but_medium2"]', { timeout: 10000 });

  await page.click('a[class="but_medium2"]');

  await page.waitForSelector('.but_medium2');

  //const screenshot5 = await page.screenshot({ path: 'captura5.png' });

  await page.click('a[class="but_medium2"]');

  await page.waitForSelector('svg');

  //const screenshot6 = await page.screenshot({ path: 'captura6.png' });


  var i= 0
  while(i==0) {
    let elementosDisponibles = await page.$$('g.section.enabled');
    while(elementosDisponibles.length == 0){
      console.log(elementosDisponibles.length);
      //await page.waitForTimeout(1000); 
      await page.reload();
      await page.waitForSelector('svg', { timeout: 10000 });
      elementosDisponibles = await page.$$('g.section.enabled');
      const screenshot7 = await page.screenshot({ path: 'captura7.png' });
      console.log("buscando...");
    }
    console.log(elementosDisponibles.length);
    let encontrado = false
    for (let elemento of elementosDisponibles) {
      if (!encontrado){
        try {
          await elemento.click(); // hace clic en el elemento específico
          await page.waitForNavigation();
          encontrado = true
        } catch (error) {
          console.log(error);
        }
      }
      // espera a que se cargue la página siguiente
      // realizar las acciones necesarias en la página siguiente
 
    }
    try {
      await page.waitForSelector('.secmap');
      
      await page.click('td.d'); 
      //await page.waitForNavigation(); 
      const screenshot8 = await page.screenshot({ path: 'captura8.png' });
      await page.waitForSelector('#btnReservar');
      await page.waitForTimeout(1500);
      try {
        await page.click('.but_medium2');
        await page.waitForTimeout(5000);
        const elemento = await page.$('#carrito');
        if (!elemento){
          console.log("Aparecio esto");
          await page.click(".but_medium2gris")
          await page.goBack();
        } else {
          i = 1
        }
        
      } catch (error) {
        console.log(error.message);
        console.log("No llegue a reservarla!");
        await page.goBack();

      }
      
   
    } catch (error) {
      console.log(error.message);
      console.log("No llegue a reservarla!");
      await page.goBack();
    }
  }





 

//await page.waitForNavigation();

const screenshot10 = await page.screenshot({ path: 'captura10.png' });

const currentUrl = await page.url();
console.log(currentUrl);


//await page.close()
})();


