# JDA Helpers
    Userscript to streamline the workflow of JDA.
## Installation
1 **Open Chrome**

2 **CNTRL+click** on [Tampermonkey](https://tampermonkey.net/) to install

![Tampermonkey](../../raw/master/imgs/tpmk_dl.jpg)

3 **CNTRL+click** on [jda.user.js](../../raw/master/jda.user.js) to install

![jda.user.js](../../raw/master/imgs/jda_install.jpg)

4 The next time you open JDA, you will be asked for your **RDC Number** and **3 Initials**.

5 **Any future updates will be installed by Tampermonkey as it will periodically check for updates.**

## Usage

### MFCs
* #### Asks for Carrier SCAC to match with Tarrif
    ![mfc_values](../../raw/master/imgs/mfc_1.jpg)
* #### Asks for $ Amount
    ![mfc_values](../../raw/master/imgs/mfc_2.jpg)
* #### Fills in default values that are commonly used for Trailer Detention
    ![mfc_values](../../raw/master/imgs/mfc_3.jpg)
* #### Selects the checkmark of the updated voucher.
    ![mfc_check](../../raw/master/imgs/mfc_4.jpg)
* #### Uses "Inbound PO Trailer Detention" in the Memo Field as the Default Value.
    ![mfc_check](../../raw/master/imgs/mfc_5.jpg)
___
### Load Information    
* #### Uses **Load ID** as Master BOL Number
    ![mfc_check](../../raw/master/imgs/confirm_pickup.jpg)
* #### Fills in the LTL Trailer Number.  Takes a little bit of manual setup.
___
### Stop Information
* #### Adds two buttons at the bottom of the list for faster selction of stops.
    ![mfc_check](../../raw/master/imgs/stop_form.jpg)
___
### Rate Calculator
* #### Fills in Rate Calculator with default values
    ![mfc_check](../../raw/master/imgs/rate_calc.jpg)
___
## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D