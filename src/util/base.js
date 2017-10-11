export const normalizePath = (str) => {
  str = str.replace(/[\\\/]+/g, '/');
  return str;
};

const cityJson = require('./list.json');
export const getCityList= () => {
  /*
   *使用《中华人民共和国行政区划代码》国家标准(GB/T2260). 这部分可分为三个层次,从左到右的含义分别是：
   第一、二位表示省(自治区、直辖市、特别行政区)
   第三、四位表示市(地区、自治州、盟及国家直辖市所属市辖区和县的汇总码)
   第五、六位表示县(市辖区、县级市、旗).
   * */
  let rt = {};
  // 直辖市 city code
  let DIRECT_MUNICIPALITY = [110000, 120000, 310000, 500000];

  _.forEach(cityJson, function (name, code) {
    const provinceLevel = fill(code.substr(0, 2), '0');
    const cityLevel = fill(code.substr(0, 4), '0');

    // 初始化省数据结构
    rt[provinceLevel] = rt[provinceLevel] || {
      name: name,
      children: {} 
    };
    if (code !== provinceLevel) {
      if (_.indexOf(DIRECT_MUNICIPALITY, +provinceLevel) >= 0) {
        // 直辖市
        rt[provinceLevel].isDirectCity= true;
        rt[provinceLevel].children[code] = {
          name: name
        };
      } else {
        // 初始化市 数据结构
        rt[provinceLevel].children[cityLevel] =  rt[provinceLevel].children[cityLevel] || {
          name: name,
          children: {} 
        };
        if (code !== cityLevel) {
          rt[provinceLevel].children[cityLevel].children[code] = {
            name: name
          };
        }
      }
    }
  });

  function fill(str, base) {
    if (str.length < 6) {
      return str + _.repeat(base,  6  - str.length);
    }
  }
  return rt;
}
