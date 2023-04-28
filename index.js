const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  let browser = await puppeteer.launch({  headless: false,});
  const page = await browser.newPage();

  
  await page.setViewport({
    width: 1800,
    height: 1600,
  });
  

  await page.goto('https://soysocio.bocajuniors.com.ar/');
  
  const screenshot = await page.screenshot({ path: 'captura.png' });
  await page.waitForSelector('a[onclick="javascript:login();"]');

  await page.click('a[onclick="javascript:login();"]')

  const loginTarget = await browser.waitForTarget(target => target.url().includes('login.jsp?'));
  const loginPage = await loginTarget.page();

  const screenshot2 = await loginPage.screenshot({ path: 'captura2.png' });

  await loginPage.type('#email', process.env.USERNAME);
  await loginPage.type('#password', process.env.PASSWORD);
  await loginPage.click('button[type="submit"]');

  //await loginPage.close();

  await page.waitForSelector('.features_sec3');


  const screenshot3 = await page.screenshot({ path: 'captura3.png' });

  await page.click('a[data-toggle="tooltip"]');

  const screenshot4 = await page.screenshot({ path: 'captura4.png' });

  await page.click('a[href="comprar_producto_pedido.php?eNid=634"]');

  await page.waitForSelector('.but_medium2');

  const screenshot5 = await page.screenshot({ path: 'captura5.png' });

  await page.click('a[href="comprar_plano_general.php?eNid=634"]');

  await page.waitForSelector('svg');

  const screenshot6 = await page.screenshot({ path: 'captura6.png' });


  var i= 0
  while(i==0) {
    let elementosDisponibles = await page.$$('g.section.enabled');
    while(elementosDisponibles.length == 0){
      console.log(elementosDisponibles.length);
      await page.waitForTimeout(1000); 
      await page.reload();
      await page.waitForSelector('svg');
      elementosDisponibles = await page.$$('g.section.enabled');
      const screenshot7 = await page.screenshot({ path: 'captura7.png' });
      console.log("buscando...");
    }
    console.log(elementosDisponibles.length);
    for (let elemento of elementosDisponibles) {
      await elemento.click(); // hace clic en el elemento específico
      await page.waitForNavigation(); // espera a que se cargue la página siguiente
      // realizar las acciones necesarias en la página siguiente
      const screenshot8 = await page.screenshot({ path: 'captura8.png' });
    }
    try {
      await page.waitForSelector('.secmap');
      
      await page.click('td.d'); 
      //await page.waitForNavigation(); 
      
      await page.waitForSelector('#btnReservar');
  
      await page.click('#btnReservar');
      i = 1
    } catch (error) {
      console.log(error.message);
      console.log("No llegue a reservarla!");
      await page.goBack();
    }
  }



const screenshot9 = await page.screenshot({ path: 'captura9.png' });

await page.waitForNavigation();

const screenshot10 = await page.screenshot({ path: 'captura10.png' });
// const pageUrl = page.url(); 
// console.log('El script ha finalizado. Abre la siguiente URL en el navegador para continuar manualmente:');
// console.log(pageUrl);

await page.close()
})();


