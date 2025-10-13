# Binary Search Tree Diagrams

*Сгенерировано: 13.10.2025, 11:15:49*

---

# Исходное BST дерево

```mermaid
graph TD
  node1["109<br/>size: 100"]
  node2["-246<br/>size: 41"]
  node1 -->|L| node2
  node3["-842<br/>size: 26"]
  node2 -->|L| node3
  node4["-850<br/>size: 2"]
  node3 -->|L| node4
  node5["-962<br/>size: 1"]
  node4 -->|L| node5
  node6["-463<br/>size: 23"]
  node3 -->|R| node6
  node7["-804<br/>size: 12"]
  node6 -->|L| node7
  node8["-838<br/>size: 1"]
  node7 -->|L| node8
  node9["-487<br/>size: 10"]
  node7 -->|R| node9
  node10["-567<br/>size: 8"]
  node9 -->|L| node10
  node11["-784<br/>size: 2"]
  node10 -->|L| node11
  node12["-619<br/>size: 1"]
  node11 -->|R| node12
  node13["-498<br/>size: 5"]
  node10 -->|R| node13
  node14["-508<br/>size: 4"]
  node13 -->|L| node14
  node15["-554<br/>size: 1"]
  node14 -->|L| node15
  node16["-499<br/>size: 2"]
  node14 -->|R| node16
  node17["-505<br/>size: 1"]
  node16 -->|L| node17
  node18["-478<br/>size: 1"]
  node9 -->|R| node18
  node19["-413<br/>size: 10"]
  node6 -->|R| node19
  node20["-456<br/>size: 3"]
  node19 -->|L| node20
  node21["-422<br/>size: 2"]
  node20 -->|R| node21
  node22["-449<br/>size: 1"]
  node21 -->|L| node22
  node23["-274<br/>size: 6"]
  node19 -->|R| node23
  node24["-287<br/>size: 5"]
  node23 -->|L| node24
  node25["-410<br/>size: 2"]
  node24 -->|L| node25
  node26["-310<br/>size: 1"]
  node25 -->|R| node26
  node27["-281<br/>size: 2"]
  node24 -->|R| node27
  node28["-282<br/>size: 1"]
  node27 -->|L| node28
  node29["-207<br/>size: 14"]
  node2 -->|R| node29
  node30["-225<br/>size: 1"]
  node29 -->|L| node30
  node31["-170<br/>size: 12"]
  node29 -->|R| node31
  node32["-176<br/>size: 3"]
  node31 -->|L| node32
  node33["-192<br/>size: 2"]
  node32 -->|L| node33
  node34["-197<br/>size: 1"]
  node33 -->|L| node34
  node35["-112<br/>size: 8"]
  node31 -->|R| node35
  node36["-159<br/>size: 1"]
  node35 -->|L| node36
  node37["6<br/>size: 6"]
  node35 -->|R| node37
  node38["-86<br/>size: 3"]
  node37 -->|L| node38
  node39["-6<br/>size: 2"]
  node38 -->|R| node39
  node40["-27<br/>size: 1"]
  node39 -->|L| node40
  node41["33<br/>size: 2"]
  node37 -->|R| node41
  node42["52<br/>size: 1"]
  node41 -->|R| node42
  node43["2401<br/>size: 58"]
  node1 -->|R| node43
  node44["652<br/>size: 41"]
  node43 -->|L| node44
  node45["112<br/>size: 16"]
  node44 -->|L| node45
  node46["119<br/>size: 15"]
  node45 -->|R| node46
  node47["312<br/>size: 14"]
  node46 -->|R| node47
  node48["231<br/>size: 7"]
  node47 -->|L| node48
  node49["131<br/>size: 1"]
  node48 -->|L| node49
  node50["278<br/>size: 5"]
  node48 -->|R| node50
  node51["248<br/>size: 3"]
  node50 -->|L| node51
  node52["245<br/>size: 1"]
  node51 -->|L| node52
  node53["265<br/>size: 1"]
  node51 -->|R| node53
  node54["279<br/>size: 1"]
  node50 -->|R| node54
  node55["500<br/>size: 6"]
  node47 -->|R| node55
  node56["404<br/>size: 1"]
  node55 -->|L| node56
  node57["626<br/>size: 4"]
  node55 -->|R| node57
  node58["622<br/>size: 2"]
  node57 -->|L| node58
  node59["590<br/>size: 1"]
  node58 -->|L| node59
  node60["634<br/>size: 1"]
  node57 -->|R| node60
  node61["1130<br/>size: 24"]
  node44 -->|R| node61
  node62["698<br/>size: 9"]
  node61 -->|L| node62
  node63["684<br/>size: 1"]
  node62 -->|L| node63
  node64["878<br/>size: 7"]
  node62 -->|R| node64
  node65["717<br/>size: 4"]
  node64 -->|L| node65
  node66["872<br/>size: 3"]
  node65 -->|R| node66
  node67["801<br/>size: 2"]
  node66 -->|L| node67
  node68["846<br/>size: 1"]
  node67 -->|R| node68
  node69["971<br/>size: 2"]
  node64 -->|R| node69
  node70["1029<br/>size: 1"]
  node69 -->|R| node70
  node71["2140<br/>size: 14"]
  node61 -->|R| node71
  node72["1275<br/>size: 11"]
  node71 -->|L| node72
  node73["1196<br/>size: 3"]
  node72 -->|L| node73
  node74["1152<br/>size: 1"]
  node73 -->|L| node74
  node75["1226<br/>size: 1"]
  node73 -->|R| node75
  node76["1918<br/>size: 7"]
  node72 -->|R| node76
  node77["1588<br/>size: 6"]
  node76 -->|L| node77
  node78["1561<br/>size: 2"]
  node77 -->|L| node78
  node79["1373<br/>size: 1"]
  node78 -->|L| node79
  node80["1746<br/>size: 3"]
  node77 -->|R| node80
  node81["1801<br/>size: 2"]
  node80 -->|R| node81
  node82["1853<br/>size: 1"]
  node81 -->|R| node82
  node83["2283<br/>size: 2"]
  node71 -->|R| node83
  node84["2335<br/>size: 1"]
  node83 -->|R| node84
  node85["2905<br/>size: 16"]
  node43 -->|R| node85
  node86["2761<br/>size: 3"]
  node85 -->|L| node86
  node87["2433<br/>size: 2"]
  node86 -->|L| node87
  node88["2448<br/>size: 1"]
  node87 -->|R| node88
  node89["4906<br/>size: 12"]
  node85 -->|R| node89
  node90["3371<br/>size: 6"]
  node89 -->|L| node90
  node91["3246<br/>size: 3"]
  node90 -->|L| node91
  node92["3155<br/>size: 2"]
  node91 -->|L| node92
  node93["3199<br/>size: 1"]
  node92 -->|R| node93
  node94["4289<br/>size: 2"]
  node90 -->|R| node94
  node95["3486<br/>size: 1"]
  node94 -->|L| node95
  node96["5340<br/>size: 5"]
  node89 -->|R| node96
  node97["5230<br/>size: 1"]
  node96 -->|L| node97
  node98["8467<br/>size: 3"]
  node96 -->|R| node98
  node99["5766<br/>size: 2"]
  node98 -->|L| node99
  node100["8199<br/>size: 1"]
  node99 -->|R| node100
```

