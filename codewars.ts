// let a =
//   "1-kiwi2-pear3-kiwi4-banana5-melon6-banana7-melon8-pineapple9-apple10-pineapple11-cucumber12-pineapple13-cucumber14-orange15-grape16-orange17-grape18-apple19-grape20-cherry21-pear22-cherry23-pear24-kiwi25-banana26-kiwi27-apple28-melon29-banana30-melon31-pineapple32-melon33-pineapple34-cucumber35-orange36-apple37-orange38-grape39-orange40-grape41-cherry42-pear43-cherry44-pear45-apple46-pear47-kiwi48-banana49-kiwi50-banana51-melon52-pineapple53-melon54-apple55-cucumber56-pineapple57-cucumber58-orange59-cucumber60-orange61-grape62-cherry63-apple64-cherry65-pear66-cherry67-pear68-kiwi69-pear70-kiwi71-banana72-apple73-banana74-melon75-pineapple76-melon77-pineapple78-cucumber79-pineapple80-cucumber81-apple82-grape83-orange84-grape85-cherry86-grape87-cherry88-pear89-cherry90-apple91-kiwi92-banana93-kiwi94-banana95-melon96-banana97-melon98-pineapple99-apple100-pineapple";
// let s = a.split(/\d+-/);
// console.log(s);

//
// console.log(Math.PI);



const s = `<prod><name>drill</name><prx>99</prx><qty>5</qty></prod>

<prod><name>hammer</name><prx>10</prx><qty>50</qty></prod>

<prod><name>screwdriver</name><prx>5</prx><qty>51</qty></prod>

<prod><name>table saw</name><prx>1099.99</prx><qty>5</qty></prod>

<prod><name>saw</name><prx>9</prx><qty>10</qty></prod>

<prod><name>chair</name><prx>100</prx><qty>20</qty></prod>

<prod><name>fan</name><prx>50</prx><qty>8</qty></prod>

<prod><name>wire</name><prx>10.8</prx><qty>15</qty></prod>

<prod><name>battery</name><prx>150</prx><qty>12</qty></prod>

<prod><name>pallet</name><prx>10</prx><qty>50</qty></prod>

<prod><name>wheel</name><prx>8.80</prx><qty>32</qty></prod>

<prod><name>extractor</name><prx>105</prx><qty>17</qty></prod>

<prod><name>bumper</name><prx>150</prx><qty>3</qty></prod>

<prod><name>ladder</name><prx>112</prx><qty>12</qty></prod>

<prod><name>hoist</name><prx>13.80</prx><qty>32</qty></prod>

<prod><name>platform</name><prx>65</prx><qty>21</qty></prod>

<prod><name>car wheel</name><prx>505</prx><qty>7</qty></prod>

<prod><name>bicycle wheel</name><prx>150</prx><qty>11</qty></prod>

<prod><name>big hammer</name><prx>18</prx><qty>12</qty></prod>

<prod><name>saw for metal</name><prx>13.80</prx><qty>32</qty></prod>

<prod><name>wood pallet</name><prx>65</prx><qty>21</qty></prod>

<prod><name>circular fan</name><prx>80</prx><qty>8</qty></prod>

<prod><name>exhaust fan</name><prx>62</prx><qty>8</qty></prod>

<prod><name>window fan</name><prx>62</prx><qty>8</qty></prod>`;


function catolog(s:string,articel:string) {
  let target = RegExp(`${articel}`,"i")
  let searchStr:string[] = []
  let arrstr:string[] = [];
  let str:string= "";
  let tmp:string[] = [];
  
  for (let i = 0; i<s.length;i++ ) {
    if(s[i] === '\n') {
      if (str.length == 0) continue
      arrstr.push(str)
      str = ""
    } else {
      str += s[i]
    }
  }
  for (let i = 0; i < arrstr.length - 1; i++) {
    let str = ""
    if(target.test(arrstr[i])) {
      let s = 0;
      for (let j = 0; j < arrstr[i].length - 1  ; j++ ) {
        if(arrstr[i][j]+arrstr[i][j+1] === "</") {
          for(let k = j; 0 < k; k--) {
            if(arrstr[i][k] === ">") {
              s = k+1;
              break
              }
          }
          for (let k = s; k < j; k++ ) {
            str += arrstr[i][k]
          }
          tmp.push(str)
          str = ""
        }
      }
      console.log(tmp)
      break
    }
  }
  let answer = `${tmp[0]} > prx: ${tmp[1]} qty: ${tmp[2]}\r\n`
  console.log()

  return answer
}
console.log(catolog(s,"saw"))
