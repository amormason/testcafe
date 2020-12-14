import { Given, When, Then, After, Before } from 'cucumber';
import { Selector as NavtiveSelector, ClientFunction } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';


const Selector = (input, t) => {
    return NavtiveSelector(input).with({
        boundTestRun: t
    })
}



Given('open page', async (t) => {
    await t.navigateTo('https://uat-investments3.personal-banking.hsbc.com.hk/hk/utb-uat/index.html');
});

const fillpassword = ClientFunction(() => {
    const list = document.querySelectorAll('.smallestInput');
    const pwd = 'memans01'.split("");
    list.forEach((element, index) => {
        if (element.classList.toString().indexOf('active') > -1) {
            element.value = pwd[index];
        }
    })
});


Then('click page', async (t) => {
    const ContinueButton = Selector('input').withAttribute('value', 'Continue');
    await t.typeText(Selector('#Username1'), 'pfs007').click(ContinueButton, {
        timeout: 1500
    });

    await t.typeText(Selector('#memorableAnswer'), 'memans');

    await fillpassword();
});


Then('click login button', async (t) => {

    await t.click(Selector('.submit_input'), {
        timeout: 15000
    });

});







Then('click  Discover funds', async (t) => {

    const button = Selector('a').withAttribute('title', 'Discover funds');
    await t.click(button, {
        timeout: 15000
    });
  
    const viewAllFundsButton = Selector('a').withAttribute('data-triggername', 'View all funds');
    await t.click(viewAllFundsButton, {
        timeout: 15000
    });

    await t.eval(() => {
        sessionStorage.setItem('channel','mob');
    });

    await t.resizeWindow(375, 812);

    console.log('地址：', await t.eval(() => window.location.href));




    console.log('设备：', await t.eval(() => getLocalStorageItem('channel'))); // => 'my-value'
    // await t.click(Selector('#tab2'), {
    //     timeout: 15000
    // });

    const firstFund = Selector('div').withAttribute('tablindex', '0');
    await t.click(firstFund, {
        timeout: 15000
    });

})