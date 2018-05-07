const year = ['2010','2011','2012','2013','2014','2015','2016','2017','2018'];

const countryList =
[["SYRIA","Middle East"],["CAMEROON","Middle Africa"],["ANGOLA","Middle Africa"],["BANGLADESH","Southern Asia"],["GHANA","Western Africa"],["LIBYA","Northern Africa"],["MALI","Western Africa"],["SUDAN","Northern Africa"],["UGANDA","Eastern Africa"],["EGYPT","Northern Africa"],["IRAN","Middle East"],["ISRAEL","Middle East"],["PALESTINE","Middle East"],["YEMEN","Middle East"],["AFGHANISTAN","Southern Asia"],["TURKEY","Middle East"],["IRAQ","Middle East"],["SYRIA","Middle East"],["CENTRAL AFRICAN REPUBLIC","Middle Africa"],["KENYA","Eastern Africa"],["NIGERIA","Western Africa"],["RWANDA","Eastern Africa"],["SOMALIA","Eastern Africa"],["PAKISTAN","Southern Asia"],["DEMOCRATIC REPUBLIC OF CONGO","Middle Africa"],["BENIN","Western Africa"],["NEPAL","Southern Asia"],["INDONESIA","South-Eastern Asia"],["ETHIOPIA","Eastern Africa"],["ZIMBABWE","Southern Africa"],["SOUTH SUDAN","Eastern Africa"],["CHAD","Middle Africa"],["BAHRAIN","Middle East"],["SRI LANKA","Southern Asia"],["MOZAMBIQUE","Eastern Africa"],["SOUTH AFRICA","Southern Africa"],["SAUDI ARABIA","Middle East"],["ALGERIA","Northern Africa"],["MAURITANIA","Western Africa"],["TUNISIA","Northern Africa"],["GUINEA","Western Africa"],["LIBERIA","Western Africa"],["MADAGASCAR","Eastern Africa"],["SENEGAL","Western Africa"],["TANZANIA","Eastern Africa"],["ZAMBIA","Southern Africa"],["LEBANON","Middle East"],["MOROCCO","Northern Africa"],["GUINEA-BISSAU","Western Africa"],["JORDAN","Middle East"],["BURUNDI","Eastern Africa"],["IVORY COAST","Western Africa"],["BURKINA FASO","Western Africa"],["NIGER","Western Africa"],["EQUATORIAL GUINEA","Middle Africa"],["GAMBIA","Western Africa"],["GABON","Middle Africa"],["TOGO","Western Africa"],["NAMIBIA","Southern Africa"],["MALAWI","Eastern Africa"],["SWAZILAND","Southern Africa"],["OMAN","Middle East"],["VIETNAM","South-Eastern Asia"],["CAMBODIA","South-Eastern Asia"],["KUWAIT","Middle East"],["REPUBLIC OF CONGO","Middle Africa"],["SIERRA LEONE","Western Africa"],["ERITREA","Eastern Africa"],["DJIBOUTI","Eastern Africa"],["LESOTHO","Southern Africa"],["LAOS","South-Eastern Asia"],["UNITED ARAB EMIRATES","Middle East"],["QATAR","Middle East"],["BOTSWANA","Southern Africa"]]

const event_dict = [ 'violence against civilians',
  'riots/protests',
  'battle-no change of territory',
  'remote violence',
  'strategic development',
  'battle-government regains territory',
  'battle-non-state actor overtakes territory',
  'non-violent transfer of territory',
  'headquarters or base established' ]

module.exports = {
  year: year,
  countryList: countryList,
  event_dict: event_dict
};
